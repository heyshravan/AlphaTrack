import React, { useState, useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { PieChart as PieIcon, Layers, ThumbsUp, HelpCircle, ThumbsDown } from "lucide-react";
import { Stock } from "@/data/mockData";

interface SentimentChartProps {
  stock: Stock;
}

export const SentimentChart: React.FC<SentimentChartProps> = ({ stock }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { bullish, neutral, bearish, sources } = stock.sentiment;

  const data = [
    { name: "Bullish", value: bullish, color: "#10B981" },
    { name: "Neutral", value: neutral, color: "#06B6D4" },
    { name: "Bearish", value: bearish, color: "#F43F5E" },
  ];

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      return (
        <div className="rounded-lg border border-white/10 bg-[#0C101D] px-3 py-1.5 text-xs shadow-xl backdrop-blur-md">
          <span className="font-semibold text-white">{item.name}: </span>
          <span style={{ color: item.payload.color }} className="font-bold">
            {item.value}%
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0C111E]/90 p-5 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
        <div className="flex items-center gap-2">
          <PieIcon className="h-5 w-5 text-cyan-400" />
          <h3 className="text-base font-bold text-white tracking-tight">
            Market Sentiment
          </h3>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
          Net Bullish
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Donut Chart with Centered Metric */}
        <div className="md:col-span-5 relative flex items-center justify-center">
          <div className="h-48 w-48">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full rounded-full border-4 border-slate-800 animate-pulse flex items-center justify-center" />
            )}
          </div>

          {/* Centered Donut Label */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-black text-white">{bullish}%</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              Bullish
            </span>
          </div>
        </div>

        {/* Breakdown Badges & Sources */}
        <div className="md:col-span-7 space-y-4">
          {/* Sentiment Summary Badges */}
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-2.5 text-center">
              <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-emerald-400">
                <ThumbsUp className="h-3 w-3" /> Bullish
              </div>
              <div className="text-lg font-bold text-white mt-0.5">{bullish}%</div>
            </div>

            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-2.5 text-center">
              <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-cyan-400">
                <HelpCircle className="h-3 w-3" /> Neutral
              </div>
              <div className="text-lg font-bold text-white mt-0.5">{neutral}%</div>
            </div>

            <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-2.5 text-center">
              <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-rose-400">
                <ThumbsDown className="h-3 w-3" /> Bearish
              </div>
              <div className="text-lg font-bold text-white mt-0.5">{bearish}%</div>
            </div>
          </div>

          {/* Sentiment Sources */}
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Sentiment Sources
            </span>
            <div className="mt-2 space-y-2">
              {sources.map((src) => (
                <div key={src.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">{src.name}</span>
                    <span className="font-semibold text-cyan-400">{src.sentiment}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                      style={{ width: `${src.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
