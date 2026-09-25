import React, { useState, useEffect, useRef } from "react";
import { Search, X, TrendingUp, TrendingDown, Sparkles, Command } from "lucide-react";
import { STOCKS_DATA, Stock } from "@/data/mockData";

interface SearchBarProps {
  onSelectStock: (symbol: string) => void;
  selectedSymbol: string;
  isModal?: boolean;
  onCloseModal?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSelectStock,
  selectedSymbol,
  isModal = false,
  onCloseModal,
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const stockList = Object.values(STOCKS_DATA);

  const filteredStocks = stockList.filter(
    (s) =>
      s.symbol.toLowerCase().includes(query.toLowerCase()) ||
      s.name.toLowerCase().includes(query.toLowerCase())
  );

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (symbol: string) => {
    onSelectStock(symbol);
    setQuery("");
    setIsOpen(false);
    if (onCloseModal) onCloseModal();
  };

  const quickPills = ["RELIANCE", "TCS", "INFY", "HDFCBANK", "AAPL", "MSFT", "NVDA"];

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <div className="pointer-events-none absolute left-3.5 text-slate-400">
          <Search className="h-4 w-4 text-indigo-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Search stocks... (e.g. RELIANCE, TCS, INFY, AAPL, NVDA)"
          className="w-full rounded-2xl border border-white/[0.12] bg-[#0E1322] py-3.5 pl-10 pr-24 text-sm text-white placeholder-slate-400 shadow-xl transition-all focus:border-indigo-500 focus:bg-[#12182B] focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
        {query ? (
          <button
            onClick={() => setQuery("")}
            className="absolute right-10 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
        <div className="absolute right-3 flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-1 rounded-md border border-white/10">
          <Command className="h-3 w-3" />
          <span>K</span>
        </div>
      </div>

      {/* Quick Stock Filter Chips */}
      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-semibold text-slate-400 mr-1">Trending:</span>
        {quickPills.map((sym) => {
          const isCurrent = sym === selectedSymbol;
          return (
            <button
              key={sym}
              onClick={() => handleSelect(sym)}
              className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                isCurrent
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "border border-white/[0.06] bg-slate-900/60 text-slate-300 hover:border-indigo-500/40 hover:text-white"
              }`}
            >
              {sym}
            </button>
          );
        })}
      </div>

      {/* Autocomplete Dropdown List */}
      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-white/10 bg-[#0E1322] p-2 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95">
          <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Matching Equities ({filteredStocks.length})
          </div>
          {filteredStocks.length > 0 ? (
            <div className="space-y-1">
              {filteredStocks.map((s) => {
                const isPos = s.change >= 0;
                return (
                  <button
                    key={s.symbol}
                    onClick={() => handleSelect(s.symbol)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs transition-colors hover:bg-slate-800/80"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-900/40 font-bold text-cyan-300 border border-indigo-500/30">
                        {s.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-bold text-white">{s.symbol}</div>
                        <div className="text-[11px] text-slate-400">{s.name}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-right">
                      <div>
                        <div className="font-bold text-white">
                          {s.currency}{s.price.toFixed(2)}
                        </div>
                        <div
                          className={`flex items-center justify-end gap-0.5 text-[11px] font-bold ${
                            isPos ? "text-emerald-400" : "text-rose-400"
                          }`}
                        >
                          {isPos ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          <span>
                            {isPos ? "+" : ""}
                            {s.changePercent}%
                          </span>
                        </div>
                      </div>

                      <div className="hidden sm:flex flex-col items-end">
                        <span className="flex items-center gap-1 rounded bg-indigo-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-cyan-300 border border-indigo-500/20">
                          <Sparkles className="h-2.5 w-2.5" />
                          {s.aiPrediction.confidence}%
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-400">
              No matching assets found for "{query}".
            </div>
          )}
        </div>
      )}
    </div>
  );
};
