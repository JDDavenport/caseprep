"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, FileText, Sparkles } from "lucide-react";

export default function AnalyzePage() {
  const [caseText, setCaseText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      setCaseText(await file.text());
    } else if (file.type === "application/pdf") {
      setError("PDF parsing coming soon! For now, please paste the case text directly.");
    } else {
      setError("Please upload a .txt file or paste the case text.");
    }
  }

  async function handleAnalyze() {
    if (caseText.trim().length < 100) {
      setError("Please provide at least 100 characters of case content.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseText }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Analysis failed.");
        return;
      }
      // Save to localStorage
      const history = JSON.parse(localStorage.getItem("caseprep-history") || "[]");
      history.unshift(data);
      localStorage.setItem("caseprep-history", JSON.stringify(history.slice(0, 50)));
      // Navigate to results
      localStorage.setItem("caseprep-current", JSON.stringify(data));
      router.push("/results");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Analyze a Case</h1>
        <p className="text-muted-foreground">Paste your case study below and get a complete analysis in 60 seconds.</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium">Case Content</label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{caseText.length.toLocaleString()} chars</span>
            <button
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground border border-border rounded-md px-2.5 py-1 transition-colors"
            >
              <Upload className="h-3 w-3" /> Upload .txt
            </button>
            <input ref={fileRef} type="file" className="hidden" accept=".txt,.pdf" onChange={handleFileUpload} />
          </div>
        </div>

        <textarea
          value={caseText}
          onChange={(e) => setCaseText(e.target.value)}
          placeholder="Paste your business case study here...&#10;&#10;Include the full case text — company background, situation, exhibits, and any data tables. The more context you provide, the better the analysis."
          className="w-full h-80 bg-background border border-border rounded-lg p-4 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder:text-muted-foreground/60"
        />

        {error && (
          <div className="mt-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg px-4 py-2 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleAnalyze}
          disabled={loading || caseText.trim().length < 100}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white rounded-lg py-3 font-semibold transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Analyzing... (usually ~30 seconds)
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" /> Analyze Case
            </>
          )}
        </button>
      </div>

      {/* Tips */}
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {[
          { icon: FileText, title: "Full Text Works Best", desc: "Include everything: background, situation, exhibits, data." },
          { icon: Sparkles, title: "6 Analysis Sections", desc: "Frameworks, questions, summary, metrics, decision, counter-arguments." },
          { icon: Upload, title: "Save Your Work", desc: "All analyses are saved to your history automatically." },
        ].map((tip) => (
          <div key={tip.title} className="flex items-start gap-3 p-3 bg-card/50 rounded-lg border border-border/50">
            <tip.icon className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium">{tip.title}</p>
              <p className="text-xs text-muted-foreground">{tip.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
