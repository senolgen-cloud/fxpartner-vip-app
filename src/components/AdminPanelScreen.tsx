import React, { useState } from 'react';
import { ForexSignal } from '../data/initialSignals';
import { Database, Plus, Flame, ToggleLeft, ToggleRight, Radio } from 'lucide-react';

interface AdminPanelScreenProps {
  signals: ForexSignal[];
  onAddSignal: (signal: ForexSignal) => void;
  onToggleStatus: (id: string) => void;
}

export const AdminPanelScreen: React.FC<AdminPanelScreenProps> = ({
  signals,
  onAddSignal,
  onToggleStatus,
}) => {
  const [symbol, setSymbol] = useState('USD/CAD');
  const [direction, setDirection] = useState<'BUY' | 'SELL'>('BUY');
  const [entry, setEntry] = useState('1.3950');
  const [sl, setSl] = useState('1.3890');
  const [tp, setTp] = useState('1.4120');
  const [broker, setBroker] = useState('Exness');
  const [pips, setPips] = useState('42');
  const [traderNotes, setTraderNotes] = useState('Algorithmic breakout above key daily resistance. Heavy institutional accumulation.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newSignal: ForexSignal = {
      id: `sig-${Date.now().toString().slice(-4)}`,
      symbol: symbol.toUpperCase(),
      direction,
      entry: parseFloat(entry) || 1.3950,
      sl: parseFloat(sl) || 1.3890,
      tp: parseFloat(tp) || 1.4120,
      currentPrice: parseFloat(entry) + (direction === 'BUY' ? 0.0042 : -0.0042),
      pips: parseInt(pips) || 42,
      status: 'ACTIVE',
      timestamp: 'Just now',
      broker,
      brokerLogo: broker === 'Exness' ? '⚡' : broker === 'XM' ? '🔴' : broker === 'IC Markets' ? '🟢' : '🔵',
      rrRatio: '1:2.8',
      traderNotes,
      newsImpact: 'High - US Non-Farm Payrolls / CAD Employment preview.',
      timeframe: 'H1',
      confidence: 95,
      history: [
        { time: '10:00', price: parseFloat(entry) },
        { time: 'Just now', price: parseFloat(entry) + (direction === 'BUY' ? 0.0042 : -0.0042) }
      ]
    };

    onAddSignal(newSignal);
    alert(`🔥 FIRESTORE BROADCAST SUCCESS: New ${direction} signal for ${symbol} injected into live pool.`);
  };

  return (
    <div className="pb-24 pt-4 px-4 space-y-6 text-slate-100">
      {/* Header Banner */}
      <div className="bg-glass-premium rounded-2xl p-6 border border-emerald-500/30 shadow-2xl relative overflow-hidden glow-green">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3 shadow">
          <Radio className="w-3.5 h-3.5 animate-pulse" /> FIRESTORE DATABASE SIMULATOR
        </div>

        <h2 className="text-2xl font-black text-white tracking-tight mb-2">
          Admin Injection Terminal
        </h2>
        <p className="text-slate-300 text-xs leading-relaxed font-medium mb-0">
          Simulate real-time Firebase Firestore collection updates. Injecting a signal will instantly broadcast to all connected client dashboards and trigger push notifications.
        </p>
      </div>

      {/* Signal Injection Form */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <h3 className="font-extrabold text-base text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Plus className="w-4 h-4 text-emerald-400" /> Dispatch New Live Signal
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-slate-400 uppercase mb-1 font-semibold">Pair Symbol</label>
              <input
                type="text"
                required
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="EUR/JPY"
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl py-2.5 px-3 text-slate-100 font-bold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 uppercase mb-1 font-semibold">Direction</label>
              <select
                value={direction}
                onChange={(e) => setDirection(e.target.value as 'BUY' | 'SELL')}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl py-2.5 px-3 text-slate-100 font-bold focus:outline-none"
              >
                <option value="BUY">BUY 🟢</option>
                <option value="SELL">SELL 🔴</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[10px] text-slate-400 uppercase mb-1 font-semibold">Entry</label>
              <input
                type="text"
                required
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl py-2 px-2 text-slate-100 font-bold focus:outline-none text-center"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 uppercase mb-1 font-semibold">Take Profit</label>
              <input
                type="text"
                required
                value={tp}
                onChange={(e) => setTp(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl py-2 px-2 text-emerald-400 font-bold focus:outline-none text-center"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 uppercase mb-1 font-semibold">Stop Loss</label>
              <input
                type="text"
                required
                value={sl}
                onChange={(e) => setSl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl py-2 px-2 text-rose-400 font-bold focus:outline-none text-center"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-slate-400 uppercase mb-1 font-semibold">Broker Network</label>
              <select
                value={broker}
                onChange={(e) => setBroker(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl py-2.5 px-3 text-slate-100 font-bold focus:outline-none"
              >
                <option value="Exness">Exness ⚡</option>
                <option value="XM">XM 🔴</option>
                <option value="IC Markets">IC Markets 🟢</option>
                <option value="Markets.com">Markets.com 🔵</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 uppercase mb-1 font-semibold">Initial Net Pips</label>
              <input
                type="number"
                value={pips}
                onChange={(e) => setPips(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl py-2.5 px-3 text-slate-100 font-bold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 uppercase mb-1 font-semibold">Trader Analysis Notes</label>
            <textarea
              rows={2}
              value={traderNotes}
              onChange={(e) => setTraderNotes(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl p-3 text-slate-100 focus:outline-none text-xs"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black font-sans py-3 px-4 rounded-xl transition shadow-lg flex items-center justify-center gap-2 text-sm glow-green tracking-wide"
          >
            <Flame className="w-4 h-4 fill-current text-amber-300" />
            <span>Broadcast Signal to Firestore</span>
          </button>
        </form>
      </div>

      {/* Live Signals Collection Documents */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h3 className="font-extrabold text-base text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-400" /> Firestore `signals` Collection
          </h3>
          <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-mono">
            {signals.length} Docs
          </span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {signals.map((sig) => (
            <div key={sig.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-black ${
                    sig.direction === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {sig.direction}
                  </span>
                  <span className="font-bold text-white text-sm">{sig.symbol}</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  Entry: {sig.entry} | TP: {sig.tp} | SL: {sig.sl}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                    sig.status === 'ACTIVE' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {sig.status}
                  </span>
                </div>

                <button
                  onClick={() => onToggleStatus(sig.id)}
                  className="text-slate-400 hover:text-white p-1"
                  title="Toggle Status (Active <-> Closed)"
                >
                  {sig.status === 'ACTIVE' ? (
                    <ToggleRight className="w-6 h-6 text-blue-500" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-slate-600" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
