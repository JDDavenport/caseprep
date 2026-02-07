export interface Framework {
  name: string;
  relevance: string;
  application: string[];
}

export interface CaseAnalysis {
  id: string;
  title: string;
  createdAt: string;
  frameworks: Framework[];
  keyQuestions: string[];
  executiveSummary: string;
  keyMetrics: { metric: string; value: string; significance: string }[];
  protagonistDecision: {
    recommendation: string;
    reasoning: string[];
    risks: string[];
  };
  counterArguments: {
    position: string;
    argument: string;
    rebuttal: string;
  }[];
}
