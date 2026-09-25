import React, { useState } from "react";
import Head from "next/head";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { MarketCard } from "@/components/MarketCard";
import { StockCard } from "@/components/StockCard";
import { PriceChart } from "@/components/PriceChart";
import { PredictionChart } from "@/components/PredictionChart";
import { TechnicalIndicatorsSection } from "@/components/IndicatorCard";
import { SentimentChart } from "@/components/SentimentChart";
import { RiskGauge } from "@/components/RiskGauge";
import { WatchlistTable } from "@/components/WatchlistTable";
import { AIInsightPanel } from "@/components/AIInsightCard";
import { SearchBar } from "@/components/SearchBar";
import { NotificationPanel } from "@/components/NotificationPanel";
import { MobileNav } from "@/components/MobileNav";
import { MARKET_INDICES, STOCKS_DATA } from "@/data/mockData";
import { Sparkles, BrainCircuit, RefreshCw, BarChart2, ShieldAlert } from "lucide-react";

export default function DashboardPage() {
  const [selectedSymbol, setSelectedSymbol] = useState<string>("RELIANCE");
  const [watchlistSymbols, setWatchlistSymbols] = useState<string[]>([
    "RELIANCE",
    "TCS",
    "INFY",
    "HDFCBANK",
    "AAPL",
    "NVDA",
  ]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);

  const currentStock = STOCKS_DATA[selectedSymbol] || STOCKS_DATA["RELIANCE"];
  const isWatchlisted = watchlistSymbols.includes(selectedSymbol);

  const handleToggleWatchlist = (symbol: string) => {
    if (watchlistSymbols.includes(symbol)) {
      setWatchlistSymbols(watchlistSymbols.filter((s) => s !== symbol));
    } else {
      setWatchlistSymbols([...watchlistSymbols, symbol]);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#06090F] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      <Head>
        <title>AlphaTrack | Stock Trend Analysis Dashboard</title>
        <meta
          name="description"
          content="Interactive machine learning-based stock trend analysis dashboard with technical indicators and risk metrics."
        />
      </Head>

      <Navbar onSearchClick={() => window.scrollTo({ top: 180, behavior: "smooth" })} />

      <div className="flex flex-1">
        {/* Left Sidebar */}
        <Sidebar currentStockSymbol={selectedSymbol} />

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-24 lg:pb-8 space-y-5 sm:space-y-6 max-w-7xl mx-auto w-full">
          {/* Dashboard Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Market Overview
                </h1>
                <span className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-xs font-semibold text-cyan-400 border border-cyan-500/20">
                  Realtime Feed
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                AI-powered analysis of current market trends & predictive algorithmic indicators
              </p>
            </div>

            {/* Refresh and Action Bar */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/60 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
              >
                <RefreshCw className={`h-3.5 w-3.5 text-cyan-400 ${isRefreshing ? "animate-spin" : ""}`} />
                <span>Sync Data</span>
              </button>
            </div>
          </div>

          {/* 1. Statistics Cards (NIFTY 50, SENSEX, NASDAQ, S&P 500) */}
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {MARKET_INDICES.map((market) => (
                <MarketCard key={market.symbol} market={market} />
              ))}
            </div>
          </section>

          {/* 2. Stock Search Box & Quick Chips */}
          <section className="pt-2">
            <SearchBar
              onSelectStock={(sym) => setSelectedSymbol(sym)}
              selectedSymbol={selectedSymbol}
            />
          </section>

          {/* 3. Selected Stock Overview */}
          <section>
            <StockCard
              stock={currentStock}
              isWatchlisted={isWatchlisted}
              onToggleWatchlist={handleToggleWatchlist}
            />
          </section>

          {/* 4. Large Interactive Price Chart */}
          <section>
            <PriceChart stock={currentStock} />
          </section>

          {/* 5. AI Trend Prediction Section (Highlighted Distinct Card) */}
          <section>
            <PredictionChart stock={currentStock} />
          </section>

          {/* 6. Technical Indicators (RSI, MACD, MA, Bollinger Bands) */}
          <section>
            <TechnicalIndicatorsSection stock={currentStock} />
          </section>

          {/* 7. Market Sentiment & Risk Analysis (2-Column Grid) */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SentimentChart stock={currentStock} />
            <RiskGauge stock={currentStock} />
          </section>

          {/* 8. AI Market Insights */}
          <section>
            <AIInsightPanel stock={currentStock} />
          </section>

          {/* 9. Interactive Watchlist Table */}
          <section>
            <WatchlistTable
              selectedSymbol={selectedSymbol}
              onSelectStock={(sym) => {
                setSelectedSymbol(sym);
                window.scrollTo({ top: 380, behavior: "smooth" });
              }}
            />
          </section>
        </main>
      </div>

      <NotificationPanel
        isOpen={showNotificationPanel}
        onClose={() => setShowNotificationPanel(false)}
      />

      <MobileNav />
    </div>
  );
}
