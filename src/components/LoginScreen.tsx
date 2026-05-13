import React, { useState } from 'react';
import { Mail, Lock, Shield, ArrowRight, CheckCircle2, UserCheck } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [telegramSynced, setTelegramSynced] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 800);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Authenticating via ${provider}`);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#060911] flex flex-col justify-center px-6 py-12 text-slate-100 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-800/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full mx-auto relative z-10 flex flex-col">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-4 glow-gold">
            <Shield className="w-3.5 h-3.5" /> ELITE VIP ACCESS
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white mb-1">
            {isRegister ? 'Request VIP Access' : 'Sign in to Terminal'}
          </h2>
          <p className="text-slate-400 text-sm">
            Institutional signals & algorithmic order flow
          </p>
        </div>

        {/* Telegram Direct VIP Login */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => {
              setTelegramSynced(true);
              setTimeout(() => onLogin(), 800);
            }}
            className="w-full bg-[#2481cc]/20 hover:bg-[#2481cc]/30 border border-[#2481cc]/50 text-[#389cf0] font-medium py-3 px-4 rounded-xl transition flex items-center justify-center gap-3 shadow-lg group"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.533.26l.213-3.051 5.56-5.022c.24-.213-.054-.334-.373-.12l-6.869 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.457c.538-.194 1.006.126.758.969z"/>
            </svg>
            <span className="text-sm font-semibold tracking-wide text-slate-100 group-hover:text-white">
              {telegramSynced ? 'Connecting Telegram...' : 'Connect with Telegram VIP'}
            </span>
          </button>
        </div>

        <div className="flex items-center my-4 text-xs text-slate-600 uppercase font-mono tracking-widest">
          <div className="flex-1 border-b border-slate-800"></div>
          <span className="px-3">OR SECURE CREDENTIALS</span>
          <div className="flex-1 border-b border-slate-800"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleAuth} className="space-y-4 mb-6">
          <div>
            <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5 font-medium">
              Registered Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="investor@institution.com"
                className="w-full bg-slate-900/90 border border-slate-800 focus:border-blue-500 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs text-slate-400 uppercase tracking-wider font-medium">
                Password / Passkey
              </label>
              {!isRegister && (
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Passkey reset link dispatched to authenticated Telegram handle.'); }} className="text-xs text-blue-400 hover:text-blue-300">
                  Lost Key?
                </a>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-900/90 border border-slate-800 focus:border-blue-500 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg glow-blue disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>{isRegister ? 'Initialize VIP Account' : 'Authenticate Session'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Apple & Google logins */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <button
            type="button"
            onClick={() => handleSocialLogin('Apple')}
            className="bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 text-slate-300 font-medium py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2 text-xs"
          >
            <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.66-.8 1.11-1.92.99-3.04-1.02.04-2.19.68-2.88 1.48-.6.68-1.12 1.82-.98 2.92 1.14.09 2.22-.56 2.87-1.36z"/>
            </svg>
            <span>Apple ID</span>
          </button>
          
          <button
            type="button"
            onClick={() => handleSocialLogin('Google')}
            className="bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 text-slate-300 font-medium py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2 text-xs"
          >
            <svg className="w-4 h-4 fill-current text-red-500" viewBox="0 0 24 24">
              <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.315 0-6-2.685-6-6s2.685-6 6-6c1.49 0 2.84.55 3.89 1.46l2.35-2.35C16.86 3.65 14.7 3 12.24 3 7.27 3 3 7.27 3 12.24s4.27 9.24 9.24 9.24c5.33 0 8.87-3.75 8.87-9.03 0-.62-.06-1.22-.16-1.8H12.24z"/>
            </svg>
            <span>Google ID</span>
          </button>
        </div>

        {/* Footer switch */}
        <div className="text-center text-xs text-slate-400 pt-4 border-t border-slate-900">
          {isRegister ? (
            <p>
              Already an elite member?{' '}
              <button onClick={() => setIsRegister(false)} className="text-blue-400 font-semibold hover:underline">
                Sign In
              </button>
            </p>
          ) : (
            <p>
              New to FXPARTNER?{' '}
              <button onClick={() => setIsRegister(true)} className="text-amber-400 font-semibold hover:underline">
                Apply for VIP Access
              </button>
            </p>
          )}
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex justify-center items-center gap-6 text-[10px] text-slate-600 font-mono">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> AES-256 Encrypted
          </div>
          <div className="flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5 text-amber-500" /> Premium Liquidity
          </div>
        </div>
      </div>
    </div>
  );
};
