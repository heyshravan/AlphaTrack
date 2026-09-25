import React from "react";
import { Sparkles, Zap, BarChart, Activity, Compass, CheckCircle2 } from "lucide-react";
import { Stock } from "@/data/mockData";

interface AIInsightPanelProps {
  stock: Stock;
}

export const AIInsightPanel: React.FC<AIInsightPanelProps> = ({ stock }) => {
  const { insights } = stock;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Momentum":
        return Zap;
      case "Volume":
        return BarChart;
      case "Volatility":
        return Activity;
      default:
        return Compass;
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "Positive":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "Negative":
        return "bg-rose-500/20 text-rose-300 border-rose-500/30";
      default:
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
    }
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0C111E]/90 p-5 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/30 text-cyan-400 border border-indigo-500/40">
            <Sparkles className="h-4 w-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              AI Market Insights: {stock.symbol}
            </h3>
            <p className="text-xs text-slate-400">
              Synthesized by AlphaTrack Neural Natural Language Generator
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-cyan-400 border border-indigo-500/30">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Realtime Synthesis</span>
        </div>
      </div>

      {/* Grid of 4 Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight) => {
          const Icon = getCategoryIcon(insight.category);
          const impactClass = getImpactBadge(insight.impact);

          return (
            <div
              key={insight.title}
              className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-slate-900/60 p-4 transition-all duration-300 hover:border-indigo-500/40 hover:bg-slate-900/90"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-cyan-300 border border-indigo-500/30">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {insight.category} Insight
                  </span>
                </div>

                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold border ${impactClass}`}
                >
                  {insight.impact}
                </span>
              </div>

              <h4 className="text-sm font-semibold text-slate-200 mt-1">
                {insight.title}
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                “{insight.text}”
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
