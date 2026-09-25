import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  LayoutDashboard,
  Globe2,
  Bookmark,
  BrainCircuit,
  LineChart,
  Settings,
  Flame,
  ShieldCheck,
  Cpu,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

interface SidebarProps {
  currentStockSymbol?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentStockSymbol = "RELIANCE" }) => {
  const router = useRouter();

  const links = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Global Markets", href: "/markets", icon: Globe2 },
    { name: "Watchlist", href: "/watchlist", icon: Bookmark },
    { name: "AI Predictions", href: "/predictions", icon: BrainCircuit },
    { name: "Technical Analytics", href: "/analytics", icon: LineChart },
    { name: "System Settings", href: "/settings", icon: Settings },
  ];

  const isActive = (path: string) => router.pathname === path;

  return (
    <aside className="hidden lg:flex w-64 flex-col justify-between border-r border-white/[0.08] bg-[#070A12]/90 p-4 backdrop-blur-2xl">
      <div className="space-y-6">
        {/* Navigation list */}
        <div className="space-y-1">
          <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Platform Views
          </span>
          <div className="mt-2 space-y-1">
            {links.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                    active
                      ? "bg-indigo-600/20 text-cyan-300 border border-indigo-500/30 shadow-sm"
                      : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${active ? "text-cyan-400" : "text-slate-400"}`} />
                    <span>{item.name}</span>
                  </div>
                  {active && <ChevronRight className="h-3.5 w-3.5 text-cyan-400" />}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Selected Equity Quick Card */}
        <div className="rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/30 to-slate-900/40 p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
              Active Focus
            </span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-base font-black text-white">{currentStockSymbol}</div>
            <Link
              href="/dashboard"
              className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300"
            >
              Analyze →
            </Link>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            Real-time multi-indicator & prediction sync active
          </p>
        </div>

        {/* AI Neural Engine Status */}
        <div className="rounded-xl border border-white/[0.06] bg-slate-900/50 p-3.5">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-cyan-400" />
            <span className="text-xs font-bold text-white">Transformer Inference</span>
          </div>
          <div className="mt-2 space-y-1.5 text-[11px] text-slate-400">
            <div className="flex justify-between">
              <span>Model Version:</span>
              <strong className="text-slate-200">AlphaLSTM v4.2</strong>
            </div>
            <div className="flex justify-between">
              <span>Inference Latency:</span>
              <strong className="text-emerald-400">12ms</strong>
            </div>
            <div className="flex justify-between">
              <span>Validation AUC:</span>
              <strong className="text-cyan-400">92.4%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Engine Status */}
      <div className="pt-4 border-t border-white/[0.08]">
        <div className="rounded-xl bg-slate-900/60 p-3 text-[11px] text-slate-400 border border-white/[0.04]">
          <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI Core Active</span>
          </div>
          <p className="mt-1 leading-tight text-slate-400 text-[10px]">
            AlphaTrack v4 Neural Engine active and syncing real-time trend signals.
          </p>
        </div>
      </div>
    </aside>
  );
};
