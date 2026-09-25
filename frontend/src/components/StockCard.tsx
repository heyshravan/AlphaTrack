import React from "react";
import { TrendingUp, TrendingDown, Layers, BarChart2, ShieldCheck, Sparkles, Plus, Check } from "lucide-react";
import { Stock } from "@/data/mockData";

interface StockCardProps {
  stock: Stock;
  isWatchlisted: boolean;
  onToggleWatchlist: (symbol: string) => void;
}

export const StockCard: React.FC<StockCardProps> = ({
  stock,
  isWatchlisted,
  onToggleWatchlist,
}) => {
  const isPositive = stock.change >= 0;
  const range52W = stock.high52W - stock.low52W;
  const currentPos52W = Math.min(
    Math.max(((stock.price - stock.low52W) / (range52W || 1)) * 100, 0),
    100
  );

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0C111E]/90 p-4 sm:p-6 backdrop-blur-xl shadow-2xl transition-all">
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 border-b border-white/[0.08] pb-4 sm:pb-5">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-900/60 via-slate-800 to-indigo-600/30 border border-indigo-500/30 text-base sm:text-lg font-black tracking-wider text-cyan-300 shadow-md">
            {stock.symbol.slice(0, 3)}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                {stock.symbol}
              </h2>
              <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[11px] font-semibold text-slate-300 border border-white/10 whitespace-nowrap">
                NSE / Large Cap
              </span>
              <span className="flex items-center gap-1 rounded-full bg-indigo-500/10 px-2 py-0.5 text-[11px] font-medium text-cyan-400 border border-indigo-500/30 whitespace-nowrap">
                <Sparkles className="h-3 w-3" />
                AI Monitored
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-400 mt-0.5">{stock.name}</p>
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onToggleWatchlist(stock.symbol)}
            className={`flex items-center gap-1.5 sm:gap-2 rounded-xl px-3.5 sm:px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
              isWatchlisted
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "border border-white/10 bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white"
            }`}
          >
            {isWatchlisted ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>In Watchlist</span>
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" />
                <span>Add to Watchlist</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Primary Price & Metrics Grid */}
      <div className="mt-4 sm:mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4">
        {/* Current Price */}
        <div className="rounded-xl border border-white/[0.05] bg-slate-900/40 p-3 sm:p-3.5">
          <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-wider">Current Price</span>
          <div className="mt-0.5 text-xl sm:text-2xl font-black text-white tracking-tight">
            {stock.currency}{stock.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
          <div
            className={`mt-1 flex items-center gap-1 text-[11px] sm:text-xs font-bold ${
              isPositive ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
            <span className="truncate">
              {isPositive ? "+" : ""}{stock.currency}{stock.change.toFixed(2)} ({isPositive ? "+" : ""}{stock.changePercent}%)
            </span>
          </div>
        </div>

        {/* Market Cap */}
        <div className="rounded-xl border border-white/[0.05] bg-slate-900/40 p-3 sm:p-3.5">
          <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-wider">Market Cap</span>
          <div className="mt-0.5 text-lg sm:text-xl font-bold text-white tracking-tight truncate">
            {stock.marketCap}
          </div>
          <span className="text-[10px] sm:text-[11px] text-slate-500">Tier 1 Mega Cap</span>
        </div>

        {/* Volume */}
        <div className="rounded-xl border border-white/[0.05] bg-slate-900/40 p-3 sm:p-3.5">
          <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-wider">24h Volume</span>
          <div className="mt-0.5 text-lg sm:text-xl font-bold text-white tracking-tight truncate">
            {stock.volume}
          </div>
          <span className="text-[10px] sm:text-[11px] text-cyan-400 font-medium">+18% vs avg</span>
        </div>

        {/* 52W High */}
        <div className="rounded-xl border border-white/[0.05] bg-slate-900/40 p-3 sm:p-3.5">
          <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-wider">52W High</span>
          <div className="mt-0.5 text-lg sm:text-xl font-bold text-emerald-400 tracking-tight truncate">
            {stock.currency}{stock.high52W.toLocaleString()}
          </div>
          <span className="text-[10px] sm:text-[11px] text-slate-500">Peak Resistance</span>
        </div>

        {/* 52W Low */}
        <div className="rounded-xl border border-white/[0.05] bg-slate-900/40 p-3.5">
          <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-wider">52W Low</span>
          <div className="mt-0.5 text-lg sm:text-xl font-bold text-rose-400 tracking-tight truncate">
            {stock.currency}{stock.low52W.toLocaleString()}
          </div>
          <span className="text-[10px] sm:text-[11px] text-slate-500">Floor Support</span>
        </div>

        {/* P/E Ratio & Valuation */}
        <div className="rounded-xl border border-white/[0.05] bg-slate-900/40 p-3 sm:p-3.5">
          <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-wider">P/E Ratio</span>
          <div className="mt-0.5 text-lg sm:text-xl font-bold text-white tracking-tight truncate">
            {stock.peRatio}x
          </div>
          <span className="text-[10px] sm:text-[11px] text-indigo-400 font-medium">Fair Multiplier</span>
        </div>
      </div>

      {/* 52-Week Range Bar */}
      <div className="mt-3.5 sm:mt-4 rounded-xl border border-white/[0.05] bg-slate-900/30 p-3 sm:p-3.5">
        <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] sm:text-xs text-slate-400">
          <span>
            52W Low: <strong className="text-slate-200">{stock.currency}{stock.low52W}</strong>
          </span>
          <span className="font-semibold text-cyan-400">
            Current Range: {currentPos52W.toFixed(0)}% from low
          </span>
          <span>
            52W High: <strong className="text-slate-200">{stock.currency}{stock.high52W}</strong>
          </span>
        </div>
        <div className="relative mt-2 h-2 w-full rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400"
            style={{ width: "100%" }}
          />
          <div
            className="absolute top-0 bottom-0 w-3 -ml-1.5 rounded-full bg-white ring-2 ring-indigo-500 shadow-md transition-all duration-500"
            style={{ left: `${currentPos52W}%` }}
          />
        </div>
      </div>
    </div>
  );
};
