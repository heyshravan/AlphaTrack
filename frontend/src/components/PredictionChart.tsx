import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import {
  BrainCircuit,
  TrendingUp,
  TrendingDown,
  ShieldAlert,
  Sparkles,
  Calendar,
  AlertTriangle,
  Zap,
} from "lucide-react";
import { Stock } from "@/data/mockData";

interface PredictionChartProps {
  stock: Stock;
}

export const PredictionChart: React.FC<PredictionChartProps> = ({ stock }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const prediction = stock.aiPrediction;
  const isBullish = prediction.trend === "BULLISH";

  const chartData = prediction.forecastPoints;
  const minVal = Math.min(...chartData.map((d) => d.lowerBand)) * 0.99;
  const maxVal = Math.max(...chartData.map((d) => d.upperBand)) * 1.01;

  const CustomPredictionTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      return (
        <div className="rounded-xl border border-indigo-500/40 bg-[#0C0F1D]/95 p-3.5 shadow-2xl backdrop-blur-md text-xs">
          <div className="flex items-center gap-2 border-b border-indigo-500/20 pb-2 mb-2">
            <BrainCircuit className="h-3.5 w-3.5 text-cyan-400" />
            <span className="font-semibold text-white">{label}</span>
          </div>
          <div className="space-y-1">
            {point.historical !== undefined && (
              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Historical Price:</span>
                <span className="font-bold text-slate-200">
                  {stock.currency}{point.historical}
                </span>
              </div>
            )}
            <div className="flex justify-between gap-4">
              <span className="text-cyan-400">AI Target:</span>
              <span className="font-bold text-cyan-300">
                {stock.currency}{point.predicted}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-purple-400">Confidence Band:</span>
              <span className="font-medium text-slate-300">
                {stock.currency}{point.lowerBand} - {stock.currency}{point.upperBand}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-[#0B0F20]/90 via-[#0F1426]/90 to-[#0A0D1B]/90 p-6 backdrop-blur-xl shadow-2xl shadow-indigo-950/40">
      {/* Decorative ambient radial gradients */}
      <div className="pointer-events-none absolute -left-12 -top-12 h-44 w-44 rounded-full bg-indigo-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 -bottom-12 h-44 w-44 rounded-full bg-cyan-600/15 blur-3xl" />

      {/* Header and Model Tag */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 text-white shadow-lg shadow-indigo-500/30">
            <BrainCircuit className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">
                AI Trend Prediction
              </h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/20 px-2 py-0.5 text-[11px] font-semibold text-cyan-300 border border-indigo-500/30">
                <Sparkles className="h-3 w-3" />
                {prediction.modelName}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Multi-scale Transformer architecture forecasting stock trajectory with Bayesian uncertainty bounds
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">
          <Zap className="h-3.5 w-3.5 text-cyan-400" />
          <span>Live Forecast</span>
        </div>
      </div>

      {/* 4 Core Prediction Metric Cards */}
      <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Predicted Trend */}
        <div className="rounded-xl border border-white/[0.08] bg-slate-900/60 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Predicted Trend
          </span>
          <div className="mt-1 flex items-center gap-2">
            <span
              className={`text-xl font-extrabold tracking-tight ${
                isBullish ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {prediction.trend}
            </span>
            {isBullish ? (
              <TrendingUp className="h-5 w-5 text-emerald-400 animate-bounce" />
            ) : (
              <TrendingDown className="h-5 w-5 text-rose-400" />
            )}
          </div>
          <span className="text-[11px] text-slate-400">High Conviction Signal</span>
        </div>

        {/* Confidence */}
        <div className="rounded-xl border border-white/[0.08] bg-slate-900/60 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Confidence
          </span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-cyan-300 tracking-tight">
              {prediction.confidence}%
            </span>
            <span className="text-[11px] text-cyan-400 font-medium">Ensemble</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
              style={{ width: `${prediction.confidence}%` }}
            />
          </div>
        </div>

        {/* Expected Movement */}
        <div className="rounded-xl border border-white/[0.08] bg-slate-900/60 p-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Expected Movement
          </span>
          <div className="mt-1 text-lg font-black text-white tracking-tight">
            {prediction.expectedMovement}
          </div>
          <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
            <Zap className="h-3 w-3" /> Target upside
          </span>
        </div>

        {/* Prediction Horizon & Risk */}
        <div className="rounded-xl border border-white/[0.08] bg-slate-900/60 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Horizon / Risk
            </span>
            <span
              className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                prediction.riskLevel === "Low"
                  ? "bg-emerald-500/20 text-emerald-300"
                  : prediction.riskLevel === "Medium"
                  ? "bg-amber-500/20 text-amber-300"
                  : "bg-rose-500/20 text-rose-300"
              }`}
            >
              {prediction.riskLevel} Risk
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-base font-bold text-white">
            <Calendar className="h-4 w-4 text-indigo-400" />
            {prediction.horizon}
          </div>
          <span className="text-[11px] text-slate-400">Continuous 7-Day Window</span>
        </div>
      </div>

      {/* Prediction Visualization Graph */}
      <div className="mt-5 rounded-xl border border-white/[0.06] bg-slate-950/50 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-200">
              Historical Price → Predicted Trajectory
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              (95% Confidence Interval)
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="h-2 w-2 rounded-full bg-slate-400" />
              Historical
            </div>
            <div className="flex items-center gap-1.5 text-cyan-400">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              AI Predicted
            </div>
            <div className="flex items-center gap-1.5 text-indigo-400">
              <span className="h-2 w-3 rounded bg-indigo-500/30 border border-indigo-400" />
              Confidence Spread
            </div>
          </div>
        </div>

        <div className="h-64 w-full">
          {isMounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="aiConfidenceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818CF8" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.06} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#1E273A" vertical={false} />
                <XAxis
                  dataKey="day"
                  stroke="#64748B"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: "#1E273A" }}
                />
                <YAxis
                  domain={[minVal, maxVal]}
                  stroke="#64748B"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: "#1E273A" }}
                  tickFormatter={(v) => `${stock.currency}${v.toFixed(0)}`}
                />
                <Tooltip content={<CustomPredictionTooltip />} />

                {/* Upper & Lower Bound Area (Confidence Range) */}
                <Area
                  type="monotone"
                  dataKey="upperBand"
                  stroke="#818CF8"
                  strokeDasharray="3 3"
                  strokeWidth={1}
                  fill="url(#aiConfidenceGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="lowerBand"
                  stroke="#06B6D4"
                  strokeDasharray="3 3"
                  strokeWidth={1}
                  fill="#0A0D1B"
                />

                {/* Historical Price line */}
                <Line
                  type="monotone"
                  dataKey="historical"
                  stroke="#94A3B8"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#94A3B8" }}
                />

                {/* AI Predicted Line */}
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#22D3EE"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#22D3EE" }}
                  activeDot={{ r: 7, fill: "#38BDF8", stroke: "#FFFFFF", strokeWidth: 2 }}
                />

                {/* Today line divider */}
                <ReferenceLine
                  x="Today"
                  stroke="#818CF8"
                  strokeDasharray="4 4"
                  label={{ value: "Forecast Boundary", fill: "#818CF8", fontSize: 10, position: "top" }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full rounded-xl bg-slate-900/40 animate-pulse flex items-center justify-center text-xs text-slate-500">
              Initializing AI Probability Distribution...
            </div>
          )}
        </div>

        {/* AI Model Summary Note */}
        <div className="mt-3 rounded-lg border border-indigo-500/20 bg-indigo-950/20 p-3 text-xs text-indigo-200 flex items-start gap-2">
          <Sparkles className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-white">Neural Synthesizer: </strong>
            {prediction.summary}
          </p>
        </div>
      </div>
    </div>
  );
};
