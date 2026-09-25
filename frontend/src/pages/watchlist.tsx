import React, { useState } from "react";
import Head from "next/head";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { WatchlistTable } from "@/components/WatchlistTable";
import { Bookmark, Sparkles, BellRing, Filter } from "lucide-react";
import { useRouter } from "next/router";

export default function WatchlistPage() {
  const router = useRouter();
  const [selectedStock, setSelectedStock] = useState("RELIANCE");

  return (
    <div className="min-h-screen bg-[#06090F] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      <Head>
        <title>Watchlist | AlphaTrack</title>
      </Head>

      <Navbar />

      <div className="flex flex-1">
        <Sidebar currentStockSymbol={selectedStock} />

        <main className="flex-1 overflow-y-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-24 lg:pb-8 space-y-5 sm:space-y-6 max-w-7xl mx-auto w-full">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-3.5">
            <div>
              <div className="flex items-center gap-2">
                <Bookmark className="h-6 w-6 text-indigo-400" />
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Portfolio & Asset Watchlist
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Monitor AI conviction signals, probability scores, and price triggers
              </p>
            </div>
          </div>

          <WatchlistTable
            selectedSymbol={selectedStock}
            onSelectStock={(sym) => {
              setSelectedStock(sym);
              router.push("/dashboard");
            }}
          />
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
