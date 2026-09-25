import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { MarketIndex } from "@/data/mockData";

interface MarketCardProps {
  market: MarketIndex;
}

export const MarketCard: React.FC<MarketCardProps> = ({ market }) => {
  const isPositive = market.isPositive;
  const minVal = Math.min(...market.sparkline);
  const maxVal = Math.max(...market.sparkline);
  const range = maxVal - minVal || 1;

  // Convert sparkline points into SVG path coordinates
  const width = 120;
  const height = 36;
  const points = market.sparkline
    .map((val, idx) => {
      const x = (idx / (market.sparkline.length - 1)) * width;
      const y = height - ((val - minVal) / range) * (height - 8) - 4;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0C111E]/80 p-4 backdrop-blur-md transition-all duration-300 hover:border-indigo-500/30 hover:bg-[#101728] hover:shadow-xl hover:shadow-indigo-950/30">
      {/* Ambient gradient glow on card hover */}
      <div className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30 ${
        isPositive ? "bg-emerald-500" : "bg-rose-500"
      }`} />

      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            {market.name}
          </span>
          <h3 className="text-base font-bold text-white tracking-tight mt-0.5">
            {market.symbol}
          </h3>
        </div>

        {/* Change badge */}
        <div
          className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
            isPositive
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          <span>
            {isPositive ? "+" : ""}
            {market.changePercent}%
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <div>
          <div className="text-xl font-extrabold text-white tracking-tight">
            {market.value}
          </div>
          <div className={`text-xs font-medium mt-0.5 ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
            {market.change} today
          </div>
        </div>

        {/* Mini SVG Sparkline */}
        <div className="w-28 h-9 overflow-hidden">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id={`grad-${market.symbol}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isPositive ? "#10B981" : "#F43F5E"} stopOpacity="0.4" />
                <stop offset="100%" stopColor={isPositive ? "#10B981" : "#F43F5E"} stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke={isPositive ? "#10B981" : "#F43F5E"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
