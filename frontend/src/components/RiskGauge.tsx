import React from "react";
import { ShieldAlert, ShieldCheck, AlertCircle, TrendingDown, Activity, Info } from "lucide-react";
import { Stock } from "@/data/mockData";

interface RiskGaugeProps {
  stock: Stock;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ stock }) => {
  const { risk } = stock;

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" };
      case "High":
        return { text: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30" };
      default:
        return { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" };
    }
  };

  const colors = getRiskColor(risk.level);

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0C111E]/90 p-5 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-amber-400" />
          <h3 className="text-base font-bold text-white tracking-tight">
            Risk Analysis
          </h3>
        </div>
        <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${colors.bg} ${colors.text} ${colors.border} border`}>
          <span>{risk.level} Risk</span>
        </div>
      </div>

      {/* Semicircular / Gauge Visual Meter */}
      <div className="mb-6 flex flex-col items-center">
        <div className="relative flex h-24 w-48 items-end justify-center overflow-hidden">
          {/* Semicircular arc */}
          <div className="absolute top-0 h-48 w-48 rounded-full border-[14px] border-slate-800" />
          <div
            className="absolute top-0 h-48 w-48 rounded-full border-[14px] border-transparent border-t-amber-400 border-l-emerald-400 border-r-rose-400 opacity-80"
            style={{
              transform: `rotate(${
                risk.level === "Low" ? -35 : risk.level === "Medium" ? 0 : 35
              }deg)`,
              transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
          {/* Value display in middle */}
          <div className="mb-1 text-center">
            <span className="text-xs uppercase tracking-wider text-slate-400">Risk Score</span>
            <div className={`text-2xl font-black ${colors.text}`}>{risk.marketRiskScore}/100</div>
          </div>
        </div>
        <div className="mt-2 flex w-48 justify-between text-[10px] font-bold text-slate-500">
          <span className="text-emerald-400">Low (0)</span>
          <span className="text-amber-400">Med (50)</span>
          <span className="text-rose-400">High (100)</span>
        </div>
      </div>

      {/* 4 Risk Metrics Breakdown */}
      <div className="space-y-3.5">
        {/* Volatility */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">Historical Volatility (30D)</span>
            <span className="font-bold text-white">{risk.volatility}</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500"
              style={{ width: `${risk.volatilityScore}%` }}
            />
          </div>
        </div>

        {/* Beta */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">Market Beta (Sensitivity)</span>
            <span className="font-bold text-cyan-400">{risk.beta}x</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-cyan-400"
              style={{ width: `${Math.min((risk.beta / 2.5) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Max Drawdown */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">Max Historical Drawdown</span>
            <span className="font-bold text-rose-400">{risk.drawdown}</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-rose-500"
              style={{ width: `${risk.drawdownScore}%` }}
            />
          </div>
        </div>

        {/* Market Risk Index */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">Systemic Market Risk</span>
            <span className="font-bold text-amber-300">{risk.marketRiskScore}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-amber-400"
              style={{ width: `${risk.marketRiskScore}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
