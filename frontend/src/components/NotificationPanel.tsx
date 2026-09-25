import React from "react";
import { Sparkles, AlertCircle, Bell, CheckCheck, X } from "lucide-react";
import { MOCK_NOTIFICATIONS } from "@/data/mockData";

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed right-4 top-20 z-50 w-96 rounded-2xl border border-white/10 bg-[#0E1322] p-4 shadow-2xl backdrop-blur-2xl">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-cyan-400" />
          <h4 className="text-sm font-bold text-white">Market & AI Notifications</h4>
        </div>
        <button
          onClick={onClose}
          className="rounded p-1 text-slate-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 space-y-2.5 max-h-80 overflow-y-auto pr-1">
        {MOCK_NOTIFICATIONS.map((n) => (
          <div
            key={n.id}
            className="rounded-xl border border-white/[0.06] bg-slate-900/60 p-3 hover:border-indigo-500/30 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-cyan-300">{n.title}</span>
              <span className="text-[10px] text-slate-500">{n.time}</span>
            </div>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">{n.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-xs">
        <span className="text-slate-400">All alerts active</span>
        <button
          onClick={onClose}
          className="text-cyan-400 font-semibold hover:underline"
        >
          Dismiss All
        </button>
      </div>
    </div>
  );
};
