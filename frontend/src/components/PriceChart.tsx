import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import {
  TrendingUp,
  Maximize2,
  Sliders,
  Eye,
  Activity,
  Layers,
  BarChart,
  LineChart as LineChartIcon,
} from "lucide-react";
import { Stock } from "@/data/mockData";

interface PriceChartProps {
  stock: Stock;
}

export const PriceChart: React.FC<PriceChartProps> = ({ stock }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [timeframe, setTimeframe] = useState<string>("1M");
  const [chartType, setChartType] = useState<"area" | "candle" | "line">("area");
  const [showMA, setShowMA] = useState(true);
  const [showEMA, setShowEMA] = useState(false);
  const [showBollinger, setShowBollinger] = useState(false);
  const [showVolume, setShowVolume] = useState(true);
  const [subIndicator, setSubIndicator] = useState<"none" | "rsi" | "macd">("none");

  const data = stock.history[timeframe] || stock.history["1M"] || [];

  const timeframes = ["1D", "1W", "1M", "6M", "1Y", "5Y"];

  const minPrice = Math.min(...data.map((d) => d.low || d.price * 0.98));
  const maxPrice = Math.max(...data.map((d) => d.high || d.price * 1.02));
  const priceMargin = (maxPrice - minPrice) * 0.08 || 1;

  // Custom rich tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      return (
        <div className="rounded-xl border border-white/10 bg-[#0B0F19]/95 p-3.5 shadow-2xl backdrop-blur-md text-xs">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-2 mb-2 font-mono text-slate-400">
            <span>{label}</span>
            <span className="font-semibold text-white">{stock.symbol}</span>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <span className="text-slate-400">Price:</span>
            <span className="font-bold text-white text-right">
              {stock.currency}{point.price?.toFixed(2)}
            </span>
            {point.high && (
              <>
                <span className="text-slate-400">High:</span>
                <span className="text-emerald-400 text-right">
                  {stock.currency}{point.high?.toFixed(2)}
                </span>
                <span className="text-slate-400">Low:</span>
                <span className="text-rose-400 text-right">
                  {stock.currency}{point.low?.toFixed(2)}
                </span>
              </>
            )}
            {point.volume && (
              <>
                <span className="text-slate-400">Volume:</span>
                <span className="text-cyan-400 text-right">
                  {point.volume.toLocaleString()}
                </span>
              </>
            )}
            {showMA && point.ma20 && (
              <>
                <span className="text-amber-400">MA 20:</span>
                <span className="text-amber-300 text-right">
                  {stock.currency}{point.ma20.toFixed(2)}
                </span>
              </>
            )}
            {showEMA && point.ema20 && (
              <>
                <span className="text-indigo-400">EMA 20:</span>
                <span className="text-indigo-300 text-right">
                  {stock.currency}{point.ema20.toFixed(2)}
                </span>
              </>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0C111E]/90 p-3.5 sm:p-5 backdrop-blur-xl shadow-2xl">
      {/* Top Chart Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-3.5">
        {/* Timeframe selector */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar rounded-xl bg-slate-900/80 p-1 border border-white/[0.06] shrink-0">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`rounded-lg px-2.5 sm:px-3 py-1 text-xs font-bold whitespace-nowrap transition-all ${
                timeframe === tf
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Chart Style Switcher */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-900/80 p-1 border border-white/[0.06] shrink-0">
          <button
            onClick={() => setChartType("area")}
            title="Area Chart"
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
              chartType === "area"
                ? "bg-slate-800 text-cyan-400 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Gradient</span>
          </button>
          <button
            onClick={() => setChartType("line")}
            title="Line Chart"
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
              chartType === "line"
                ? "bg-slate-800 text-cyan-400 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <LineChartIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Line</span>
          </button>
          <button
            onClick={() => setChartType("candle")}
            title="Candlestick Visualization"
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
              chartType === "candle"
                ? "bg-slate-800 text-cyan-400 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <BarChart className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Bar</span>
          </button>
        </div>

        {/* Technical Indicator Overlay Toggles */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 mr-1 hidden md:inline">
            Overlays:
          </span>
          <button
            onClick={() => setShowMA(!showMA)}
            className={`rounded-lg px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all border ${
              showMA
                ? "border-amber-500/40 bg-amber-500/15 text-amber-300"
                : "border-white/[0.06] bg-slate-900/60 text-slate-400 hover:text-white"
            }`}
          >
            MA 20
          </button>
          <button
            onClick={() => setShowEMA(!showEMA)}
            className={`rounded-lg px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all border ${
              showEMA
                ? "border-indigo-500/40 bg-indigo-500/15 text-indigo-300"
                : "border-white/[0.06] bg-slate-900/60 text-slate-400 hover:text-white"
            }`}
          >
            EMA 20
          </button>
          <button
            onClick={() => setShowBollinger(!showBollinger)}
            className={`rounded-lg px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all border ${
              showBollinger
                ? "border-cyan-500/40 bg-cyan-500/15 text-cyan-300"
                : "border-white/[0.06] bg-slate-900/60 text-slate-400 hover:text-white"
            }`}
          >
            Bollinger
          </button>
          <button
            onClick={() => setShowVolume(!showVolume)}
            className={`rounded-lg px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all border ${
              showVolume
                ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                : "border-white/[0.06] bg-slate-900/60 text-slate-400 hover:text-white"
            }`}
          >
            Volume
          </button>
        </div>
      </div>

      {/* Sub-Indicator Switcher Bar (RSI / MACD / Standard) */}
      <div className="flex items-center justify-between py-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-slate-400">Sub-Indicator:</span>
          <button
            onClick={() => setSubIndicator("none")}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
              subIndicator === "none" ? "bg-indigo-600/30 text-cyan-300 border border-indigo-500/40" : "hover:text-slate-200"
            }`}
          >
            Off
          </button>
          <button
            onClick={() => setSubIndicator("rsi")}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
              subIndicator === "rsi" ? "bg-indigo-600/30 text-cyan-300 border border-indigo-500/40" : "hover:text-slate-200"
            }`}
          >
            RSI (14)
          </button>
          <button
            onClick={() => setSubIndicator("macd")}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
              subIndicator === "macd" ? "bg-indigo-600/30 text-cyan-300 border border-indigo-500/40" : "hover:text-slate-200"
            }`}
          >
            MACD (12, 26, 9)
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-3 font-mono text-[11px]">
          <span className="flex items-center gap-1 text-amber-300">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> MA: 20
          </span>
          <span className="flex items-center gap-1 text-indigo-300">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" /> EMA: 20
          </span>
          <span className="flex items-center gap-1 text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> Vol: 24h
          </span>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="h-80 sm:h-96 w-full pt-2">
        {isMounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={0.45} />
                  <stop offset="50%" stopColor="#06B6D4" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="bollingerGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.12} />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity={0.03} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#1E273A" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: "#1E273A" }}
              />
              <YAxis
                yAxisId="price"
                domain={[minPrice - priceMargin, maxPrice + priceMargin]}
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: "#1E273A" }}
                tickFormatter={(v) => `${stock.currency}${v.toFixed(0)}`}
              />

              {showVolume && (
                <YAxis
                  yAxisId="volume"
                  orientation="right"
                  stroke="#475569"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, (dataMax: number) => dataMax * 4]}
                  hide={true}
                />
              )}

              <Tooltip content={<CustomTooltip />} />

              {/* Volume Histogram */}
              {showVolume && (
                <Bar
                  yAxisId="volume"
                  dataKey="volume"
                  fill="url(#volumeGradient)"
                  radius={[4, 4, 0, 0]}
                />
              )}

              {/* Bollinger Bands */}
              {showBollinger && (
                <>
                  <Line
                    yAxisId="price"
                    type="monotone"
                    dataKey="bollingerUpper"
                    stroke="#38BDF8"
                    strokeDasharray="4 4"
                    strokeWidth={1}
                    dot={false}
                    isAnimationActive={false}
                  />
                  <Line
                    yAxisId="price"
                    type="monotone"
                    dataKey="bollingerLower"
                    stroke="#38BDF8"
                    strokeDasharray="4 4"
                    strokeWidth={1}
                    dot={false}
                    isAnimationActive={false}
                  />
                </>
              )}

              {/* Price Line or Area */}
              {chartType === "area" && (
                <Area
                  yAxisId="price"
                  type="monotone"
                  dataKey="price"
                  stroke="#6366F1"
                  strokeWidth={2.5}
                  fill="url(#priceGradient)"
                  dot={false}
                  activeDot={{ r: 6, fill: "#22D3EE", stroke: "#FFFFFF", strokeWidth: 2 }}
                />
              )}

              {chartType === "line" && (
                <Line
                  yAxisId="price"
                  type="monotone"
                  dataKey="price"
                  stroke="#22D3EE"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 6, fill: "#6366F1", stroke: "#FFFFFF", strokeWidth: 2 }}
                />
              )}

              {chartType === "candle" && (
                <Bar
                  yAxisId="price"
                  dataKey="high"
                  fill="#10B981"
                  radius={[2, 2, 2, 2]}
                />
              )}

              {/* Moving Averages */}
              {showMA && (
                <Line
                  yAxisId="price"
                  type="monotone"
                  dataKey="ma20"
                  stroke="#F59E0B"
                  strokeWidth={1.8}
                  dot={false}
                  isAnimationActive={false}
                />
              )}

              {showEMA && (
                <Line
                  yAxisId="price"
                  type="monotone"
                  dataKey="ema20"
                  stroke="#818CF8"
                  strokeWidth={1.8}
                  dot={false}
                  isAnimationActive={false}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full rounded-xl bg-slate-900/40 animate-pulse flex items-center justify-center text-xs text-slate-500">
            Loading Historical Price Stream...
          </div>
        )}
      </div>

      {/* Sub-Chart (if RSI or MACD selected) */}
      {subIndicator !== "none" && (
        <div className="mt-4 pt-3 border-t border-white/[0.08] h-28 w-full">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-300">
              {subIndicator === "rsi" ? "RSI (Relative Strength Index - 14)" : "MACD Oscillations"}
            </span>
            <span className="font-mono text-cyan-400">
              {subIndicator === "rsi" ? `Current: ${stock.indicators.rsi.value}` : `Value: ${stock.indicators.macd.value}`}
            </span>
          </div>
          {isMounted ? (
            <ResponsiveContainer width="100%" height="80%">
              <ComposedChart
                data={data.map((d, idx) => ({
                  date: d.date,
                  val: subIndicator === "rsi"
                    ? Math.sin(idx / 3) * 18 + 55
                    : Math.cos(idx / 4) * 2.5,
                }))}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="2 2" stroke="#1E273A" />
                <XAxis dataKey="date" hide />
                <YAxis
                  domain={subIndicator === "rsi" ? [20, 80] : [-4, 4]}
                  stroke="#64748B"
                  fontSize={10}
                  tickLine={false}
                />
                {subIndicator === "rsi" && (
                  <>
                    <ReferenceLine y={70} stroke="#F43F5E" strokeDasharray="3 3" label={{ value: "70 Overbought", fill: "#F43F5E", fontSize: 9 }} />
                    <ReferenceLine y={30} stroke="#10B981" strokeDasharray="3 3" label={{ value: "30 Oversold", fill: "#10B981", fontSize: 9 }} />
                  </>
                )}
                <Line
                  type="monotone"
                  dataKey="val"
                  stroke={subIndicator === "rsi" ? "#A855F7" : "#06B6D4"}
                  strokeWidth={2}
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full rounded-lg bg-slate-900/30 animate-pulse" />
          )}
        </div>
      )}
    </div>
  );
};
