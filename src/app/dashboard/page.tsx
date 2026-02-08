"use client";

import { useSession, signOut } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen, CreditCard, LogOut, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  async function handleCheckout() {
    setCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Checkout failed");
      }
    } catch {
      alert("Checkout failed");
    } finally {
      setCheckingOut(false);
    }
  }

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {session.user.name || "there"}!</h1>
          <p className="text-muted-foreground">{session.user.email}</p>
        </div>
        <button
          onClick={() => signOut().then(() => router.push("/"))}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 text-blue-500" />
            <h2 className="text-xl font-semibold">Analyze a Case</h2>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            Paste your case study and get framework analysis, discussion questions, and more in 60 seconds.
          </p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Start Analyzing <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="h-8 w-8 text-green-500" />
            <h2 className="text-xl font-semibold">Subscription</h2>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            Subscribe for $9/month to unlock 50 analyses per month with full features.
          </p>
          <button
            onClick={handleCheckout}
            disabled={checkingOut}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            {checkingOut && <Loader2 className="h-4 w-4 animate-spin" />}
            Subscribe — $9/mo
          </button>
        </div>
      </div>
    </div>
  );
}
