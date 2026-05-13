import React from 'react';
import { LayoutDashboard, Award, Globe, Users2, Database } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Signals', icon: LayoutDashboard },
    { id: 'brokers', label: 'Brokers', icon: Globe },
    { id: 'vip', label: 'VIP Pass', icon: Award },
    { id: 'community', label: 'Support', icon: Users2 },
    { id: 'admin', label: 'Admin', icon: Database },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#060911]/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-2 flex justify-around items-center shadow-2xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChangeTab(item.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-2 rounded-xl transition ${
              isActive
                ? 'text-blue-400 font-bold bg-blue-600/10 border border-blue-500/20 glow-blue'
                : 'text-slate-500 hover:text-slate-300 font-medium'
            }`}
          >
            <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-blue-400 stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] tracking-wide">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
