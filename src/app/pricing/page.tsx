"use client";

import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground text-lg">One plan. Everything you need to ace case discussions.</p>
      </div>

      <div className="max-w-sm mx-auto">
        <div className="bg-card border-2 border-blue-500 rounded-2xl p-8 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
            Pro Plan
          </div>
          <div className="text-center mb-6">
            <p className="text-5xl font-bold">
              $9<span className="text-lg font-normal text-muted-foreground">/month</span>
            </p>
            <p className="text-muted-foreground text-sm mt-2">Cancel anytime</p>
          </div>

          <ul className="space-y-3 mb-8">
            {[
              "50 case analyses per month",
              "All 6 analysis sections",
              "Framework analysis (Porter's, SWOT, etc.)",
              "10 discussion questions per case",
              "Executive summaries",
              "Counter-arguments & rebuttals",
              "Cloud history",
              "Priority processing",
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>

          <Link
            href="/sign-up"
            className="block text-center bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Get Started <ArrowRight className="h-4 w-4 inline ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
