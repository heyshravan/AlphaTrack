import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  TrendingUp,
  BrainCircuit,
  Search,
  Bell,
  Menu,
  X,
  ChevronDown,
  Activity,
  SlidersHorizontal,
  Bookmark,
  Sparkles,
  BarChart3,
  Globe2,
} from "lucide-react";
import { MOCK_NOTIFICATIONS } from "@/data/mockData";

interface NavbarProps {
  onSearchClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchClick }) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(MOCK_NOTIFICATIONS.length);

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Markets", href: "/markets", icon: Globe2 },
    { name: "Watchlist", href: "/watchlist", icon: Bookmark },
    { name: "Predictions", href: "/predictions", icon: BrainCircuit },
    { name: "Analytics", href: "/analytics", icon: Activity },
    { name: "Settings", href: "/settings", icon: SlidersHorizontal },
  ];

  const isActive = (path: string) => router.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#070A12]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8 gap-2 sm:gap-4">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-4 lg:gap-6 shrink-0">
          <Link href="/" className="group flex items-center gap-2.5 shrink-0">
            {/* Logo Icon with safe relative glow */}
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-lg shadow-indigo-500/25 transition-transform duration-300 group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#0A0E1A]">
                <TrendingUp className="h-4.5 w-4.5 text-cyan-400 transition-transform duration-300 group-hover:rotate-6" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-500"></span>
              </span>
            </div>

            {/* Brand text & version badge */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-lg font-extrabold tracking-tight text-white whitespace-nowrap">
                  Alpha<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Track</span>
                </span>
                <span className="whitespace-nowrap rounded-md bg-indigo-500/15 px-1.5 py-0.5 text-[10px] font-bold text-cyan-300 border border-indigo-500/30">
                  AI v4
                </span>
              </div>
              <span className="hidden xl:block text-[10px] font-medium text-slate-400 whitespace-nowrap mt-1">
                See the Trend. Understand the Market.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 shrink-0">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                    active
                      ? "bg-indigo-600/20 text-cyan-300 border border-indigo-500/40 shadow-sm"
                      : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 shrink-0 ${active ? "text-cyan-400" : "text-slate-400"}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Section: Market Status, Search, Alerts, Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Market Status Live Pill */}
          <div className="hidden md:flex items-center gap-1.5 whitespace-nowrap rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-400 shrink-0">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="whitespace-nowrap tracking-wide">MARKET LIVE</span>
          </div>

          {/* Search Trigger */}
          <button
            onClick={onSearchClick}
            type="button"
            className="flex items-center gap-2 whitespace-nowrap rounded-xl border border-white/10 bg-slate-900/80 px-2.5 sm:px-3 py-1.5 text-xs text-slate-300 hover:border-indigo-500/40 hover:text-white transition-all shrink-0"
          >
            <Search className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">Search stocks...</span>
            <kbd className="hidden md:inline-block rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-mono text-slate-300">
              ⌘K
            </kbd>
          </button>

          {/* Notifications Dropdown Toggle */}
          <div className="relative shrink-0">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                if (!notificationsOpen) setUnreadCount(0);
              }}
              className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-white/10 bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Menu */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-white/10 bg-[#0E1320] p-4 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 z-50">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm font-semibold text-white">AI Signals & Alerts</span>
                  </div>
                  <span className="text-xs text-slate-400">Realtime Feed</span>
                </div>
                <div className="mt-3 space-y-2 max-h-72 overflow-y-auto pr-1">
                  {MOCK_NOTIFICATIONS.map((n) => (
                    <div
                      key={n.id}
                      className="group rounded-xl border border-white/[0.06] bg-slate-900/40 p-3 hover:bg-indigo-950/20 hover:border-indigo-500/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300">
                          {n.title}
                        </p>
                        <span className="text-[10px] text-slate-500">{n.time}</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-400">{n.text}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-2 border-t border-white/10 text-center">
                  <Link
                    href="/dashboard"
                    onClick={() => setNotificationsOpen(false)}
                    className="text-xs font-medium text-cyan-400 hover:text-cyan-300"
                  >
                    View All Live Signals →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <div className="hidden sm:flex items-center gap-2 whitespace-nowrap rounded-xl border border-white/10 bg-slate-900/80 p-1 pr-2.5 shrink-0">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 text-xs font-bold text-white shrink-0">
              AT
            </div>
            <div className="text-left flex flex-col justify-center">
              <span className="text-xs font-bold text-slate-200 whitespace-nowrap leading-none">Alpha Trader</span>
              <span className="text-[10px] font-semibold text-cyan-400 whitespace-nowrap leading-none mt-1">Tier 1 AI Pro</span>
            </div>
            <ChevronDown className="h-3 w-3 text-slate-400 ml-0.5" />
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-white/10 bg-slate-900/80 text-slate-300 hover:text-white shrink-0"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0B0F19] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                  active
                    ? "bg-indigo-600/20 text-cyan-300 border border-indigo-500/30"
                    : "text-slate-300 hover:bg-white/[0.05]"
                }`}
              >
                <Icon className="h-4 w-4 text-cyan-400" />
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
