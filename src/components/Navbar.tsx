import React from 'react';
import { Bell, ShieldCheck, User } from 'lucide-react';

interface NavbarProps {
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  activeTab: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  unreadCount,
  onOpenNotifications,
  onOpenProfile,
  activeTab
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#060911]/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-900 flex items-center justify-center font-black text-white text-xs shadow-md glow-blue">
          FX
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-sm tracking-tight text-white">
              FXPARTNER
            </span>
            <span className="text-[9px] bg-amber-500/20 border border-amber-500/30 text-amber-400 font-bold px-1 rounded">
              VIP
            </span>
          </div>
          <div className="flex items-center gap-1 text-[9px] text-slate-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>FIRESTORE SYNCED</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Active view indicator */}
        <span className="hidden sm:inline-block text-[10px] text-slate-500 uppercase font-mono bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
          {activeTab}
        </span>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center shadow-md animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Profile Button */}
        <button
          onClick={onOpenProfile}
          className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition flex items-center gap-1.5"
          aria-label="User Profile"
        >
          <User className="w-4 h-4 text-blue-400" />
          <ShieldCheck className="w-3 h-3 text-amber-400" />
        </button>
      </div>
    </header>
  );
};
