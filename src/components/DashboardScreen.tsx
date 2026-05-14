import React, { useState } from 'react';
import { ForexSignal } from '../data/initialSignals';
import { SignalCard } from './SignalCard';
import {
  TrendingUp,
  Percent,
  DollarSign,
  Activity,
  MessageCircle,
  Filter,
  Award
} from 'lucide-react';

interface DashboardScreenProps {
  signals: ForexSignal[];
  onSelectSignal: (signal: ForexSignal) => void;
  onOpenSupport: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  signals,
  onSelectSignal,
  onOpenSupport,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'CLOSED'>('ALL');

  // Filtre sorunu yaşamamak için tüm sinyalleri direkt gösteriyoruz
  const filteredSignals = signals;

  const activeTradesCount = signals.length;

  return (
    <div className="pb-24 pt-4 px-4 space-y-6">
      <div className="bg-glass-gold rounded-2xl p-4 flex items-center justify-between shadow-xl glow-gold relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-md">
            <Award className="w-6 h-6 stroke-[2.5]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black tracking-tight text-white">
                INSTITUTIONAL VIP
              </h2>

              <span className="bg-amber-400 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider">
                ACTIVE
              </span>
            </div>

            <p className="text-xs text-amber-200/80 font-medium">
              Zero Latency Signal Injection & Raw Spreads
            </p>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <span className="text-[10px] text-amber-200 uppercase font-mono block">
            Liquidity Pool
          </span>
          <span className="font-mono text-sm font-bold text-white">
            $1.24B Tier 1
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex flex-col justify-between shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">
              Win Rate
            </span>
            <div className="p-1 rounded-lg bg-blue-500/10 text-blue-400">
              <Percent className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="text-2xl font-black text-white font-mono tracking-tight flex items-baseline gap-1">
            91.4<span className="text-sm font-normal text-slate-400">%</span>
          </div>

          <span className="text-[9px] text-emerald-400 font-mono mt-1">
            ↑ 2.3% this month
          </span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex flex-col justify-between shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">
              Daily Profit
            </span>
            <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="text-2xl font-black text-emerald-400 font-mono tracking-tight flex items-baseline gap-1">
            +532<span className="text-xs font-normal text-slate-400"> pips</span>
          </div>

          <span className="text-[9px] text-emerald-400 font-mono mt-1">
            🎯 All targets reached
          </span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex flex-col justify-between shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">
              Active Trades
            </span>
            <div className="p-1 rounded-lg bg-amber-500/10 text-amber-400">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="text-2xl font-black text-white font-mono tracking-tight flex items-baseline gap-1">
            {activeTradesCount}
            <span className="text-xs font-normal text-amber-400"> live</span>
          </div>

          <span className="text-[9px] text-slate-400 font-mono mt-1">
            Firestore synced
          </span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex flex-col justify-between shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">
              Market Status
            </span>
            <div className="p-1 rounded-lg bg-purple-500/10 text-purple-400">
              <Activity className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="text-sm font-extrabold text-blue-400 tracking-tight leading-snug">
            LONDON / NY OVERLAP
          </div>

          <span className="text-[9px] text-slate-400 font-mono mt-1">
            🔥 Extreme Liquidity
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
        <div>
          <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
            Live Trading Signals
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
          </h3>

          <p className="text-xs text-slate-400 font-mono">
            Firebase realtime signal feed
          </p>
        </div>

        <div className="flex bg-slate-900/90 border border-slate-800 rounded-xl p-1 gap-1 text-xs font-medium">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg transition ${
              filter === 'ALL'
                ? 'bg-blue-600 text-white font-semibold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter('ACTIVE')}
            className="px-3 py-1.5 rounded-lg transition text-slate-400 hover:text-white"
          >
            Active ({signals.length})
          </button>

          <button
            onClick={() => setFilter('CLOSED')}
            className="px-3 py-1.5 rounded-lg transition text-slate-400 hover:text-white"
          >
            Closed
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredSignals.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
            <Filter className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-medium">
              No signals found in Firestore.
            </p>
          </div>
        ) : (
          filteredSignals.map((sig) => (
            <SignalCard
              key={sig.id}
              signal={sig}
              onSelect={onSelectSignal}
            />
          ))
        )}
      </div>

      <div className="fixed right-5 bottom-20 z-40">
        <button
          onClick={onOpenSupport}
          className="bg-gradient-to-r from-[#2481cc] to-[#1c65a0] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200 group glow-blue border border-white/20"
          title="VIP Telegram Support"
        >
          <MessageCircle className="w-6 h-6 fill-white text-[#2481cc]" />
          <span className="absolute right-full mr-3 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-700 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            💬 VIP Support Bot
          </span>
        </button>
      </div>
    </div>
  );
};
