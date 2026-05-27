require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = `You are an expert AI assistant helping IAM (Identity and Access Management) contractors find project opportunities in Dallas, Texas.

Find and list current IAM contractor positions in Dallas, TX. Focus on: Okta, SailPoint, CyberArk, Azure AD/Entra ID, Ping Identity, ForgeRock, AWS IAM, Active Directory, PAM, IGA, SSO, MFA roles.

Return ONLY a valid JSON object — no markdown, no extra text, no code fences:
{
  "summary": "Brief summary of results",
  "totalFound": <number>,
  "projects": [
    {
      "id": "proj-1",
      "title": "<job title>",
      "company": "<company or staffing firm>",
      "type": "<Contract | Contract-to-Hire | W2 | 1099 | C2C>",
      "location": "<Dallas, TX or specific area>",
      "payRate": "<e.g. $85-$110/hr>",
      "duration": "<e.g. 6 months>",
      "clearance": "<None | Public Trust | Secret | Top Secret>",
      "skills": ["skill1", "skill2", "skill3"],
      "description": "<2-3 sentence description>",
      "postedDate": "<e.g. 2 days ago>",
      "applyUrl": "<url or Contact recruiter>",
      "remote": <true | false | "Hybrid">
    }
  ],
  "tips": "<1-2 practical tips for applying>"
}`;

app.post("/api/find-projects", async (req, res) => {
  const { query, filters } = req.body;
  if (!query) return res.status(400).json({ error: "Query is required" });

  let filterContext = "";
  if (filters) {
    if (filters.contractType && filters.contractType !== "Any") filterContext += ` Contract type: ${filters.contractType}.`;
    if (filters.payMin) filterContext += ` Minimum pay: $${filters.payMin}/hr.`;
    if (filters.remote && filters.remote !== "Any") filterContext += ` Remote: ${filters.remote}.`;
    if (filters.clearance && filters.clearance !== "Any") filterContext += ` Clearance: ${filters.clearance}.`;
    if (filters.tool && filters.tool !== "Any") filterContext += ` IAM tool: ${filters.tool}.`;
  }

  const userMessage = `Find IAM contractor projects in Dallas, TX. ${query}${filterContext}. Return JSON only, no markdown.`;

  try {
    const response = await fetch("https://iam-ai-tool.onrender.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq error:", JSON.stringify(data));
      return res.status(500).json({ success: false, error: data.error?.message || "Groq API error" });
    }

    let resultText = data.choices?.[0]?.message?.content || "";
    console.log("Raw response:", resultText.substring(0, 200));

    let parsed;
    try {
      const clean = resultText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(clean);
    } catch {
      parsed = {
        summary: "Results found but formatting issue occurred.",
        totalFound: 0,
        projects: [],
        tips: "Please try a more specific search query.",
      };
    }

    res.json({ success: true, data: parsed });
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ success: false, error: "Server error: " + err.message });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Dallas IAM Tool backend running (Groq - Free)" });
});

app.listen(PORT, () => {
  
  console.log(`🤖 Using: Groq LLaMA 3.3 70B (FREE)`);
  console.log(`\nMake sure GROQ_API_KEY is set in backend/.env\n`);
});
