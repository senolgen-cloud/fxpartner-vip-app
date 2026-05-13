import React, { useState } from 'react';
import { User, ShieldCheck, TrendingUp, Bell, CheckCircle2, Save, Send, Smartphone, Volume2, ShieldAlert } from 'lucide-react';

interface ProfileScreenProps {
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout }) => {
  const [telegramHandle, setTelegramHandle] = useState('@alex_investor');
  const [isEditingTg, setIsEditingTg] = useState(false);
  const [mtAccount, setMtAccount] = useState('88923410');

  // Notification toggles
  const [pushAlerts, setPushAlerts] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [newsBriefs, setNewsBriefs] = useState(true);

  const handleSaveTg = () => {
    setIsEditingTg(false);
    alert(`Telegram handle verified. Live signals will now mirror to ${telegramHandle}`);
  };

  return (
    <div className="pb-24 pt-4 px-4 space-y-6 text-slate-100">
      {/* Header Banner */}
      <div className="bg-glass-premium rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-600 rounded-2xl blur opacity-40 animate-pulse"></div>
            <div className="w-16 h-16 bg-slate-900 border border-blue-500/30 rounded-2xl flex items-center justify-center text-blue-400 relative z-10 shadow-lg">
              <User className="w-8 h-8" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white tracking-tight">Alexander H.</h2>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold">
                VIP ELITE
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">alex.investor@institution.ch</p>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 mt-1 font-semibold">
              <ShieldCheck className="w-3 h-3" /> Tier 1 Investor Verified
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-800/80 font-mono text-center">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">Trades Followed</span>
            <span className="text-lg font-black text-white">342</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">Success Rate</span>
            <span className="text-lg font-black text-emerald-400">92.8%</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">Cashback Earned</span>
            <span className="text-lg font-black text-amber-400">$1,840</span>
          </div>
        </div>
      </div>

      {/* Connected Telegram Account */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#2481cc]/20 text-[#389cf0]">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white">Telegram Integration</h3>
            <span className="text-xs text-slate-400 font-mono">Instant push delivery bot</span>
          </div>
        </div>

        {isEditingTg ? (
          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1">Telegram Handle</label>
              <input
                type="text"
                value={telegramHandle}
                onChange={(e) => setTelegramHandle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl py-2 px-3 text-sm text-slate-100 font-mono focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>
            <button
              onClick={handleSaveTg}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-xl text-xs transition flex items-center gap-1.5 shadow"
            >
              <Save className="w-3.5 h-3.5" /> Save Handle
            </button>
          </div>
        ) : (
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex justify-between items-center">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Connected User</span>
              <span className="font-mono text-sm font-bold text-white tracking-wider">{telegramHandle}</span>
            </div>

            <button
              onClick={() => setIsEditingTg(true)}
              className="text-blue-400 hover:text-blue-300 font-semibold text-xs font-mono uppercase"
            >
              Change
            </button>
          </div>
        )}

        <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Bot Handshake: <strong>200 OK ACTIVE</strong>
        </div>
      </div>

      {/* Connected Broker Account */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow space-y-4">
        <h3 className="font-extrabold text-base text-white flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" /> Broker MT4 / MT5 Sync
        </h3>
        <p className="text-xs text-slate-400">
          Link your institutional trading account ID for automated lot tracking and daily cash rebates.
        </p>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex justify-between items-center">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono block">Exness MetaTrader 5</span>
            <span className="font-mono text-sm font-bold text-slate-200 tracking-wider">{mtAccount}</span>
          </div>

          <button
            onClick={() => {
              const res = prompt('Enter new MT4/MT5 Account ID:', mtAccount);
              if (res) setMtAccount(res);
            }}
            className="text-blue-400 hover:text-blue-300 font-semibold text-xs font-mono uppercase"
          >
            Edit ID
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow space-y-4">
        <h3 className="font-extrabold text-base text-white flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-400" /> Notification Preferences
        </h3>

        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-3">
              <Smartphone className="w-4 h-4 text-blue-400" />
              <div className="text-xs">
                <p className="font-bold text-white mb-0">Instant Push Alerts</p>
                <p className="text-slate-500 text-[10px]">Real-time TP & SL target notifications</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={pushAlerts}
              onChange={(e) => setPushAlerts(e.target.checked)}
              className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-3">
              <Volume2 className="w-4 h-4 text-amber-400" />
              <div className="text-xs">
                <p className="font-bold text-white mb-0">Alert Chime / Pulse</p>
                <p className="text-slate-500 text-[10px]">Play sound on new liquidity order blocks</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
              className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <div className="text-xs">
                <p className="font-bold text-white mb-0">VIP Economic News</p>
                <p className="text-slate-500 text-[10px]">Pre-alert volatility warnings</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={newsBriefs}
              onChange={(e) => setNewsBriefs(e.target.checked)}
              className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Logout button */}
      <div className="pt-2">
        <button
          onClick={onLogout}
          className="w-full bg-slate-900 hover:bg-slate-800 border border-rose-500/30 text-rose-400 font-bold py-3 px-4 rounded-xl transition shadow-lg text-xs tracking-wider uppercase font-mono"
        >
          Disconnect Terminal Session
        </button>
      </div>
    </div>
  );
};
