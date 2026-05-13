import React, { useState } from 'react';
import { BROKERS_DATA } from '../data/brokersData';
import { ExternalLink, Copy, CheckCircle2, ShieldCheck, Star, Info } from 'lucide-react';

export const BrokersScreen: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleRedirect = (url: string, name: string) => {
    alert(`Redirecting to secure VIP account opening form for ${name}. Partner code applied automatically.`);
    window.open(url, '_blank');
  };

  return (
    <div className="pb-24 pt-4 px-4 space-y-6 text-slate-100">
      {/* Header Banner */}
      <div className="bg-glass-premium rounded-2xl p-6 border border-blue-500/30 shadow-2xl relative overflow-hidden glow-blue">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-blue-500/30 text-blue-400 text-xs font-bold mb-3 shadow">
          <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED LIQUIDITY PROVIDERS
        </div>

        <h2 className="text-2xl font-black text-white tracking-tight mb-2">
          Broker Integrations
        </h2>
        <p className="text-slate-300 text-xs leading-relaxed font-medium mb-0">
          Open a verified VIP account with our institutional partners to activate raw 0.0 pip spreads, zero slippage execution, and daily cashback rebates up to $8/lot.
        </p>
      </div>

      {/* Comparison Table / Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
          Elite Broker Comparison
          <span className="text-xs text-slate-500 font-mono font-normal">Updated Daily</span>
        </h3>

        {BROKERS_DATA.map((broker) => (
          <div key={broker.id} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 transition hover:border-slate-700 shadow-xl space-y-4">
            {/* Top row */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl shadow">
                  {broker.logo}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-lg text-white">{broker.name}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold">
                      {broker.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{broker.tagline}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-amber-400 text-xs font-bold font-mono">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{broker.rating}</span>
              </div>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-slate-800 bg-slate-950/50 rounded-xl px-3 font-mono text-xs">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Spreads</span>
                <span className="font-bold text-emerald-400">{broker.spreads}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Max Leverage</span>
                <span className="font-bold text-slate-200">{broker.leverage}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Min Deposit</span>
                <span className="font-bold text-blue-400">{broker.minDeposit}</span>
              </div>
            </div>

            {/* Partner Code integration */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-mono block">VIP Partner Code</span>
                <span className="font-mono font-black text-sm text-amber-400 tracking-wider">{broker.partnerCode}</span>
              </div>

              <button
                onClick={() => handleCopy(broker.partnerCode)}
                className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
              >
                {copiedCode === broker.partnerCode ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            {/* Perks list */}
            <div className="space-y-1.5">
              {broker.perks.map((perk, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            {/* Fast Registration Button */}
            <button
              type="button"
              onClick={() => handleRedirect(broker.regUrl, broker.name)}
              className="w-full bg-gradient-to-r from-blue-600 hover:from-blue-500 via-blue-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-xl transition shadow-lg flex items-center justify-center gap-2 text-sm glow-blue"
            >
              <span>Instant VIP Registration</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Guide Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow space-y-3">
        <h3 className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2 font-mono">
          <Info className="w-4 h-4 text-blue-400" /> How to Link Broker
        </h3>
        <ol className="space-y-2 text-xs text-slate-300 font-mono list-decimal pl-4">
          <li>Select your preferred institutional broker above.</li>
          <li>Click <strong className="text-white">Instant VIP Registration</strong> or apply the Partner Code during account creation.</li>
          <li>Deposit the recommended minimum capital allocation.</li>
          <li>Enter your MT4/MT5 account ID in the Profile screen to activate automated cashback syncing.</li>
        </ol>
      </div>
    </div>
  );
};
