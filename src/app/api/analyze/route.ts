import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { auth } from "@/lib/auth";
import { hasActiveSubscription, checkAndIncrementUsage } from "@/lib/subscription";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are CasePrep AI, an expert MBA case study analyst. Analyze the provided business case and return a JSON object with this exact structure:

{
  "title": "Case title (infer from content)",
  "frameworks": [
    {
      "name": "Framework name (e.g., Porter's Five Forces, SWOT, PESTEL, Value Chain Analysis, BCG Matrix, Ansoff Matrix)",
      "relevance": "Why this framework applies to this specific case (1-2 sentences)",
      "application": ["Specific point 1 applied to this case", "Specific point 2", "Specific point 3"]
    }
  ],
  "keyQuestions": ["10 discussion questions a professor would ask about this case"],
  "executiveSummary": "Three-paragraph executive summary. Paragraph 1: situation overview. Paragraph 2: core challenge/tension. Paragraph 3: stakes and implications.",
  "keyMetrics": [
    { "metric": "Metric name", "value": "The number/value from the case", "significance": "What this number means strategically" }
  ],
  "protagonistDecision": {
    "recommendation": "What the protagonist should do (2-3 sentences)",
    "reasoning": ["Reason 1", "Reason 2", "Reason 3"],
    "risks": ["Risk 1", "Risk 2"]
  },
  "counterArguments": [
    {
      "position": "Alternative position title",
      "argument": "The devil's advocate argument (2-3 sentences)",
      "rebuttal": "How to counter this argument"
    }
  ]
}

Rules:
- Identify 3-5 relevant frameworks. Apply them SPECIFICALLY to this case, not generically.
- Questions should be Socratic, probing, the kind that make students think.
- Extract ALL meaningful numbers from the case for key metrics.
- Provide 3-4 counter-arguments.
- Be specific. Reference names, companies, and numbers from the case.
- Return ONLY valid JSON, no markdown.`;

export async function POST(req: NextRequest) {
  // Auth check
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user) {
    return NextResponse.json(
      { error: "Please sign in to analyze cases." },
      { status: 401 }
    );
  }

  // Subscription check
  if (!hasActiveSubscription(session.user.id)) {
    return NextResponse.json(
      { error: "Active subscription required. Subscribe at /pricing to continue." },
      { status: 403 }
    );
  }

  // Rate limit: 50 per month
  if (!checkAndIncrementUsage(session.user.id, 50)) {
    return NextResponse.json(
      { error: "Monthly analysis limit reached (50/month). Resets next month." },
      { status: 429 }
    );
  }

  try {
    const { caseText } = await req.json();

    if (!caseText || caseText.trim().length < 100) {
      return NextResponse.json({ error: "Please provide at least 100 characters of case content." }, { status: 400 });
    }

    if (caseText.length > 50000) {
      return NextResponse.json({ error: "Case text too long. Please limit to 50,000 characters." }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Analyze this business case:\n\n${caseText}` },
      ],
      temperature: 0.3,
      max_tokens: 4000,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: "Failed to generate analysis." }, { status: 500 });
    }

    const analysis = JSON.parse(content);
    analysis.id = crypto.randomUUID();
    analysis.createdAt = new Date().toISOString();

    return NextResponse.json(analysis);
  } catch (error: unknown) {
    console.error("Analysis error:", error);
    if (error && typeof error === "object" && "status" in error && (error as { status: number }).status === 429) {
      return NextResponse.json({ error: "AI service is busy. Please try again in a moment." }, { status: 503 });
    }
    return NextResponse.json({ error: "Analysis failed. Please try again." }, { status: 500 });
  }
}
