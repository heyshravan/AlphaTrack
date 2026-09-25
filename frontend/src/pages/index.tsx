import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { MobileNav } from "@/components/MobileNav";
import {
  TrendingUp,
  BrainCircuit,
  BarChart3,
  Activity,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Zap,
  ChevronRight,
  LineChart as LineChartIcon,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { MARKET_INDICES, STOCKS_DATA } from "@/data/mockData";

export default function LandingPage() {
  const [activeHeroStock, setActiveHeroStock] = useState<"RELIANCE" | "NVDA">("RELIANCE");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentStock = STOCKS_DATA[activeHeroStock] || STOCKS_DATA["RELIANCE"];

  const features = [
    {
      title: "AI Trend Prediction",
      desc: "Transformer neural networks forecast price directions with 7-day probabilistic confidence intervals.",
      icon: BrainCircuit,
      badge: "Deep Learning",
      color: "from-indigo-500 to-cyan-400",
    },
    {
      title: "Technical Indicators",
      desc: "Real-time automated overlays for RSI, MACD, Bollinger Bands, EMA, and moving average crossovers.",
      icon: Activity,
      badge: "Algorithmic",
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Market Analytics",
      desc: "Instant macro sentiment aggregations across institutional order flows and technical momentum.",
      icon: BarChart3,
      badge: "Realtime",
      color: "from-emerald-500 to-teal-400",
    },
    {
      title: "Interactive Charts",
      desc: "Multi-timeframe dynamic charting with customized candle ranges, volume profiles, and overlays.",
      icon: LineChartIcon,
      badge: "Sub-Second",
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Risk Analysis",
      desc: "Comprehensive risk quantification with real-time volatility indices, Beta factors, and drawdown estimates.",
      icon: ShieldAlert,
      badge: "Risk Engine",
      color: "from-amber-500 to-orange-400",
    },
    {
      title: "Portfolio Insights",
      desc: "AI-synthesized natural language summaries highlighting volume spikes and technical inflection points.",
      icon: Sparkles,
      badge: "NLP Synthesis",
      color: "from-rose-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#06090F] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      <Head>
        <title>AlphaTrack | Machine Learning-Based Stock Trend Analysis</title>
        <meta
          name="description"
          content="Analyze market trends, explore technical indicators, and understand AI-powered stock predictions — all in one intelligent dashboard."
        />
      </Head>

      <Navbar />

      {/* Live Market Indices Ticker Bar with balanced distribution */}
      <div className="w-full border-b border-white/[0.08] bg-[#0A0E1A]/80 py-2.5 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 text-xs overflow-x-auto">
          <div className="flex items-center gap-6 sm:gap-8 shrink-0">
            {MARKET_INDICES.map((idx) => (
              <div key={idx.symbol} className="flex items-center gap-2 whitespace-nowrap">
                <span className="font-semibold text-slate-400">{idx.symbol}</span>
                <span className="font-mono font-bold text-white">{idx.value}</span>
                <span
                  className={`font-semibold flex items-center ${
                    idx.isPositive ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {idx.changePercent > 0 ? "+" : ""}
                  {idx.changePercent}%
                </span>
              </div>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-2 text-[11px] text-cyan-400 whitespace-nowrap shrink-0">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-medium">AI Inference Engine Live</span>
          </div>
        </div>
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-28">
          {/* Ambient Glowing Blobs */}
          <div className="pointer-events-none absolute left-1/2 -top-40 -translate-x-1/2 h-[500px] w-[750px] rounded-full bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-cyan-500/20 blur-[130px]" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            {/* Top Tagline Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300 shadow-lg shadow-indigo-500/10 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>See the Trend. Understand the Market.</span>
            </div>

            {/* Exact Required Hero Titles */}
            <h1 className="mt-5 text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1]">
              Alpha<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">Track</span>
            </h1>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-200 tracking-tight">
              Machine Learning-Based Stock Trend Analysis
            </h2>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
              Analyze market trends, explore technical indicators, and understand AI-powered stock predictions — all in one intelligent dashboard.
            </p>

            {/* Required Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-600/25 transition-all hover:scale-105 hover:shadow-cyan-500/25"
              >
                <span>Explore Dashboard</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/markets"
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-md transition-all hover:bg-slate-800 hover:text-white hover:border-white/20"
              >
                <span>View Market Insights</span>
              </Link>
            </div>

            {/* Interactive Hero Live Preview Box */}
            <div className="mt-12 mx-auto max-w-5xl rounded-3xl border border-white/10 bg-[#0C111F]/80 p-5 sm:p-7 shadow-2xl backdrop-blur-2xl text-left">
              {/* Preview Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/20 text-cyan-400 font-bold border border-indigo-500/30">
                    {currentStock.symbol.slice(0, 3)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-white">
                        {currentStock.name}
                      </span>
                      <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                        {currentStock.aiPrediction.trend}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">
                      Live AI Forecast Engine Simulation
                    </div>
                  </div>
                </div>

                {/* Stock Selector Pill */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Featured Asset:</span>
                  <div className="flex rounded-xl bg-slate-900 p-1 border border-white/10">
                    <button
                      onClick={() => setActiveHeroStock("RELIANCE")}
                      className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                        activeHeroStock === "RELIANCE"
                          ? "bg-indigo-600 text-white"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      RELIANCE
                    </button>
                    <button
                      onClick={() => setActiveHeroStock("NVDA")}
                      className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                        activeHeroStock === "NVDA"
                          ? "bg-indigo-600 text-white"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      NVDA
                    </button>
                  </div>
                </div>
              </div>

              {/* Preview Stats Banner */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl bg-slate-900/40 p-3 border border-white/[0.04]">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Current Price</span>
                  <div className="text-lg font-bold text-white mt-0.5">
                    {currentStock.currency}{currentStock.price.toFixed(2)}
                  </div>
                </div>
                <div className="rounded-xl bg-slate-900/40 p-3 border border-white/[0.04]">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">AI Confidence</span>
                  <div className="text-lg font-bold text-cyan-400 mt-0.5">
                    {currentStock.aiPrediction.confidence}%
                  </div>
                </div>
                <div className="rounded-xl bg-slate-900/40 p-3 border border-white/[0.04]">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">7-Day Target</span>
                  <div className="text-lg font-bold text-emerald-400 mt-0.5">
                    {currentStock.aiPrediction.expectedMovement}
                  </div>
                </div>
                <div className="rounded-xl bg-slate-900/40 p-3 border border-white/[0.04]">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">RSI Status</span>
                  <div className="text-lg font-bold text-purple-400 mt-0.5">
                    {currentStock.indicators.rsi.value} ({currentStock.indicators.rsi.status})
                  </div>
                </div>
              </div>

              {/* Preview Animated Chart */}
              <div className="mt-4 h-60 w-full">
                {isMounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={currentStock.history["1M"]}
                      margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6366F1" stopOpacity={0.45} />
                          <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" stroke="#475569" fontSize={10} tickLine={false} />
                      <YAxis stroke="#475569" fontSize={10} tickLine={false} />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg bg-slate-900 p-2 text-xs border border-white/10 text-white font-mono">
                                Price: {currentStock.currency}{payload[0].value}
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#22D3EE"
                        strokeWidth={2.5}
                        fill="url(#heroGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full w-full rounded-2xl bg-slate-900/40 animate-pulse flex items-center justify-center text-xs text-slate-500">
                    Initializing Real-Time Chart Canvas...
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-white/[0.06]">
                <span className="flex items-center gap-1.5 text-indigo-300">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                  Active Model: {currentStock.aiPrediction.modelName}
                </span>
                <Link
                  href="/dashboard"
                  className="font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  Open Full Interactive Terminal →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards Grid Section */}
        <section className="relative py-16 border-t border-white/[0.06] bg-[#080C16]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Capabilities
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Engineered for Modern Alpha Seekers
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-400">
                Bridging traditional quantitative technical analysis with cutting-edge machine learning forecasting.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0E1322]/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/40 hover:bg-[#12182B] hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-950/40"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr ${feat.color} text-white shadow-lg`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[11px] font-semibold text-slate-300 border border-white/10">
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {feat.desc}
                    </p>

                    <div className="mt-5 flex items-center text-xs font-semibold text-indigo-400 group-hover:text-cyan-400">
                      <span>Explore feature</span>
                      <ChevronRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="relative py-16 border-t border-white/[0.06]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900/90 p-8 sm:p-12 text-center shadow-2xl backdrop-blur-xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Ready to explore AI-driven market intelligence?
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
                No sign-ups, no API keys, and no hassle. Jump straight into the live interactive AlphaTrack terminal.
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  href="/dashboard"
                  className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 hover:scale-105 transition-all"
                >
                  Launch Dashboard Now →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modern Fintech Footer */}
      <footer className="border-t border-white/[0.08] bg-[#05080E] pt-8 pb-20 lg:pb-8 text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-cyan-400" />
            <span className="font-bold text-slate-300">AlphaTrack</span>
            <span>— Machine Learning-Based Stock Trend Analysis</span>
          </div>
          <div>
            <span>© 2026 AlphaTrack. See the Trend. Understand the Market.</span>
          </div>
        </div>
      </footer>

      <MobileNav />
    </div>
  );
}
