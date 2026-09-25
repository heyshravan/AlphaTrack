import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { MarketCard } from "@/components/MarketCard";
import { MobileNav } from "@/components/MobileNav";
import { MARKET_INDICES, STOCKS_DATA } from "@/data/mockData";
import { Globe2, TrendingUp, TrendingDown, Layers, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function MarketsPage() {
  const stocks = Object.values(STOCKS_DATA);
  const gainers = [...stocks].sort((a, b) => b.changePercent - a.changePercent).slice(0, 4);
  const losers = [...stocks].sort((a, b) => a.changePercent - b.changePercent).slice(0, 4);

  const sectors = [
    { name: "Information Technology", change: "+1.85%", isPos: true, flow: "₹2,450 Cr" },
    { name: "Banking & Financial Services", change: "+1.42%", isPos: true, flow: "₹3,890 Cr" },
    { name: "Energy & Petrochemicals", change: "+2.10%", isPos: true, flow: "₹1,940 Cr" },
    { name: "Semiconductors & AI Compute", change: "+3.45%", isPos: true, flow: "₹5,120 Cr" },
    { name: "Automotive & EV", change: "-0.45%", isPos: false, flow: "-₹420 Cr" },
    { name: "Pharmaceuticals & Healthcare", change: "-0.15%", isPos: false, flow: "-₹180 Cr" },
  ];

  return (
    <div className="min-h-screen bg-[#06090F] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      <Head>
        <title>Global Markets | AlphaTrack</title>
      </Head>

      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 overflow-y-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-24 lg:pb-8 space-y-5 sm:space-y-6 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2">
              <Globe2 className="h-6 w-6 text-cyan-400" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Global Markets & Sector Intelligence
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Macro liquidity trends, market breadth, and sector-level institutional flows
            </p>
          </div>

          {/* Indices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MARKET_INDICES.map((market) => (
              <MarketCard key={market.symbol} market={market} />
            ))}
          </div>

          {/* Sector Performance Grid */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0C111E]/90 p-5 backdrop-blur-xl shadow-2xl">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Layers className="h-4 w-4 text-indigo-400" />
              Sector Performance Heatmap
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sectors.map((sec) => (
                <div
                  key={sec.name}
                  className="rounded-xl border border-white/[0.06] bg-slate-900/60 p-4 transition-all hover:border-indigo-500/30"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-sm font-bold text-slate-200">{sec.name}</span>
                    <span
                      className={`flex items-center text-xs font-bold ${
                        sec.isPos ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {sec.isPos ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                      {sec.change}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-slate-400">
                    <span>Net Institutional Flow:</span>
                    <span className="font-mono text-cyan-300">{sec.flow}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gainers & Losers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Gainers */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0C111E]/90 p-5 backdrop-blur-xl shadow-2xl">
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2 text-emerald-400">
                <TrendingUp className="h-4 w-4" /> Top Outperforming Assets
              </h3>
              <div className="space-y-2">
                {gainers.map((s) => (
                  <Link
                    key={s.symbol}
                    href="/dashboard"
                    className="flex items-center justify-between rounded-xl bg-slate-900/40 p-3 hover:bg-slate-800/80 transition-all border border-white/[0.04]"
                  >
                    <div>
                      <span className="font-bold text-white">{s.symbol}</span>
                      <span className="text-xs text-slate-400 block">{s.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-white block">
                        {s.currency}{s.price.toFixed(2)}
                      </span>
                      <span className="text-xs font-bold text-emerald-400">
                        +{s.changePercent}%
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Top Losers */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0C111E]/90 p-5 backdrop-blur-xl shadow-2xl">
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2 text-rose-400">
                <TrendingDown className="h-4 w-4" /> Consolidating / Pullback Assets
              </h3>
              <div className="space-y-2">
                {losers.map((s) => (
                  <Link
                    key={s.symbol}
                    href="/dashboard"
                    className="flex items-center justify-between rounded-xl bg-slate-900/40 p-3 hover:bg-slate-800/80 transition-all border border-white/[0.04]"
                  >
                    <div>
                      <span className="font-bold text-white">{s.symbol}</span>
                      <span className="text-xs text-slate-400 block">{s.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-white block">
                        {s.currency}{s.price.toFixed(2)}
                      </span>
                      <span className="text-xs font-bold text-rose-400">
                        {s.changePercent}%
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
