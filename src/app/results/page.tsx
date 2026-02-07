"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Copy, Check, Printer, ArrowLeft, Brain, HelpCircle, FileText, BarChart3, Target, Scale } from "lucide-react";
import type { CaseAnalysis } from "@/types/analysis";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors no-print"
    >
      {copied ? <><Check className="h-3 w-3 text-green-500" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
    </button>
  );
}

const tabs = [
  { id: "frameworks", label: "Frameworks", icon: Brain },
  { id: "questions", label: "Key Questions", icon: HelpCircle },
  { id: "summary", label: "Executive Summary", icon: FileText },
  { id: "metrics", label: "Key Metrics", icon: BarChart3 },
  { id: "decision", label: "Decision", icon: Target },
  { id: "counter", label: "Counter-Arguments", icon: Scale },
] as const;

type TabId = typeof tabs[number]["id"];

export default function ResultsPage() {
  const [analysis, setAnalysis] = useState<CaseAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("frameworks");
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("caseprep-current");
    if (!data) { router.push("/analyze"); return; }
    setAnalysis(JSON.parse(data));
  }, [router]);

  if (!analysis) return <div className="flex items-center justify-center min-h-[60vh] text-muted-foreground">Loading...</div>;

  function getSectionText(): string {
    if (!analysis) return "";
    switch (activeTab) {
      case "frameworks":
        return analysis.frameworks.map(f => `${f.name}\n${f.relevance}\n${f.application.map(a => `• ${a}`).join("\n")}`).join("\n\n");
      case "questions":
        return analysis.keyQuestions.map((q, i) => `${i + 1}. ${q}`).join("\n");
      case "summary":
        return analysis.executiveSummary;
      case "metrics":
        return analysis.keyMetrics.map(m => `${m.metric}: ${m.value}\n${m.significance}`).join("\n\n");
      case "decision":
        return `${analysis.protagonistDecision.recommendation}\n\nReasoning:\n${analysis.protagonistDecision.reasoning.map(r => `• ${r}`).join("\n")}\n\nRisks:\n${analysis.protagonistDecision.risks.map(r => `• ${r}`).join("\n")}`;
      case "counter":
        return analysis.counterArguments.map(c => `${c.position}\n${c.argument}\nRebuttal: ${c.rebuttal}`).join("\n\n");
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <button onClick={() => router.push("/analyze")} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2 no-print">
            <ArrowLeft className="h-4 w-4" /> New Analysis
          </button>
          <h1 className="text-2xl font-bold">{analysis.title}</h1>
          <p className="text-sm text-muted-foreground">Analyzed {new Date(analysis.createdAt).toLocaleString()}</p>
        </div>
        <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 border border-border rounded-lg px-3 py-1.5 text-sm hover:bg-accent transition-colors no-print">
          <Printer className="h-4 w-4" /> Print
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-2 mb-6 no-print">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
          >
            <tab.icon className="h-4 w-4" /> {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">{tabs.find(t => t.id === activeTab)?.label}</h2>
          <CopyButton text={getSectionText()} />
        </div>

        {activeTab === "frameworks" && (
          <div className="space-y-6">
            {analysis.frameworks.map((f, i) => (
              <div key={i} className="border border-border rounded-lg p-4">
                <h3 className="font-semibold text-blue-400 mb-1">{f.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{f.relevance}</p>
                <ul className="space-y-1.5">
                  {f.application.map((a, j) => (
                    <li key={j} className="text-sm flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span> {a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === "questions" && (
          <ol className="space-y-3">
            {analysis.keyQuestions.map((q, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="bg-blue-600/20 text-blue-400 rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                <span>{q}</span>
              </li>
            ))}
          </ol>
        )}

        {activeTab === "summary" && (
          <div className="prose prose-invert prose-sm max-w-none">
            {analysis.executiveSummary.split("\n\n").map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-foreground/90">{p}</p>
            ))}
          </div>
        )}

        {activeTab === "metrics" && (
          <div className="grid gap-3 md:grid-cols-2">
            {analysis.keyMetrics.map((m, i) => (
              <div key={i} className="border border-border rounded-lg p-4">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-sm font-medium">{m.metric}</span>
                  <span className="text-lg font-bold text-blue-400">{m.value}</span>
                </div>
                <p className="text-xs text-muted-foreground">{m.significance}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "decision" && (
          <div>
            <div className="bg-blue-600/10 border border-blue-500/20 rounded-lg p-4 mb-4">
              <h3 className="text-sm font-semibold text-blue-400 mb-1">Recommendation</h3>
              <p className="text-sm">{analysis.protagonistDecision.recommendation}</p>
            </div>
            <h3 className="text-sm font-semibold mb-2">Reasoning</h3>
            <ul className="space-y-2 mb-4">
              {analysis.protagonistDecision.reasoning.map((r, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span> {r}
                </li>
              ))}
            </ul>
            <h3 className="text-sm font-semibold mb-2">Risks to Consider</h3>
            <ul className="space-y-2">
              {analysis.protagonistDecision.risks.map((r, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">⚠</span> {r}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "counter" && (
          <div className="space-y-4">
            {analysis.counterArguments.map((c, i) => (
              <div key={i} className="border border-border rounded-lg p-4">
                <h3 className="font-semibold text-sm mb-1">{c.position}</h3>
                <p className="text-sm text-muted-foreground mb-3">{c.argument}</p>
                <div className="bg-accent/50 rounded-md p-3">
                  <span className="text-xs font-semibold text-blue-400">Rebuttal: </span>
                  <span className="text-xs">{c.rebuttal}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Print: show all sections */}
      <div className="hidden print:block mt-8 space-y-8">
        {/* All sections render for print */}
        <div className="print-break">
          <h2 className="text-xl font-bold mb-4">Frameworks</h2>
          {analysis.frameworks.map((f, i) => (
            <div key={i} className="mb-4">
              <h3 className="font-semibold">{f.name}</h3>
              <p className="text-sm mb-1">{f.relevance}</p>
              <ul>{f.application.map((a, j) => <li key={j} className="text-sm">• {a}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="print-break">
          <h2 className="text-xl font-bold mb-4">Key Questions</h2>
          <ol>{analysis.keyQuestions.map((q, i) => <li key={i} className="text-sm mb-1">{i+1}. {q}</li>)}</ol>
        </div>
        <div className="print-break">
          <h2 className="text-xl font-bold mb-4">Executive Summary</h2>
          <p className="text-sm whitespace-pre-line">{analysis.executiveSummary}</p>
        </div>
      </div>
    </div>
  );
}
