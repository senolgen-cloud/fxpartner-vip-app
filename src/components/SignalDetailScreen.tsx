import React, { useState } from 'react';
import { ForexSignal } from '../data/initialSignals';
import { ArrowLeft, Target, ShieldAlert, ArrowUpRight, ArrowDownRight, RefreshCw, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

interface SignalDetailScreenProps {
  signal: ForexSignal;
  onBack: () => void;
}

export const SignalDetailScreen: React.FC<SignalDetailScreenProps> = ({ signal, onBack }) => {
  const [currentSimPrice, setCurrentSimPrice] = useState(signal.currentPrice);
  const [pipsSim, setPipsSim] = useState(signal.pips);
  const isBuy = signal.direction === 'BUY';

  const triggerLiveTick = () => {
    const variation = (Math.random() - 0.48) * (signal.symbol.includes('JPY') ? 0.05 : 0.0005);
    const newPrice = currentSimPrice + variation;
    setCurrentSimPrice(newPrice);
    
    // Calculate new pips
    const diff = isBuy ? (newPrice - signal.entry) : (signal.entry - newPrice);
    const multiplier = signal.symbol.includes('JPY') ? 100 : 10000;
    setPipsSim(Math.round(diff * multiplier));
  };

  return (
    <div className="pb-24 pt-4 px-4 space-y-6 text-slate-100">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        <span className="text-xs font-mono text-slate-400">
          ID: {signal.id.toUpperCase()}
        </span>
      </div>

      {/* Main Header Card */}
      <div className={`bg-glass-premium rounded-2xl p-6 relative overflow-hidden border ${
        signal.status === 'ACTIVE'
          ? isBuy ? 'border-emerald-500/40 glow-green' : 'border-rose-500/40 glow-red'
          : 'border-slate-800'
      }`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-black text-white tracking-tight">{signal.symbol}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono font-semibold">
                {signal.timeframe}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Institutional order block execution via <strong className="text-white">{signal.broker}</strong>
            </p>
          </div>

          <span className={`px-3 py-1.5 rounded-xl text-sm font-black tracking-wider flex items-center gap-1 shadow-md ${
            isBuy
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
          }`}>
            {isBuy ? <ArrowUpRight className="w-4 h-4 stroke-[3]" /> : <ArrowDownRight className="w-4 h-4 stroke-[3]" />}
            {signal.direction}
          </span>
        </div>

        {/* Live Ticker Area */}
        <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 flex justify-between items-center mb-6">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono block">Live Execution Price</span>
            <div className="text-xl font-mono font-black text-white flex items-center gap-2">
              {currentSimPrice.toFixed(signal.symbol.includes('JPY') ? 3 : 4)}
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-500 uppercase font-mono block">Net Pips</span>
            <div className={`text-xl font-mono font-black ${
              pipsSim > 0 ? 'text-emerald-400' : pipsSim < 0 ? 'text-rose-400' : 'text-slate-300'
            }`}>
              {pipsSim > 0 ? '+' : ''}{pipsSim} pips
            </div>
          </div>

          <button
            onClick={triggerLiveTick}
            className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition shadow glow-blue flex items-center gap-1 text-xs font-semibold"
            title="Simulate Real-time Market Price Tick"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Tick
          </button>
        </div>

        {/* Entry, TP, SL Visualization */}
        <div className="space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <span className="flex items-center gap-2 font-semibold">
              <Target className="w-4 h-4" /> TAKE PROFIT ZONE
            </span>
            <span className="font-bold text-sm">{signal.tp.toFixed(signal.symbol.includes('JPY') ? 3 : 4)}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300">
            <span className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-blue-400" /> ENTRY TARGET
            </span>
            <span className="font-bold text-sm">{signal.entry.toFixed(signal.symbol.includes('JPY') ? 3 : 4)}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
            <span className="flex items-center gap-2 font-semibold">
              <ShieldAlert className="w-4 h-4" /> STOP LOSS BAND
            </span>
            <span className="font-bold text-sm">{signal.sl.toFixed(signal.symbol.includes('JPY') ? 3 : 4)}</span>
          </div>
        </div>
      </div>

      {/* R/R & Confidence stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow">
          <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Risk / Reward Ratio</span>
          <span className="text-lg font-black text-white font-mono">{signal.rrRatio}</span>
          <p className="text-[10px] text-slate-500 mt-1">Institutional 1% capital allocation</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow">
          <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">AI Setup Confidence</span>
          <span className="text-lg font-black text-blue-400 font-mono">{signal.confidence}%</span>
          <p className="text-[10px] text-slate-500 mt-1">Multi-timeframe liquidity sweep</p>
        </div>
      </div>

      {/* Trader Notes */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow space-y-3">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-400" /> Institutional Trader Notes
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 font-mono">
          "{signal.traderNotes}"
        </p>
      </div>

      {/* Economic News Impact */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow space-y-3">
        <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" /> Economic News Impact
        </h3>
        <p className="text-xs text-slate-300 bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl font-mono">
          {signal.newsImpact}
        </p>
      </div>

      {/* Simulated Order Execution Feed */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow space-y-3">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-2">
          Order Block History
        </h3>
        <div className="divide-y divide-slate-800/80 text-xs font-mono">
          {signal.history.map((h, idx) => (
            <div key={idx} className="py-2.5 flex justify-between items-center text-slate-300">
              <span className="text-slate-500">{h.time}</span>
              <span className="font-bold">{h.price.toFixed(signal.symbol.includes('JPY') ? 3 : 4)}</span>
              <span className="text-emerald-400 text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                VERIFIED
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
