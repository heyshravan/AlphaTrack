import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { PredictionChart } from "@/components/PredictionChart";
import { MobileNav } from "@/components/MobileNav";
import { STOCKS_DATA } from "@/data/mockData";
import { BrainCircuit, Cpu, Sparkles, CheckCircle2, Zap, ArrowRight, ShieldCheck } from "lucide-react";

export default function PredictionsPage() {
  const [selectedSym, setSelectedSym] = useState("RELIANCE");
  const stock = STOCKS_DATA[selectedSym] || STOCKS_DATA["RELIANCE"];
  const allStocks = Object.values(STOCKS_DATA);

  return (
    <div className="min-h-screen bg-[#06090F] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      <Head>
        <title>AI Trend Predictions | AlphaTrack</title>
      </Head>

      <Navbar />

      <div className="flex flex-1">
        <Sidebar currentStockSymbol={selectedSym} />

        <main className="flex-1 overflow-y-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-24 lg:pb-8 space-y-5 sm:space-y-6 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-6 w-6 text-cyan-400" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                AI Prediction Laboratory
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Multi-Horizon Transformer Neural Network Model Projections
            </p>
          </div>

          {/* Model Architecture telemetry stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0C111E]/90 p-4">
              <span className="text-xs text-slate-400">Architecture</span>
              <div className="text-base font-bold text-white mt-1">AlphaLSTM-v4 Multi-Head</div>
              <span className="text-[11px] text-cyan-400">Transformer + Attention</span>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-[#0C111E]/90 p-4">
              <span className="text-xs text-slate-400">Backtest Accuracy</span>
              <div className="text-xl font-black text-emerald-400 mt-1">89.4% Directional</div>
              <span className="text-[11px] text-slate-500">Historical 3-year validation</span>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-[#0C111E]/90 p-4">
              <span className="text-xs text-slate-400">Inference Speed</span>
              <div className="text-xl font-black text-white mt-1">14ms / asset</div>
              <span className="text-[11px] text-indigo-400">Sub-second streaming</span>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-[#0C111E]/90 p-4">
              <span className="text-xs text-slate-400">Uncertainty Bounds</span>
              <div className="text-xl font-black text-purple-400 mt-1">95% Bayesian</div>
              <span className="text-[11px] text-slate-500">Monte Carlo dropout</span>
            </div>
          </div>

          {/* Stock selector tabs with clean mobile scroll */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <span className="text-xs font-semibold text-slate-400 mr-1 whitespace-nowrap shrink-0">Select Equity:</span>
            {allStocks.map((s) => (
              <button
                key={s.symbol}
                onClick={() => setSelectedSym(s.symbol)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                  selectedSym === s.symbol
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "border border-white/[0.08] bg-slate-900/60 text-slate-300 hover:text-white"
                }`}
              >
                {s.symbol} ({s.aiPrediction.confidence}%)
              </button>
            ))}
          </div>

          {/* Detailed Prediction Card */}
          <PredictionChart stock={stock} />

          {/* Cross Asset Ranking */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0C111E]/90 p-5 backdrop-blur-xl shadow-2xl">
            <h3 className="text-base font-bold text-white mb-3">
              AI Conviction Leaderboard across Tracked Equities
            </h3>
            <div className="space-y-2">
              {[...allStocks]
                .sort((a, b) => b.aiPrediction.confidence - a.aiPrediction.confidence)
                .map((s, idx) => (
                  <div
                    key={s.symbol}
                    onClick={() => setSelectedSym(s.symbol)}
                    className="flex items-center justify-between rounded-xl bg-slate-900/40 p-3 hover:bg-slate-800/80 cursor-pointer transition-all border border-white/[0.04]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-slate-500 w-4">#{idx + 1}</span>
                      <div>
                        <span className="font-bold text-white">{s.symbol}</span>
                        <span className="text-xs text-slate-400 block">{s.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <span className="text-xs text-emerald-400 font-bold block">
                          {s.aiPrediction.expectedMovement}
                        </span>
                        <span className="text-[10px] text-slate-500">Target Range</span>
                      </div>
                      <div className="w-24 text-right">
                        <span className="font-black text-cyan-300">
                          {s.aiPrediction.confidence}%
                        </span>
                        <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden mt-1">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                            style={{ width: `${s.aiPrediction.confidence}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
