import React, { useState } from 'react';
import { FAQ_DATA } from '../data/faqData';
import { Users2, MessageCircle, HelpCircle, ChevronDown, ExternalLink, ShieldCheck } from 'lucide-react';

interface CommunityScreenProps {
  onOpenSupport: () => void;
}

export const CommunityScreen: React.FC<CommunityScreenProps> = ({ onOpenSupport }) => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIdx(openFaqIdx === index ? null : index);
  };

  return (
    <div className="pb-24 pt-4 px-4 space-y-6 text-slate-100">
      {/* Header Banner */}
      <div className="bg-glass-premium rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-blue-500/30 text-blue-400 text-xs font-bold mb-3 shadow">
          <Users2 className="w-3.5 h-3.5" /> INSTITUTIONAL TRADING SYNDICATE
        </div>

        <h2 className="text-2xl font-black text-white tracking-tight mb-2">
          Community & VIP Support
        </h2>
        <p className="text-slate-300 text-xs leading-relaxed font-medium mb-0">
          Connect directly with institutional order-flow experts, proprietary algorithms, and our 24/7 VIP Concierge team.
        </p>
      </div>

      {/* Telegram Community & Live Chat CTA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Telegram Community Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#2481cc]/20 text-[#389cf0]">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.533.26l.213-3.051 5.56-5.022c.24-.213-.054-.334-.373-.12l-6.869 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.457c.538-.194 1.006.126.758.969z"/>
              </svg>
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">VIP Inner Circle</h3>
              <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span> 4,820 Active Traders
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 font-mono">
            Access private institutional chart breakdowns, live liquidity maps, and daily Q&A voice rooms.
          </p>

          <button
            onClick={() => {
              alert('Redirecting to secure Telegram VIP Syndicate group. Access granted via authenticated token.');
              window.open('https://telegram.org', '_blank');
            }}
            className="w-full bg-[#2481cc]/20 hover:bg-[#2481cc]/30 border border-[#2481cc]/50 text-[#389cf0] font-bold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 text-xs shadow"
          >
            <span>Launch Telegram Channel</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* VIP Support Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">24/7 VIP Concierge</h3>
              <span className="text-xs text-slate-400 font-mono">Private 1-on-1 Helpdesk</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 font-mono">
            Encountering order execution issues or require custom leverage allocation advice? Chat with our experts.
          </p>

          <button
            onClick={onOpenSupport}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 text-xs shadow glow-blue"
          >
            <span>Start Live Support Chat</span>
            <MessageCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 pt-2">
          <HelpCircle className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-extrabold text-white tracking-tight">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-2.5">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden transition">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 flex justify-between items-center text-left gap-4 font-bold text-sm text-white hover:text-blue-400 transition"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-blue-400' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-300 font-mono leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust & Uptime Info */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center justify-between text-xs font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> UPTIME SLA
        </span>
        <span className="text-white font-bold">99.99% Equinix NY4</span>
      </div>
    </div>
  );
};
