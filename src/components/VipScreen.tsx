import React, { useState } from 'react';
import { VIP_PLANS, CASHBACK_INFO } from '../data/vipPlansData';
import { Award, CheckCircle2, DollarSign, ShieldCheck, Zap, Sparkles, HelpCircle } from 'lucide-react';

interface VipScreenProps {
  onSelectPlan: (planName: string) => void;
}

export const VipScreen: React.FC<VipScreenProps> = ({ onSelectPlan }) => {
  const [activePlanId, setActivePlanId] = useState('quarterly');

  return (
    <div className="pb-24 pt-4 px-4 space-y-6 text-slate-100">
      {/* Luxury Header Banner */}
      <div className="bg-glass-gold rounded-2xl p-6 text-center shadow-2xl glow-gold relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> INSTITUTIONAL TIER
        </div>

        <h2 className="text-3xl font-black text-white tracking-tight mb-2">
          Unlock FXPARTNER <span className="text-gold">VIP</span>
        </h2>
        <p className="text-slate-300 text-xs max-w-sm mx-auto leading-relaxed font-medium mb-6">
          Gain unrestricted access to multi-timeframe liquidity grabs, exact entry coordinates, and raw institutional spreads.
        </p>

        <div className="grid grid-cols-3 gap-3 text-left">
          <div className="bg-slate-900/80 p-3 rounded-xl border border-amber-500/20 shadow">
            <span className="text-[10px] text-amber-400 font-mono font-bold block">SIGNAL ACCURACY</span>
            <span className="text-lg font-black text-white font-mono">91.4%</span>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-xl border border-amber-500/20 shadow">
            <span className="text-[10px] text-amber-400 font-mono font-bold block">CASH REBATE</span>
            <span className="text-lg font-black text-white font-mono">$8/lot</span>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-xl border border-amber-500/20 shadow">
            <span className="text-[10px] text-amber-400 font-mono font-bold block">SUPPORT</span>
            <span className="text-lg font-black text-white font-mono">24/7 1on1</span>
          </div>
        </div>
      </div>

      {/* Subscription Plans Header */}
      <div className="text-center pt-2">
        <h3 className="text-xl font-extrabold text-white tracking-tight">Choose Your Allocation</h3>
        <p className="text-xs text-slate-400 font-mono mt-1">Encrypted Telegram Bot sync included</p>
      </div>

      {/* Plans Grid */}
      <div className="space-y-4">
        {VIP_PLANS.map((plan) => {
          const isSelected = activePlanId === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => setActivePlanId(plan.id)}
              className={`rounded-2xl p-5 cursor-pointer transition-all duration-200 border relative ${
                isSelected
                  ? 'bg-glass-premium border-amber-500/50 glow-gold scale-[1.02]'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 right-5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                  Most Allocated
                </span>
              )}

              <div className="flex justify-between items-center mb-3">
                <div>
                  <h4 className="font-extrabold text-lg text-white">{plan.name}</h4>
                  <span className="text-xs text-slate-400 font-mono">{plan.period}</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-amber-400 font-mono">{plan.price}</span>
                </div>
              </div>

              <ul className="space-y-2 py-3 border-t border-slate-800/80 my-3 text-xs text-slate-300">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 font-mono">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPlan(plan.name);
                }}
                className={`w-full py-3 px-4 rounded-xl font-bold tracking-wide transition shadow-lg flex items-center justify-center gap-2 text-sm ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 hover:brightness-110 font-black'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                <span>Upgrade to {plan.name}</span>
                <Zap className="w-4 h-4 fill-current" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Cashback Information Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white">{CASHBACK_INFO.title}</h3>
            <span className="text-xs text-emerald-400 font-mono font-bold">{CASHBACK_INFO.rebateRate}</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
          {CASHBACK_INFO.description}
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2">
          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-500 text-[10px] block uppercase">Frequency</span>
            <span className="text-white font-bold">{CASHBACK_INFO.frequency}</span>
          </div>
          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-500 text-[10px] block uppercase">Status</span>
            <span className="text-amber-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> {CASHBACK_INFO.status}
            </span>
          </div>
        </div>
      </div>

      {/* Broker Partnership Advantages */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow space-y-3">
        <h3 className="font-extrabold text-base text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" /> Broker Partnership Advantages
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed font-mono">
          Connecting your trading account to our partner brokers automatically unlocks institutional ECN feeds, bypasses slippage filters, and integrates automated copy-trading directly from the FXPARTNER VIP terminal.
        </p>

        <div className="p-4 rounded-xl bg-blue-600/10 border border-blue-500/30 text-blue-300 text-xs font-mono flex items-center gap-3">
          <HelpCircle className="w-6 h-6 text-blue-400 shrink-0" />
          <div>
            <strong className="text-white block mb-0.5">Need assistance choosing an allocation?</strong>
            Contact our VIP Concierge via Telegram for bespoke portfolio analysis.
          </div>
        </div>
      </div>
    </div>
  );
};
