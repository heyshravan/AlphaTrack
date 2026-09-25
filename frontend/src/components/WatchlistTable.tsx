import React, { useState } from "react";
import {
  Search,
  ArrowUpDown,
  Plus,
  Trash2,
  TrendingUp,
  TrendingDown,
  Sparkles,
  ExternalLink,
  SlidersHorizontal,
} from "lucide-react";
import { INITIAL_WATCHLIST, STOCKS_DATA } from "@/data/mockData";

interface WatchlistTableProps {
  onSelectStock: (symbol: string) => void;
  selectedSymbol: string;
}

export const WatchlistTable: React.FC<WatchlistTableProps> = ({
  onSelectStock,
  selectedSymbol,
}) => {
  const [items, setItems] = useState(INITIAL_WATCHLIST);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTrend, setFilterTrend] = useState<string>("ALL");
  const [sortField, setSortField] = useState<"confidence" | "price" | "symbol">("confidence");
  const [sortAsc, setSortAsc] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSymbolInput, setNewSymbolInput] = useState("");

  // Filter items
  const filtered = items.filter((item) => {
    const matchesSearch =
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTrend =
      filterTrend === "ALL" ||
      item.aiTrend.toUpperCase() === filterTrend.toUpperCase();
    return matchesSearch && matchesTrend;
  });

  // Sort items
  const sorted = [...filtered].sort((a, b) => {
    let result = 0;
    if (sortField === "confidence") {
      result = a.confidence - b.confidence;
    } else if (sortField === "price") {
      const numA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
      const numB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
      result = numA - numB;
    } else {
      result = a.symbol.localeCompare(b.symbol);
    }
    return sortAsc ? result : -result;
  });

  const handleRemove = (symbol: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setItems(items.filter((i) => i.symbol !== symbol));
  };

  const handleAddStock = () => {
    const cleanSym = newSymbolInput.trim().toUpperCase();
    if (!cleanSym) return;

    if (STOCKS_DATA[cleanSym]) {
      const target = STOCKS_DATA[cleanSym];
      const newItem = {
        symbol: target.symbol,
        name: target.name,
        price: `${target.currency}${target.price.toFixed(2)}`,
        change: `${target.change >= 0 ? "+" : ""}${target.changePercent}%`,
        isPositive: target.change >= 0,
        aiTrend: target.aiPrediction.trend === "BULLISH" ? "Bullish" : target.aiPrediction.trend === "BEARISH" ? "Bearish" : "Neutral",
        confidence: target.aiPrediction.confidence,
        volume: target.volume,
      };
      if (!items.some((i) => i.symbol === cleanSym)) {
        setItems([...items, newItem]);
      }
    } else {
      // Mock generated stock if not already in dictionary
      const newItem = {
        symbol: cleanSym,
        name: `${cleanSym} Corp`,
        price: "₹1,450.00",
        change: "+1.9%",
        isPositive: true,
        aiTrend: "Bullish",
        confidence: 81.0,
        volume: "2.4M",
      };
      setItems([...items, newItem]);
    }

    setNewSymbolInput("");
    setShowAddModal(false);
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0C111E]/90 p-3.5 sm:p-5 backdrop-blur-xl shadow-2xl">
      {/* Header and Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-3.5">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            Watchlist & AI Signals
            <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-xs font-semibold text-cyan-300">
              {items.length} Tracked
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Click any row to load detailed charts & technical overlays
          </p>
        </div>

        {/* Action button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-500 whitespace-nowrap transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Add Stock</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2.5">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search watchlist..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/[0.08] bg-slate-900/60 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Filter Pills with safe horizontal scroll */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar rounded-xl bg-slate-900/60 p-1 border border-white/[0.06] shrink-0">
          {["ALL", "BULLISH", "NEUTRAL", "BEARISH"].map((trend) => (
            <button
              key={trend}
              onClick={() => setFilterTrend(trend)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap transition-all ${
                filterTrend === trend
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {trend}
            </button>
          ))}
        </div>

        {/* Sort Trigger */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => {
              if (sortField === "confidence") setSortAsc(!sortAsc);
              else {
                setSortField("confidence");
                setSortAsc(false);
              }
            }}
            className={`flex items-center gap-1 rounded-lg border border-white/[0.06] bg-slate-900/60 px-2.5 py-1.5 text-xs font-medium whitespace-nowrap ${
              sortField === "confidence" ? "text-cyan-300 border-indigo-500/40" : "text-slate-400"
            }`}
          >
            <ArrowUpDown className="h-3 w-3" />
            Sort: AI Confidence
          </button>
        </div>
      </div>

      {/* Table with responsive horizontal scroll */}
      <div className="mt-4 overflow-x-auto no-scrollbar">
        <table className="w-full min-w-[560px] text-left text-xs">
          <thead>
            <tr className="border-b border-white/[0.06] text-slate-400 font-semibold uppercase tracking-wider">
              <th className="pb-3 pl-2">Stock</th>
              <th className="pb-3 text-right">Price</th>
              <th className="pb-3 text-right">Change</th>
              <th className="pb-3 text-center">AI Trend</th>
              <th className="pb-3 text-right">Confidence</th>
              <th className="pb-3 text-right pr-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {sorted.map((item) => {
              const isSelected = item.symbol === selectedSymbol;
              const isBullish = item.aiTrend.toLowerCase() === "bullish";
              const isNeutral = item.aiTrend.toLowerCase() === "neutral";

              return (
                <tr
                  key={item.symbol}
                  onClick={() => onSelectStock(item.symbol)}
                  className={`group cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-indigo-600/15 border-l-2 border-indigo-500"
                      : "hover:bg-slate-900/50"
                  }`}
                >
                  <td className="py-3.5 pl-2">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 font-bold text-white border border-white/10 group-hover:border-indigo-500/40">
                        {item.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {item.symbol}
                        </div>
                        <div className="text-[11px] text-slate-400">{item.name}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 text-right font-bold text-white">
                    {item.price}
                  </td>

                  <td className="py-3.5 text-right">
                    <span
                      className={`inline-flex items-center gap-0.5 font-bold ${
                        item.isPositive ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {item.isPositive ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {item.change}
                    </span>
                  </td>

                  <td className="py-3.5 text-center">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                        isBullish
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : isNeutral
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                          : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                      }`}
                    >
                      <Sparkles className="h-2.5 w-2.5" />
                      {item.aiTrend}
                    </span>
                  </td>

                  <td className="py-3.5 text-right">
                    <div className="inline-flex flex-col items-end">
                      <span className="font-bold text-cyan-300">{item.confidence}%</span>
                      <div className="h-1 w-14 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                          style={{ width: `${item.confidence}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 text-right pr-2">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={(e) => handleRemove(item.symbol, e)}
                        title="Remove from Watchlist"
                        className="rounded p-1 text-slate-400 hover:bg-rose-500/20 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Stock Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0E1322] p-5 shadow-2xl">
            <h4 className="text-base font-bold text-white">Add Stock to Watchlist</h4>
            <p className="text-xs text-slate-400 mt-1">
              Enter any symbol like RELIANCE, TCS, INFY, HDFCBANK, AAPL, NVDA
            </p>
            <div className="mt-4">
              <input
                type="text"
                value={newSymbolInput}
                onChange={(e) => setNewSymbolInput(e.target.value)}
                placeholder="e.g. INFY, AAPL"
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white uppercase focus:border-indigo-500 focus:outline-none"
                autoFocus
              />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStock}
                className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500"
              >
                Add Symbol
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
