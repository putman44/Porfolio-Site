import type { VercelRequest, VercelResponse } from "@vercel/node";

type ChatPayload = {
  message?: string;
  sessionId?: string;
};

type N8nChatResponse = {
  reply?: string;
  output?: string;
  [key: string]: unknown;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body as ChatPayload;

    if (!body.message || !body.message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const webhookUrl = process.env.N8N_CHAT_WEBHOOK_URL;

    if (!webhookUrl) {
      return res.status(500).json({ error: "Missing N8N_CHAT_WEBHOOK_URL" });
    }

    const n8nResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: body.message,
        sessionId: body.sessionId,
      }),
    });

    const responseText = await n8nResponse.text();

    if (!n8nResponse.ok) {
      console.error("n8n chat webhook failed:", {
        status: n8nResponse.status,
        statusText: n8nResponse.statusText,
        body: responseText,
      });

      return res.status(502).json({
        error: "Failed to send chat message to n8n",
        n8nStatus: n8nResponse.status,
        n8nBody: responseText,
      });
    }

    let n8nData: N8nChatResponse = {};

    try {
      n8nData = JSON.parse(responseText) as N8nChatResponse;
    } catch {
      n8nData = { reply: responseText };
    }

    return res.status(200).json({
      success: true,
      reply: n8nData.reply || n8nData.output || "",
      raw: n8nData,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
