import type { VercelRequest, VercelResponse } from "@vercel/node";

const MAX_REQUEST_BYTES = 16 * 1024;
const MIN_COMPLETION_TIME_MS = 2_000;
const WEBHOOK_TIMEOUT_MS = 10_000;

const LIMITS = {
  name: 100,
  business: 150,
  email: 254,
  phone: 50,
  leadProcess: 3000,
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+().\-\s#xXeEtT]+$/;

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

function normalizePhone(phone: string): string {
  return phone.replace(/\s+/g, " ").trim();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  const origin = headerValue(req.headers.origin);
  if (!isAllowedOrigin(origin)) {
    return sendJson(res, 403, { error: "Unable to submit inquiry." });
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
  if (!body) {
    return sendJson(res, 400, { error: "Invalid request." });
  }

  const name = requiredString(body, "name");
  const business = requiredString(body, "business");
  const email = requiredString(body, "email");
  const phoneInput = optionalString(body, "phone");
  const leadProcess = requiredString(body, "leadProcess");
  const website = optionalString(body, "website");
  const startedAt = body.startedAt;

  if (
    !name ||
    !business ||
    !email ||
    phoneInput === null ||
    !leadProcess ||
    website === null ||
    typeof startedAt !== "number" ||
    !Number.isFinite(startedAt)
  ) {
    return sendJson(res, 400, { error: "Invalid inquiry details." });
  }

  if (website) {
    return sendJson(res, 400, { error: "Unable to submit inquiry." });
  }

  const elapsedTime = Date.now() - startedAt;
  if (elapsedTime < MIN_COMPLETION_TIME_MS) {
    return sendJson(res, 400, { error: "Unable to submit inquiry." });
  }

  if (
    name.length > LIMITS.name ||
    business.length > LIMITS.business ||
    email.length > LIMITS.email ||
    phoneInput.length > LIMITS.phone ||
    leadProcess.length < 10 ||
    leadProcess.length > LIMITS.leadProcess ||
    !emailPattern.test(email)
  ) {
    return sendJson(res, 400, { error: "Invalid inquiry details." });
  }

  const phone = phoneInput ? normalizePhone(phoneInput) : "";
  const phoneDigitCount = phone.replace(/\D/g, "").length;
  if (
    phone &&
    (!phonePattern.test(phone) || phoneDigitCount < 7 || phoneDigitCount > 20)
  ) {
    return sendJson(res, 400, { error: "Invalid inquiry details." });
  }

  const webhookUrl = process.env.N8N_RELAY_CONTACT_WEBHOOK_URL;
  const webhookSecret = process.env.N8N_RELAY_CONTACT_SECRET;
  if (!webhookUrl || !webhookSecret) {
    console.error("Relay contact service is not configured.");
    return sendJson(res, 503, { error: "Unable to submit inquiry." });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Relay-Secret": webhookSecret,
      },
      body: JSON.stringify({
        name,
        business,
        email,
        phone,
        leadProcess,
        submittedAt: new Date().toISOString(),
        source: "relay-website-inquiry",
      }),
      signal: controller.signal,
    });

    if (!webhookResponse.ok) {
      console.error(
        "Relay contact service returned a non-success status:",
        webhookResponse.status,
      );
      return sendJson(res, 502, { error: "Unable to submit inquiry." });
    }

    return sendJson(res, 200, { ok: true });
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error("Relay contact service timed out.");
      return sendJson(res, 504, { error: "Unable to submit inquiry." });
    }

    console.error("Relay contact service request failed.");
    return sendJson(res, 502, { error: "Unable to submit inquiry." });
  } finally {
    clearTimeout(timeout);
  }
}
