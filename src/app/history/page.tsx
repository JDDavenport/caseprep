"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Clock, Trash2, BookOpen } from "lucide-react";
import type { CaseAnalysis } from "@/types/analysis";

export default function HistoryPage() {
  const [history, setHistory] = useState<CaseAnalysis[]>([]);
  const router = useRouter();

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("caseprep-history") || "[]"));
  }, []);

  function viewAnalysis(analysis: CaseAnalysis) {
    localStorage.setItem("caseprep-current", JSON.stringify(analysis));
    router.push("/results");
  }

  function deleteAnalysis(id: string) {
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    localStorage.setItem("caseprep-history", JSON.stringify(updated));
  }

  function clearAll() {
    if (confirm("Delete all history?")) {
      setHistory([]);
      localStorage.removeItem("caseprep-history");
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">History</h1>
          <p className="text-muted-foreground text-sm mt-1">Your past case analyses (stored locally)</p>
        </div>
        {history.length > 0 && (
          <button onClick={clearAll} className="text-sm text-red-400 hover:text-red-300 transition-colors">
            Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-20">
          <BookOpen className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">No analyses yet</p>
          <button
            onClick={() => router.push("/analyze")}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Analyze Your First Case
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-card border border-border rounded-xl p-4 flex items-center justify-between hover:border-blue-500/30 transition-colors group"
            >
              <button onClick={() => viewAnalysis(item)} className="flex-1 text-left">
                <h3 className="font-medium group-hover:text-blue-400 transition-colors">{item.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.frameworks?.length || 0} frameworks · {item.keyQuestions?.length || 0} questions
                  </span>
                </div>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); deleteAnalysis(item.id); }}
                className="p-2 text-muted-foreground hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
