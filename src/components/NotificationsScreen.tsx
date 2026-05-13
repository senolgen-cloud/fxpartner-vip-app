import React from 'react';
import { TradeAlert } from '../data/initialSignals';
import { CheckCircle2, AlertCircle, Clock, Volume2, ShieldCheck, ArrowRight } from 'lucide-react';

interface NotificationsScreenProps {
  notifications: TradeAlert[];
  onMarkAllRead: () => void;
  onSimulatePush: () => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  notifications,
  onMarkAllRead,
  onSimulatePush,
}) => {
  return (
    <div className="pb-24 pt-4 px-4 space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex justify-between items-center pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Institutional Alerts
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          </h2>
          <p className="text-xs text-slate-400 font-mono">Real-time WebSocket & Telegram Sync</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSimulatePush}
            className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1"
          >
            <Volume2 className="w-3.5 h-3.5" /> Inject Alert
          </button>
          
          <button
            onClick={onMarkAllRead}
            className="bg-slate-900 hover:bg-slate-800 text-slate-400 px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-800 transition"
          >
            Mark Read
          </button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center gap-3 shadow">
        <ShieldCheck className="w-8 h-8 text-blue-400 shrink-0" />
        <div className="text-xs">
          <p className="font-bold text-white mb-0.5">VIP Priority Push Delivery Active</p>
          <p className="text-slate-400 font-mono">
            Latency &lt; 120ms. Connected directly to Equinix NY4 servers.
          </p>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-3">
        {notifications.map((notif) => {
          let badgeColor = 'bg-blue-500/10 border-blue-500/30 text-blue-400';
          if (notif.type === 'TP') badgeColor = 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
          if (notif.type === 'SL') badgeColor = 'bg-rose-500/10 border-rose-500/30 text-rose-400';
          if (notif.type === 'PENDING') badgeColor = 'bg-amber-500/10 border-amber-500/30 text-amber-400';
          if (notif.type === 'NEWS') badgeColor = 'bg-purple-500/10 border-purple-500/30 text-purple-400';

          return (
            <div
              key={notif.id}
              className={`bg-slate-900/80 rounded-2xl p-4 border transition ${
                notif.read ? 'border-slate-800/80 opacity-75' : 'border-blue-500/40 glow-blue'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider border ${badgeColor}`}>
                    {notif.type}
                  </span>
                  <h3 className="font-extrabold text-sm text-white tracking-tight">
                    {notif.title}
                  </h3>
                </div>
                <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {notif.time}
                </span>
              </div>

              <p className="text-xs text-slate-300 font-mono leading-relaxed bg-slate-950/50 p-3 rounded-xl border border-slate-800/60 mb-3">
                {notif.message}
              </p>

              <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                <span className="flex items-center gap-1">
                  {notif.read ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <AlertCircle className="w-3 h-3 text-blue-400" />}
                  {notif.read ? 'Acknowledged' : 'New Priority Dispatch'}
                </span>

                <button 
                  onClick={() => alert(`Redirecting to live signal order block for ${notif.symbol || 'VIP Feed'}`)}
                  className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 uppercase"
                >
                  View Order <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
