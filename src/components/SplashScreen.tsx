import React, { useEffect, useState } from 'react';
import { TrendingUp, ShieldCheck } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 400);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-[#060911] bg-radial from-[#101932] via-[#060911] to-[#030509] flex flex-col items-center justify-between p-8 z-50 overflow-hidden text-slate-100">
      {/* Background glowing ambient elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
      
      <div className="w-full flex justify-between items-center text-xs text-slate-500 tracking-widest pt-4">
        <span>SECURE TERMINAL V4.2</span>
        <span className="flex items-center gap-1 text-blue-400">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span> LIVE ENCRYPTED
        </span>
      </div>

      <div className="flex flex-col items-center text-center my-auto z-10">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-blue-600 rounded-2xl blur-xl opacity-30 animate-pulse-slow"></div>
          <div className="relative w-24 h-24 bg-gradient-to-br from-slate-900 via-[#0e1628] to-slate-900 border border-blue-500/30 rounded-2xl flex items-center justify-center shadow-2xl glow-blue">
            <TrendingUp className="w-12 h-12 text-blue-500 stroke-[2.5]" />
          </div>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight mb-2 flex items-center gap-2">
          <span className="text-slate-100">FX</span>
          <span className="text-metallic font-black bg-gradient-to-r from-blue-400 via-blue-200 to-white bg-clip-text text-transparent">PARTNER</span>
          <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold ml-1">VIP</span>
        </h1>

        <p className="text-slate-400 text-sm tracking-widest uppercase font-medium mt-1">
          Trade Smarter. Move Faster.
        </p>
      </div>

      <div className="w-full max-w-xs flex flex-col items-center z-10 mb-8">
        <div className="w-full bg-slate-800/80 rounded-full h-1.5 p-0.5 overflow-hidden border border-slate-700/50 mb-3">
          <div 
            className="bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-300 h-full rounded-full transition-all duration-100 ease-out shadow-[0_0_12px_rgba(59,130,246,0.8)]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between w-full text-[10px] text-slate-500 font-mono tracking-wider">
          <span>AUTHENTICATING VIP SESSION...</span>
          <span>{progress}%</span>
        </div>

        <div className="mt-8 flex items-center gap-1.5 text-slate-600 text-[10px] uppercase font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> Institutional Liquidity Network
        </div>
      </div>
    </div>
  );
};
