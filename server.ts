import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Workflow 1 - Lead Acquisition
  app.post("/api/agent/lead-acquisition", async (req, res) => {
    try {
      const { jobDescription } = req.body;
      if (!jobDescription) {
        return res.status(400).json({ error: "Job description is required" });
      }

      const prompt = `You are a Digital FTE (Full-Time Employee) acting as an Automated Lead Acquisition & Scoping Agent for a freelance UI/Front-End Developer.

YOUR INSTRUCTIONS (from architecture documentation):
- Scan the provided freelance job listing/description.
- Filter out low-value listings and explicitly state if it is a bad fit.
- Classify compatibility with the target tech stack: React, Next.js, Tailwind.
- Parse any non-technical client complaints (e.g., "app is slow", "ugly UI") into precise frontend solutions matched with presumed case studies.
- Draft a highly tailored initial outreach proposal.
- Ensure output maintains a polished, collaborative, engineering-first tone, avoiding generic sales jargon.

JOB DESCRIPTION:
${jobDescription}

Generate the scoping analysis and draft proposal in Markdown format. Ensure there is a clear "Analysis" section and a "Draft Proposal" section.`;

      const response = await getAiClient().models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      res.json({ result: response.text });
    } catch (error: any) {
      console.error("Lead Acquisition Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate proposal" });
    }
  });

  // API Route: Workflow 2 - UI/UX Audit
  app.post("/api/agent/ui-audit", async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ error: "URL is required" });
      }

      const prompt = `You are a Digital FTE (Full-Time Employee) acting as an Interactive UI/UX Optimization & Audit Agent.

YOUR INSTRUCTIONS (from architecture documentation):
- Serve as a technical audit tool providing a structured frontend analysis for the provided URL.
- Equip your analysis with deep analytical rules mapping to standard design systems and visual hierarchy principles.
- Evaluate the conceptual DOM layout and formulate highly specific component-level optimization suggestions that demonstrate technical authority.
- Isolate responsiveness breaks.
- Generate a markdown performance report highlighting the value of a UI engineer.

TARGET URL:
${url}

Generate the comprehensive UI/UX optimization and audit report in Markdown format. (Assume common issues or infer layout constraints if the site is known, or provide a robust generalized heuristic audit framework for this specific domain).`;

      const response = await getAiClient().models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      res.json({ result: response.text });
    } catch (error: any) {
      console.error("UI Audit Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate audit" });
    }
  });

  // API Route: Workflow 3 - SEO Vulnerability Audit
  app.post("/api/agent/seo-audit", async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ error: "URL is required" });
      }

      const prompt = `You are a Digital FTE (Full-Time Employee) acting as an SEO Vulnerability & Optimization Agent.

YOUR INSTRUCTIONS:
- Serve as a technical SEO audit tool for the provided URL.
- Evaluate potential SEO vulnerabilities including metadata, heading structures, semantic HTML, core web vitals proxies, accessibility issues that impact SEO, and keyword strategies.
- Provide highly specific component-level optimization suggestions to improve search engine rankings and organic discoverability.
- Generate a comprehensive markdown performance report highlighting vulnerabilities and actionable steps to resolve them.

TARGET URL:
${url}

Generate the SEO vulnerability and optimization report in Markdown format.`;

      const response = await getAiClient().models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      res.json({ result: response.text });
    } catch (error: any) {
      console.error("SEO Audit Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate SEO audit" });
    }
  });

  // API Route: Workflow 4 - Unit Testing Agent
  app.post("/api/agent/unit-test", async (req, res) => {
    try {
      const { code } = req.body;
      if (!code) {
        return res.status(400).json({ error: "Code snippet is required" });
      }

      const prompt = `You are a Digital FTE (Full-Time Employee) acting as a Senior QA Automation & Unit Testing Engineer.

YOUR INSTRUCTIONS:
- Analyze the provided code snippet across any programming language or framework.
- Identify edge cases, logic flaws, and potential vulnerabilities.
- Generate a comprehensive suite of unit tests (using standard testing frameworks like Jest, Vitest, PyTest, JUnit, etc., depending on the detected language).
- Provide feedback on test coverage and code maintainability.
- Output the response entirely in Markdown format, with clear code blocks.

TARGET CODE:
\`\`\`
${code}
\`\`\`

Generate the comprehensive unit test suite and feedback report in Markdown format.`;

      const response = await getAiClient().models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      res.json({ result: response.text });
    } catch (error: any) {
      console.error("Unit Test Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate unit tests" });
    }
  });

  // API Route: Workflow 5 - Mobile Responsive Agent
  app.post("/api/agent/mobile-responsive", async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ error: "URL is required" });
      }

      const prompt = `You are a Digital FTE (Full-Time Employee) acting as a Mobile Responsiveness & Cross-Platform QA Agent.

YOUR INSTRUCTIONS:
- Serve as a technical mobile audit tool for the provided URL.
- Evaluate the site's mobile responsiveness, viewport configurations, touch targets, and mobile-specific layout constraints.
- Identify issues preventing seamless experience on mobile devices and responsive web applications.
- Provide component-level CSS/Tailwind structural fixes to resolve responsiveness breaks.
- Generate a comprehensive markdown performance report highlighting vulnerabilities and actionable steps to resolve them.

TARGET URL:
${url}

Generate the comprehensive mobile responsiveness audit report in Markdown format.`;

      const response = await getAiClient().models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      res.json({ result: response.text });
    } catch (error: any) {
      console.error("Mobile Responsive Audit Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate mobile audit" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
