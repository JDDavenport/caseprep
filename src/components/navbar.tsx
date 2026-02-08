"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
];

const authLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/analyze", label: "Analyze" },
  { href: "/history", label: "History" },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const links = session ? authLinks : publicLinks;

  return (
    <nav className="no-print border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <BookOpen className="h-5 w-5 text-blue-500" />
          <span>CasePrep AI</span>
        </Link>
        <div className="flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                pathname === l.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              {l.label}
            </Link>
          ))}
          {!session && (
            <Link
              href="/sign-in"
              className="ml-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm font-medium transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
