import React from "react";

interface TimeRangeSelectorProps {
  selectedRange: string;
  onChangeRange: (range: string) => void;
  options?: string[];
}

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  selectedRange,
  onChangeRange,
  options = ["1D", "1W", "1M", "6M", "1Y", "5Y"],
}) => {
  return (
    <div className="inline-flex items-center gap-1 rounded-xl bg-slate-900/80 p-1 border border-white/[0.08] shadow-inner">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChangeRange(opt)}
          className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
            selectedRange === opt
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
              : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
};
