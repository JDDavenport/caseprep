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
        <Link
          href="/analyze"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-lg text-lg font-semibold transition-colors"
        >
          Analyze a Case <ArrowRight className="h-5 w-5" />
        </Link>
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
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-1">Free</h3>
            <p className="text-3xl font-bold mb-4">$0</p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li>✓ 3 analyses per week</li>
              <li>✓ All 6 analysis sections</li>
              <li>✓ Local history</li>
            </ul>
            <Link href="/analyze" className="block text-center border border-border rounded-lg py-2 text-sm hover:bg-accent transition-colors">
              Get Started
            </Link>
          </div>
          <div className="bg-card border-2 border-blue-500 rounded-xl p-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
              Most Popular
            </div>
            <h3 className="font-semibold text-lg mb-1">Monthly</h3>
            <p className="text-3xl font-bold mb-4">$7<span className="text-base font-normal text-muted-foreground">/mo</span></p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li>✓ Unlimited analyses</li>
              <li>✓ PDF upload</li>
              <li>✓ Cloud history</li>
              <li>✓ Priority processing</li>
            </ul>
            <Link href="/analyze" className="block text-center bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-2 text-sm transition-colors">
              Start Free Trial
            </Link>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-1">Semester</h3>
            <p className="text-3xl font-bold mb-4">$29<span className="text-base font-normal text-muted-foreground">/sem</span></p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li>✓ Everything in Monthly</li>
              <li>✓ 4 months access</li>
              <li>✓ Save 17%</li>
            </ul>
            <Link href="/analyze" className="block text-center border border-border rounded-lg py-2 text-sm hover:bg-accent transition-colors">
              Best Value
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold text-center mb-12">What Students Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Sarah K.", school: "HBS '26", quote: "I went from dreading cold calls to volunteering. CasePrep gives me the confidence to speak up in every class." },
            { name: "Marcus T.", school: "Wharton '25", quote: "Saved me 10+ hours per week. The framework analysis is spot-on and the discussion questions are exactly what professors ask." },
            { name: "Priya R.", school: "Kellogg '26", quote: "The counter-arguments section is gold. I always have a unique perspective that impresses my study group." },
          ].map((t) => (
            <div key={t.name} className="bg-card border border-border rounded-xl p-6">
              <p className="text-sm text-muted-foreground mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="font-medium text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.school}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 pb-20 text-center">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/20 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Stop Over-Prepping. Start Out-Performing.</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of MBA students who prep smarter, not harder. 
          </p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-lg text-lg font-semibold transition-colors"
          >
            Try It Free <ArrowRight className="h-5 w-5" />
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
