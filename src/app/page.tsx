import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Brain, Target, Zap, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <Zap className="h-4 w-4" /> Trusted by MBA students at top programs
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Ace Every Case Discussion
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Paste any business case. Get framework analysis, discussion questions, and executive summaries in <span className="text-white font-semibold">60 seconds</span>.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-lg text-lg font-semibold transition-colors"
          >
            Get Started <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 border border-border hover:bg-accent text-foreground px-8 py-3.5 rounded-lg text-lg font-medium transition-colors"
          >
            View Pricing
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Brain, title: "Framework Analysis", desc: "Automatically identifies which frameworks apply — Porter's 5 Forces, SWOT, PESTEL, Value Chain — with specific application to your case." },
            { icon: Target, title: "Discussion Questions", desc: "10 questions your professor would actually ask. Be the student who always has the answer ready." },
            { icon: Clock, title: "60-Second Prep", desc: "What used to take 2+ hours now takes under a minute. Read the case, paste it, get everything you need." },
          ].map((f) => (
            <div key={f.title} className="bg-card border border-border rounded-xl p-6 hover:border-blue-500/30 transition-colors">
              <f.icon className="h-10 w-10 text-blue-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What You Get */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Everything You Need for Class</h2>
        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {[
            "Strategic framework analysis (Porter's, SWOT, PESTEL, etc.)",
            "10 professor-style discussion questions",
            "3-paragraph executive summary",
            "Key metrics extracted & explained",
            "Protagonist's recommended decision with reasoning",
            "Counter-arguments & devil's advocate positions",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 p-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-4 pb-20" id="pricing">
        <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
        <div className="max-w-sm mx-auto">
          <div className="bg-card border-2 border-blue-500 rounded-xl p-8 relative text-center">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
              Pro Plan
            </div>
            <p className="text-5xl font-bold mb-1">$9<span className="text-lg font-normal text-muted-foreground">/mo</span></p>
            <p className="text-muted-foreground text-sm mb-6">50 analyses per month · Cancel anytime</p>
            <ul className="space-y-2 text-sm text-left mb-6">
              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0" /> 50 case analyses per month</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0" /> All 6 analysis sections</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0" /> Cloud history & bookmarks</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0" /> Priority processing</li>
            </ul>
            <Link
              href="/sign-up"
              className="block bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-3 font-medium transition-colors"
            >
              Start Now
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 pb-20 text-center">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/20 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Stop Over-Prepping. Start Out-Performing.</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join MBA students who prep smarter, not harder.
          </p>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-lg text-lg font-semibold transition-colors"
          >
            Get Started Free <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2 mb-2">
          <BookOpen className="h-4 w-4" /> CasePrep AI
        </div>
        <p>© 2026 CasePrep AI. Built for students, by students.</p>
      </footer>
    </div>
  );
}
