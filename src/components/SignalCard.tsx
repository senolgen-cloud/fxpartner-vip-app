import React from 'react';
import { ForexSignal } from '../data/initialSignals';
import { ArrowUpRight, ArrowDownRight, Clock, Target, ShieldAlert } from 'lucide-react';

interface SignalCardProps {
  signal: ForexSignal;
  onSelect: (signal: ForexSignal) => void;
}

export const SignalCard: React.FC<SignalCardProps> = ({ signal, onSelect }) => {
  const direction = String(signal.direction || 'BUY').toUpperCase();
  const status = String(signal.status || 'ACTIVE').toUpperCase();

  const isBuy = direction === 'BUY';
  const isClosed = status === 'CLOSED';
  const isPending = status === 'PENDING';
  const isProfit = Number(signal.pips || 0) > 0;

  const symbol = signal.symbol || 'XAUUSD';
  const entry = Number(signal.entry || 0);
  const tp = Number(signal.tp || 0);
  const sl = Number(signal.sl || 0);
  const pips = Number(signal.pips || 0);

  const digits = symbol.includes('JPY') ? 3 : symbol.includes('XAU') ? 2 : 5;

  let accentBorder = 'border-slate-800';
  let glowEffect = '';

  if (status === 'ACTIVE') {
    if (isBuy) {
      accentBorder = 'border-emerald-500/40';
      glowEffect = 'glow-green';
    } else {
      accentBorder = 'border-rose-500/40';
      glowEffect = 'glow-red';
    }
  }

  return (
    <div
      onClick={() => onSelect(signal)}
      className={`bg-glass-premium rounded-2xl p-4 cursor-pointer transition-all duration-200 hover:scale-[1.01] hover:border-slate-600 relative overflow-hidden ${accentBorder} ${glowEffect}`}
    >
      {status === 'ACTIVE' && (
        <div
          className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none ${
            isBuy ? 'bg-emerald-500' : 'bg-rose-500'
          }`}
        />
      )}

      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-700/60 flex items-center justify-center text-lg shadow-md">
            {signal.brokerLogo || '⚡'}
          </div>

          <div>
            <h3 className="font-extrabold text-base text-white tracking-tight flex items-center gap-1.5">
              {symbol}
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 font-mono text-slate-400 font-normal">
                {signal.timeframe || 'H1'}
              </span>
            </h3>

            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" />
              {signal.timestamp || signal.openedAt || 'Live'} • {signal.broker || 'FXPARTNER'}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span
            className={`px-2.5 py-1 rounded-lg text-xs font-black tracking-wider flex items-center gap-1 shadow-sm ${
              isBuy
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
            }`}
          >
            {isBuy ? (
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 stroke-[3]" />
            )}
            {direction}
          </span>

          <span className="text-[10px] text-slate-500 uppercase font-mono mt-1 font-semibold">
            {status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 py-2.5 my-2 border-t border-b border-slate-800/80 bg-slate-900/40 rounded-xl px-3">
        <div>
          <span className="text-[10px] text-slate-500 uppercase block font-mono">Entry Price</span>
          <span className="text-xs font-mono font-bold text-slate-200">
            {entry.toFixed(digits)}
          </span>
        </div>

        <div>
          <span className="text-[10px] text-slate-500 uppercase flex items-center gap-0.5 font-mono">
            <Target className="w-3 h-3 text-emerald-400" /> Take Profit
          </span>
          <span className="text-xs font-mono font-bold text-emerald-400">
            {tp.toFixed(digits)}
          </span>
        </div>

        <div>
          <span className="text-[10px] text-slate-500 uppercase flex items-center gap-0.5 font-mono">
            <ShieldAlert className="w-3 h-3 text-rose-400" /> Stop Loss
          </span>
          <span className="text-xs font-mono font-bold text-rose-400">
            {sl.toFixed(digits)}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-1">
        <div className="flex items-center gap-3">
          <div className="text-xs">
            <span className="text-slate-500 text-[10px] block uppercase font-mono">Risk/Reward</span>
            <span className="font-mono text-slate-300 font-semibold">
              {signal.rrRatio || signal.riskReward || '1:2.4'}
            </span>
          </div>

          <div className="text-xs border-l border-slate-800 pl-3">
            <span className="text-slate-500 text-[10px] block uppercase font-mono">Confidence</span>
            <span className="font-mono text-blue-400 font-semibold">
              {signal.confidence || 90}%
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-slate-500 text-[10px] block uppercase font-mono">
            {isClosed ? 'Final Result' : isPending ? 'Target Pips' : 'Live Net Pips'}
          </span>

          <div
            className={`font-mono text-base font-black flex items-center justify-end gap-0.5 ${
              isProfit ? 'text-emerald-400' : pips < 0 ? 'text-rose-400' : 'text-slate-300'
            }`}
          >
            {isProfit ? '+' : ''}
            {pips}
            <span className="text-xs font-normal">pips</span>
          </div>
        </div>
      </div>
    </div>
  );
};
