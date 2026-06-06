import type { VercelRequest, VercelResponse } from "@vercel/node";

type LeadPayload = {
  name?: string;
  email?: string;
  company?: string;
  website?: string;
  projectType?: string;
  description?: string;
  timeline?: string;
  budget?: string;
  leadScore?: "Hot" | "Warm" | "Cold";
  summary?: string;
};

function scoreLead(lead: LeadPayload): "Hot" | "Warm" | "Cold" {
  const timeline = lead.timeline?.toLowerCase() || "";
  const budget = lead.budget?.toLowerCase() || "";
  const description = lead.description?.toLowerCase() || "";

  if (
    timeline.includes("asap") ||
    timeline.includes("this month") ||
    budget.includes("5000") ||
    budget.includes("5k") ||
    description.includes("urgent")
  ) {
    return "Hot";
  }

  if (
    timeline.includes("1-3") ||
    timeline.includes("soon") ||
    budget.includes("2000") ||
    budget.includes("2k")
  ) {
    return "Warm";
  }

  return "Cold";
}

function createSummary(lead: LeadPayload): string {
  return `${lead.name || "A visitor"} is interested in ${
    lead.projectType || "a software project"
  }. They described the project as: "${
    lead.description || "No description provided"
  }". Timeline: ${lead.timeline || "Not provided"}. Budget: ${
    lead.budget || "Not provided"
  }. Contact: ${lead.email || "No email provided"}.`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body as LeadPayload;

    if (!body.email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const webhookUrl = process.env.N8N_LEAD_WEBHOOK_URL;

    if (!webhookUrl) {
      return res.status(500).json({ error: "Missing N8N_LEAD_WEBHOOK_URL" });
    }

    const lead: LeadPayload = {
      ...body,
      leadScore: scoreLead(body),
      summary: createSummary(body),
    };

    const n8nResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lead),
    });

    if (!n8nResponse.ok) {
      return res.status(502).json({ error: "Failed to send lead to n8n" });
    }

    return res.status(200).json({
      success: true,
      lead,
    });
  } catch (error) {
    console.error("Lead API error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
