import React from "react";
import { Stock } from "@/data/mockData";
import { Activity, Gauge, TrendingUp, Compass, ArrowUpRight } from "lucide-react";

interface IndicatorSectionProps {
  stock: Stock;
}

export const TechnicalIndicatorsSection: React.FC<IndicatorSectionProps> = ({ stock }) => {
  const { rsi, macd, movingAverage, bollingerBands } = stock.indicators;

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0C111E]/90 p-5 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white tracking-tight">
            Technical Indicators
          </h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">14-Period Multi-Timeframe</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. RSI Indicator */}
        <div className="rounded-xl border border-white/[0.06] bg-slate-900/60 p-4 transition-all hover:border-indigo-500/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              RSI (14)
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                rsi.status === "Overbought"
                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                  : rsi.status === "Oversold"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
              }`}
            >
              {rsi.status}
            </span>
          </div>

          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-white tracking-tight">
              {rsi.value}
            </span>
            <span className="text-[11px] text-slate-400">Range: 0 - 100</span>
          </div>

          {/* RSI Visual Gauge / Bar */}
          <div className="mt-3">
            <div className="relative h-2 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-rose-400"
                style={{ width: "100%" }}
              />
              <div
                className="absolute top-0 bottom-0 w-2.5 -ml-1 rounded-full bg-white shadow-md ring-2 ring-indigo-500"
                style={{ left: `${rsi.value}%` }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-[10px] text-slate-500">
              <span>30 Oversold</span>
              <span>50 Mid</span>
              <span>70 Overbought</span>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-slate-400 truncate">{rsi.signal}</p>
        </div>

        {/* 2. MACD Indicator */}
        <div className="rounded-xl border border-white/[0.06] bg-slate-900/60 p-4 transition-all hover:border-indigo-500/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              MACD
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                macd.status === "Bullish"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
              }`}
            >
              {macd.status}
            </span>
          </div>

          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-400 tracking-tight">
              {macd.value}
            </span>
            <span className="text-[11px] text-slate-400">Signal Cross</span>
          </div>

          {/* MACD Gauge Bar */}
          <div className="mt-3">
            <div className="relative h-2 w-full rounded-full bg-slate-800 flex overflow-hidden">
              <div className="h-full w-1/2 bg-rose-500/30" />
              <div className="h-full w-1/2 bg-emerald-500/30" />
              <div
                className="absolute top-0 bottom-0 w-2.5 -ml-1 rounded-full bg-emerald-400 shadow-md ring-2 ring-emerald-300"
                style={{ left: "70%" }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-[10px] text-slate-500">
              <span>-5 Bearish</span>
              <span>0 Baseline</span>
              <span>+5 Bullish</span>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-slate-400 truncate">{macd.signal}</p>
        </div>

        {/* 3. Moving Average Indicator */}
        <div className="rounded-xl border border-white/[0.06] bg-slate-900/60 p-4 transition-all hover:border-indigo-500/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Moving Average
            </span>
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
              {movingAverage.status}
            </span>
          </div>

          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-white tracking-tight">
              {movingAverage.value}
            </span>
            <span className="text-[11px] text-emerald-400 flex items-center">
              <ArrowUpRight className="h-3 w-3" /> +3.4%
            </span>
          </div>

          {/* Moving Average Gauge */}
          <div className="mt-3">
            <div className="relative h-2 w-full rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full rounded-full bg-indigo-600" style={{ width: "75%" }} />
            </div>
            <div className="mt-1.5 flex justify-between text-[10px] text-slate-500">
              <span>Below MA 50</span>
              <span>At MA</span>
              <span>Above MA 20</span>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-slate-400 truncate">{movingAverage.signal}</p>
        </div>

        {/* 4. Bollinger Bands Indicator */}
        <div className="rounded-xl border border-white/[0.06] bg-slate-900/60 p-4 transition-all hover:border-indigo-500/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Bollinger Bands
            </span>
            <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-cyan-300 border border-indigo-500/30">
              {bollingerBands.status}
            </span>
          </div>

          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-black text-white tracking-tight">
              Bandwidth: 4.8%
            </span>
            <span className="text-[11px] text-slate-400">20-SMA Base</span>
          </div>

          {/* Bollinger Band Range visualization */}
          <div className="mt-3">
            <div className="relative h-2 w-full rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500"
                style={{ width: "65%" }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-[10px] text-slate-500">
              <span>L: {stock.currency}{bollingerBands.lower}</span>
              <span>U: {stock.currency}{bollingerBands.upper}</span>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-slate-400 truncate">Price oscillating within upper boundary</p>
        </div>
      </div>
    </div>
  );
};
