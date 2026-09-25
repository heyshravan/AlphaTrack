import React from "react";
import Head from "next/head";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { STOCKS_DATA } from "@/data/mockData";
import { Activity, BarChart2, Layers, Cpu, Compass } from "lucide-react";

export default function AnalyticsPage() {
  const stocks = Object.values(STOCKS_DATA);

  return (
    <div className="min-h-screen bg-[#06090F] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      <Head>
        <title>Technical Analytics | AlphaTrack</title>
      </Head>

      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 overflow-y-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-24 lg:pb-8 space-y-5 sm:space-y-6 max-w-7xl mx-auto w-full">
          <div className="border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-purple-400" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Technical Indicators & Correlation Matrix
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Multi-asset momentum, oscillator divergence, and statistical co-movements
            </p>
          </div>

          {/* Indicator Comparative Grid */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0C111E]/90 p-3.5 sm:p-5 backdrop-blur-xl shadow-2xl">
            <h3 className="text-base font-bold text-white mb-4">
              Cross-Asset Technical Scoreboard
            </h3>
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full min-w-[620px] text-left text-xs">
                <thead>
                  <tr className="border-b border-white/[0.08] text-slate-400 uppercase font-semibold">
                    <th className="pb-3">Stock</th>
                    <th className="pb-3 text-right">Price</th>
                    <th className="pb-3 text-right">RSI (14)</th>
                    <th className="pb-3 text-right">MACD</th>
                    <th className="pb-3 text-center">MA 20 Status</th>
                    <th className="pb-3 text-right">Beta</th>
                    <th className="pb-3 text-right">Volatility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {stocks.map((s) => (
                    <tr key={s.symbol} className="hover:bg-slate-900/50">
                      <td className="py-3 font-bold text-white">{s.symbol}</td>
                      <td className="py-3 text-right font-mono">{s.currency}{s.price.toFixed(2)}</td>
                      <td className="py-3 text-right font-bold text-cyan-300">{s.indicators.rsi.value}</td>
                      <td className="py-3 text-right text-emerald-400 font-bold">{s.indicators.macd.value}</td>
                      <td className="py-3 text-center">
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/20">
                          {s.indicators.movingAverage.status}
                        </span>
                      </td>
                      <td className="py-3 text-right font-mono">{s.risk.beta}</td>
                      <td className="py-3 text-right font-mono text-amber-400">{s.risk.volatility}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
