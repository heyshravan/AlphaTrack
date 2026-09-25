import React, { useState } from "react";
import Head from "next/head";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { SlidersHorizontal, Cpu, Bell, Shield, Moon, Check } from "lucide-react";

export default function SettingsPage() {
  const [modelConfidenceThreshold, setModelConfidenceThreshold] = useState(80);
  const [currency, setCurrency] = useState("INR");
  const [enableSound, setEnableSound] = useState(false);
  const [enablePush, setEnablePush] = useState(true);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#06090F] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      <Head>
        <title>Settings | AlphaTrack</title>
      </Head>

      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 overflow-y-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-24 lg:pb-8 space-y-5 sm:space-y-6 max-w-4xl mx-auto w-full">
          <div className="border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-6 w-6 text-indigo-400" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Platform Preferences & AI Engine Config
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Customize algorithmic sensitivity, display parameters, and simulated feeds
            </p>
          </div>

          {/* AI Model Preferences */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0C111E]/90 p-4 sm:p-5 backdrop-blur-xl shadow-2xl space-y-5">
            <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3">
              <Cpu className="h-5 w-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">AI Inference Parameters</h3>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Minimum AI Confidence Alert Threshold</span>
                <span className="text-cyan-400">{modelConfidenceThreshold}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                value={modelConfidenceThreshold}
                onChange={(e) => setModelConfidenceThreshold(Number(e.target.value))}
                className="mt-2 w-full accent-indigo-500 cursor-pointer"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Signals below this confidence score will be suppressed from priority notifications.
              </span>
            </div>

            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-300 block mb-2">
                Primary Currency Preference
              </span>
              <div className="flex gap-3">
                {["INR (₹)", "USD ($)"].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr.slice(0, 3))}
                    className={`rounded-xl px-4 py-2 text-xs font-bold border transition-all ${
                      currency === curr.slice(0, 3)
                        ? "border-indigo-500 bg-indigo-600/30 text-white"
                        : "border-white/10 bg-slate-900/60 text-slate-400 hover:text-white"
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications config */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0C111E]/90 p-4 sm:p-5 backdrop-blur-xl shadow-2xl space-y-4">
            <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3">
              <Bell className="h-5 w-5 text-indigo-400" />
              <h3 className="text-base font-bold text-white">Notification Feed</h3>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block">Real-time Breakout Signals</span>
                <span className="text-[11px] text-slate-400">Trigger alerts when RSI exceeds 70 or dips under 30</span>
              </div>
              <input
                type="checkbox"
                checked={enablePush}
                onChange={(e) => setEnablePush(e.target.checked)}
                className="h-4 w-4 rounded accent-indigo-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-xs font-semibold text-white block">Simulated Audio Alerts</span>
                <span className="text-[11px] text-slate-400">Audio chimes on major trend reversals</span>
              </div>
              <input
                type="checkbox"
                checked={enableSound}
                onChange={(e) => setEnableSound(e.target.checked)}
                className="h-4 w-4 rounded accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Save Action */}
          <div className="flex items-center justify-between pt-2">
            {savedToast ? (
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <Check className="h-4 w-4" /> Preferences applied successfully!
              </span>
            ) : <span />}

            <button
              onClick={handleSave}
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all"
            >
              Save Configuration
            </button>
          </div>
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
