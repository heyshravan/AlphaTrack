import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  BarChart3,
  Globe2,
  Bookmark,
  BrainCircuit,
  Activity,
} from "lucide-react";

export const MobileNav: React.FC = () => {
  const router = useRouter();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Markets", href: "/markets", icon: Globe2 },
    { name: "Watchlist", href: "/watchlist", icon: Bookmark },
    { name: "Predictions", href: "/predictions", icon: BrainCircuit },
    { name: "Analytics", href: "/analytics", icon: Activity },
  ];

  const isActive = (path: string) => router.pathname === path;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070A14]/95 backdrop-blur-2xl border-t border-white/[0.08] px-3 py-1.5 shadow-2xl safe-area-bottom">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                active
                  ? "text-cyan-300 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <div
                className={`relative flex items-center justify-center p-1.5 rounded-xl transition-all ${
                  active
                    ? "bg-indigo-600/25 border border-indigo-500/40 text-cyan-300 shadow-sm"
                    : ""
                }`}
              >
                <Icon className={`h-4.5 w-4.5 ${active ? "text-cyan-400" : "text-slate-400"}`} />
                {active && (
                  <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight whitespace-nowrap">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
