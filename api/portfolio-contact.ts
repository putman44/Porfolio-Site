import type { VercelRequest, VercelResponse } from "@vercel/node";

const MAX_REQUEST_BYTES = 16 * 1024;
const MIN_COMPLETION_TIME_MS = 2_000;
const WEBHOOK_TIMEOUT_MS = 10_000;

const LIMITS = {
  name: 100,
  email: 254,
  message: 5000,
} as const;

const MIN_MESSAGE_LENGTH = 10;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedFields = new Set([
  "name",
  "email",
  "message",
  "website",
  "startedAt",
]);

type RequestBody = Record<string, unknown>;

function sendJson(
  res: VercelResponse,
  status: number,
  body: { ok?: true; error?: string },
) {
  return res.status(status).json(body);
}

function headerValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function isAllowedOrigin(origin: string | undefined): boolean {
  if (!origin) return true;

  try {
    const url = new URL(origin);
    const vercelOrigins = [
      process.env.VERCEL_URL,
      process.env.VERCEL_BRANCH_URL,
    ]
      .filter((hostname): hostname is string => Boolean(hostname))
      .map((hostname) => `https://${hostname}`);
    const isProductionOrigin =
      url.protocol === "https:" &&
      (url.hostname === "devbytaylor.com" ||
        url.hostname === "www.devbytaylor.com") &&
      !url.port;
    const isLocalOrigin =
      (url.protocol === "http:" || url.protocol === "https:") &&
      (url.hostname === "localhost" ||
        url.hostname === "127.0.0.1" ||
        url.hostname === "[::1]");
    const isVercelOrigin = vercelOrigins.includes(url.origin);

    return isProductionOrigin || isLocalOrigin || isVercelOrigin;
  } catch {
    return false;
  }
}

function parseJsonBody(req: VercelRequest): RequestBody | null {
  try {
    const rawBody: unknown = req.body;
    const parsed: unknown =
      typeof rawBody === "string" ? JSON.parse(rawBody) : rawBody;

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return null;
    }

    if (Buffer.byteLength(JSON.stringify(parsed), "utf8") > MAX_REQUEST_BYTES) {
      return null;
    }

    return parsed as RequestBody;
  } catch {
    return null;
  }
}

function requiredString(body: RequestBody, key: string): string | null {
  const value = body[key];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function optionalString(body: RequestBody, key: string): string | null {
  const value = body[key];
  if (value === undefined || value === "") return "";
  return typeof value === "string" ? value.trim() : null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  const origin = headerValue(req.headers.origin);
  if (!isAllowedOrigin(origin)) {
    return sendJson(res, 403, { error: "Unable to submit message." });
  }

  const contentType = headerValue(req.headers["content-type"]);
  if (!contentType?.toLowerCase().startsWith("application/json")) {
    return sendJson(res, 415, { error: "A JSON request is required." });
  }

  const contentLength = Number(
    headerValue(req.headers["content-length"]) ?? "0",
  );
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return sendJson(res, 413, { error: "Request is too large." });
  }

  const body = parseJsonBody(req);
  if (!body || Object.keys(body).some((key) => !allowedFields.has(key))) {
    return sendJson(res, 400, { error: "Invalid request." });
  }

  const name = requiredString(body, "name");
  const email = requiredString(body, "email");
  const message = requiredString(body, "message");
  const website = optionalString(body, "website");
  const startedAt = body.startedAt;

  if (
    !name ||
    !email ||
    !message ||
    website === null ||
    typeof startedAt !== "number" ||
    !Number.isFinite(startedAt)
  ) {
    return sendJson(res, 400, { error: "Invalid message details." });
  }

  if (website) {
    return sendJson(res, 400, { error: "Unable to submit message." });
  }

  const elapsedTime = Date.now() - startedAt;
  if (elapsedTime < MIN_COMPLETION_TIME_MS) {
    return sendJson(res, 400, { error: "Unable to submit message." });
  }

  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    message.length < MIN_MESSAGE_LENGTH ||
    message.length > LIMITS.message ||
    !emailPattern.test(email)
  ) {
    return sendJson(res, 400, { error: "Invalid message details." });
  }

  const webhookUrl = process.env.N8N_PORTFOLIO_CONTACT_WEBHOOK_URL;
  const webhookSecret = process.env.N8N_PORTFOLIO_CONTACT_SECRET;
  if (!webhookUrl || !webhookSecret) {
    console.error("Portfolio contact service is not configured.");
    return sendJson(res, 503, { error: "Unable to submit message." });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Portfolio-Secret": webhookSecret,
      },
      body: JSON.stringify({
        name,
        email,
        message,
        submittedAt: new Date().toISOString(),
        source: "portfolio-website-inquiry",
      }),
      signal: controller.signal,
    });

    if (!webhookResponse.ok) {
      console.error(
        "Portfolio contact service returned a non-success status:",
        webhookResponse.status,
      );
      return sendJson(res, 502, { error: "Unable to submit message." });
    }

    return sendJson(res, 200, { ok: true });
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error("Portfolio contact service timed out.");
      return sendJson(res, 504, { error: "Unable to submit message." });
    }

    console.error("Portfolio contact service request failed.");
    return sendJson(res, 502, { error: "Unable to submit message." });
  } finally {
    clearTimeout(timeout);
  }
}

/*
 * portfolio-contact.ts — API hardening reference
 *
 * Key concepts reviewed:
 *
 * 1. Request format and payload size
 *    - Require incoming requests to use Content-Type: application/json.
 *    - Reject oversized requests early using the Content-Length header.
 *    - Do not rely only on Content-Length because that header may be missing.
 *    - Measure the parsed JSON body with Buffer.byteLength(...) as a second
 *      size check.
 *    - Apply individual length limits to accepted fields as an additional
 *      validation layer.
 *
 * 2. JSON parsing and body validation
 *    - req.body may already be parsed by Vercel or may arrive as a string.
 *    - If it is a string, parse it with JSON.parse().
 *    - Reject null values, primitives, and arrays when the endpoint expects
 *      a JSON object.
 *    - Wrap parsing in try/catch so malformed JSON produces a controlled
 *      client error instead of crashing the handler.
 *
 * 3. Trust only expected fields
 *    - Do not forward the caller's entire request body downstream.
 *    - Extract and validate only the fields the API explicitly supports.
 *    - Construct a new outbound object before sending data to n8n.
 *    - This prevents unexpected caller-supplied fields from reaching internal
 *      systems.
 *    - Values such as submittedAt and source should be server-controlled when
 *      the caller should not be trusted to define them.
 *
 * 4. Origin checking
 *    - Production origins are explicitly allowlisted.
 *    - Localhost/127.0.0.1/::1 are allowed for development.
 *    - Current Vercel deployment and branch URLs can be derived from
 *      VERCEL_URL and VERCEL_BRANCH_URL.
 *    - .filter(...) removes missing environment-variable values.
 *    - .map(...) transforms Vercel hostnames into complete HTTPS origins.
 *    - Origin checking is a trust-boundary control, but it is not the same as
 *      authentication because non-browser clients may omit the Origin header.
 *
 * 5. Server-side secrets
 *    - N8N_RELAY_CONTACT_SECRET is read only inside the server-side API handler.
 *    - The browser calls /api/relay-contact without receiving the secret.
 *    - The server creates a separate server-to-server request to n8n and adds
 *      X-Relay-Secret there.
 *    - Environment variables are only secret if they remain in server-side
 *      code and are never exposed in frontend bundles or browser requests.
 *
 * 6. Stable API responses
 *    - Route all exits through one sendJson(...) helper for consistent JSON.
 *    - HTTP status communicates the category of result:
 *        200 = successful request
 *        400 = invalid request/body/fields
 *        403 = origin not allowed
 *        413 = request too large
 *        415 = unsupported Content-Type
 *        502 = downstream service failure
 *    - Current error responses use human-readable strings.
 *    - A future improvement could separate machine-readable codes from human
 *      messages, e.g.:
 *
 *        {
 *          code: "INVALID_INQUIRY",
 *          message: "Invalid inquiry details."
 *        }
 *
 * 7. Understanding success
 *    - 200 { ok: true } means this API successfully received a successful HTTP
 *      response from the downstream n8n request.
 *    - It does not automatically prove that every later downstream action
 *      completed unless n8n waits for those actions before returning success.
 *
 * 8. Failure testing mindset
 *    - Predict the result before running each test.
 *    - For each case record:
 *        input
 *        expected HTTP status
 *        expected JSON
 *        whether n8n should execute
 *        why
 *        observed result
 *    - Important cases include:
 *        valid request
 *        wrong Content-Type
 *        malformed JSON
 *        oversized payload
 *        invalid fields
 *        wrong origin
 *        timeout
 *        downstream n8n failure
 *
 * 9. General API-hardening mental model
 *
 *      untrusted request
 *            |
 *            v
 *      method / origin / content-type / size checks
 *            |
 *            v
 *      parse body
 *            |
 *            v
 *      validate + normalize accepted fields
 *            |
 *            v
 *      construct trusted outbound object
 *            |
 *            v
 *      authenticated server-to-server request
 *            |
 *            v
 *      controlled success or failure response
 *
 * Main principle:
 * Treat everything from the public request as untrusted until it has passed
 * the appropriate boundary checks, validation, and normalization.
 */
