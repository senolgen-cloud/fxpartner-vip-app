import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

import {
  INITIAL_NOTIFICATIONS,
  ForexSignal,
  TradeAlert
} from './data/initialSignals';

// Screens & Components
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { DashboardScreen } from './components/DashboardScreen';
import { SignalDetailScreen } from './components/SignalDetailScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { VipScreen } from './components/VipScreen';
import { BrokersScreen } from './components/BrokersScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { CommunityScreen } from './components/CommunityScreen';
import { AdminPanelScreen } from './components/AdminPanelScreen';
import { X } from 'lucide-react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const [selectedSignal, setSelectedSignal] = useState<ForexSignal | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const [signals, setSignals] = useState<ForexSignal[]>([]);
  const [notifications, setNotifications] = useState<TradeAlert[]>(INITIAL_NOTIFICATIONS);
  const [toast, setToast] = useState<TradeAlert | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const unsubscribe = onSnapshot(
      collection(db, 'signals'),
      (snapshot) => {
        const liveSignals = snapshot.docs.map((doc) => {
          const data: any = doc.data();

          const rawStatus = String(data.status || 'ACTIVE');
          const normalizedStatus = rawStatus.trim().toUpperCase();

          const rawDirection = String(data.type || data.direction || 'BUY');
          const normalizedDirection = rawDirection.trim().toUpperCase();

          return {
            id: doc.id,

            symbol: String(data.pair || data.symbol || 'XAUUSD'),
            direction: normalizedDirection === 'SELL' ? 'SELL' : 'BUY',

            entry: Number(data.entry || 0),
            sl: Number(data.sl || 0),
            tp: Number(data.tp || 0),

            status:
              normalizedStatus === 'CLOSED'
                ? 'CLOSED'
                : normalizedStatus === 'PENDING'
                  ? 'PENDING'
                  : 'ACTIVE',

            broker: String(data.broker || 'FXPARTNER'),
            timeframe: String(data.timeframe || 'H1'),

            confidence: Number(data.confidence || 90),
            pips: Number(data.pips || 0),

            rrRatio: String(data.rrRatio || data.riskReward || '1:2.4'),
            riskReward: String(data.riskReward || data.rrRatio || '1:2.4'),

            timestamp: String(data.timestamp || data.openedAt || 'Live'),
            openedAt: String(data.openedAt || data.timestamp || 'Live'),

            brokerLogo: data.brokerLogo || '⚡'
          } as ForexSignal;
        });

        setSignals(liveSignals);
      },
      (error) => {
        console.error('Firestore signals error:', error);
        setSignals([]);
      }
    );

    return () => unsubscribe();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      setSignals((prevSignals) =>
        prevSignals.map((sig) => {
          if (String(sig.status).toUpperCase() !== 'ACTIVE') return sig;

          const pipDelta = Math.floor(Math.random() * 5) - 2;
          const newPips = Number(sig.pips || 0) + pipDelta;

          return { ...sig, pips: newPips };
        })
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleAddSignal = (newSignal: ForexSignal) => {
    const normalizedSignal = {
      ...newSignal,
      status: String(newSignal.status || 'ACTIVE').toUpperCase(),
      direction: String(newSignal.direction || 'BUY').toUpperCase()
    } as ForexSignal;

    setSignals((prev) => [normalizedSignal, ...prev]);

    const newAlert: TradeAlert = {
      id: `notif-${Date.now()}`,
      title: `⚡ NEW VIP SIGNAL: ${normalizedSignal.symbol}`,
      message: `${normalizedSignal.direction} ${normalizedSignal.symbol} @ ${normalizedSignal.entry}. SL: ${normalizedSignal.sl} | TP: ${normalizedSignal.tp}. Encrypted institutional order block broadcast.`,
      type: 'ALERT',
      time: 'Just now',
      symbol: normalizedSignal.symbol,
      read: false
    };

    setNotifications((prev) => [newAlert, ...prev]);
    setToast(newAlert);
  };

  const handleToggleStatus = (id: string) => {
    setSignals((prev) =>
      prev.map((sig) => {
        if (sig.id === id) {
          const currentStatus = String(sig.status || 'ACTIVE').toUpperCase();
          const nextStatus = currentStatus === 'ACTIVE' ? 'CLOSED' : 'ACTIVE';

          return { ...sig, status: nextStatus };
        }

        return sig;
      })
    );
  };

  const handleSimulatePush = () => {
    const pairs = ['GBP/USD', 'AUD/JPY', 'XAU/USD', 'EUR/GBP', 'BTC/USD'];
    const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
    const types: ('ALERT' | 'TP' | 'SL' | 'PENDING' | 'NEWS')[] = ['TP', 'ALERT', 'PENDING', 'NEWS'];
    const type = types[Math.floor(Math.random() * types.length)];

    let title = '';
    let message = '';

    if (type === 'TP') {
      title = `🟢 TP REACHED: ${randomPair}`;
      message = 'Take Profit target hit with flawless execution. Secure partial profits immediately.';
    } else if (type === 'ALERT') {
      title = `⚡ NEW VIP SIGNAL: ${randomPair}`;
      message = 'Institutional order block triggered. Entry coordinates dispatched.';
    } else if (type === 'PENDING') {
      title = '⏳ PENDING ORDER ACTIVATED';
      message = `Limit order for ${randomPair} triggered successfully.`;
    } else {
      title = '💎 VIP ECONOMIC BRIEFING';
      message = 'High volatility anticipated during upcoming London session open.';
    }

    const newAlert: TradeAlert = {
      id: `notif-${Date.now()}`,
      title,
      message,
      type,
      time: 'Just now',
      symbol: randomPair,
      read: false
    };

    setNotifications((prev) => [newAlert, ...prev]);
    setToast(newAlert);
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleSelectPlan = (planName: string) => {
    alert(
      `🎉 Congratulations! You have successfully upgraded to the ${planName} allocation. Your Telegram bot is now syncing with zero latency.`
    );
  };

  const handleOpenSupport = () => {
    alert('💬 Connecting to FXPARTNER VIP Support Telegram Bot. Your priority token has been authenticated.');
    window.open('https://telegram.org', '_blank');
  };

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => setToast(null), 5000);

    return () => clearTimeout(timer);
  }, [toast]);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex flex-col relative max-w-md mx-auto shadow-2xl border-x border-slate-900/80">
      {toast && (
        <div className="fixed top-16 inset-x-4 z-50 max-w-sm mx-auto bg-slate-900/95 border-2 border-blue-500 rounded-2xl p-4 shadow-2xl glow-blue animate-float transition-all">
          <div className="flex justify-between items-start mb-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
              <h4 className="font-extrabold text-sm text-white">{toast.title}</h4>
            </div>

            <button
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 font-mono mt-1 leading-snug">
            {toast.message}
          </p>
        </div>
      )}

      <Navbar
        unreadCount={unreadCount}
        onOpenNotifications={() => {
          setShowNotifications(true);
          setSelectedSignal(null);
        }}
        onOpenProfile={() => {
          setActiveTab('profile');
          setShowNotifications(false);
          setSelectedSignal(null);
        }}
        activeTab={
          showNotifications
            ? 'ALERTS'
            : selectedSignal
              ? 'DETAIL'
              : activeTab.toUpperCase()
        }
      />

      <main className="flex-1 overflow-y-auto">
        {showNotifications ? (
          <NotificationsScreen
            notifications={notifications}
            onMarkAllRead={handleMarkAllRead}
            onSimulatePush={handleSimulatePush}
          />
        ) : selectedSignal ? (
          <SignalDetailScreen
            signal={selectedSignal}
            onBack={() => setSelectedSignal(null)}
          />
        ) : activeTab === 'dashboard' ? (
          <DashboardScreen
            signals={signals}
            onSelectSignal={(sig) => setSelectedSignal(sig)}
            onOpenSupport={handleOpenSupport}
          />
        ) : activeTab === 'brokers' ? (
          <BrokersScreen />
        ) : activeTab === 'vip' ? (
          <VipScreen onSelectPlan={handleSelectPlan} />
        ) : activeTab === 'community' ? (
          <CommunityScreen onOpenSupport={handleOpenSupport} />
        ) : activeTab === 'admin' ? (
          <AdminPanelScreen
            signals={signals}
            onAddSignal={handleAddSignal}
            onToggleStatus={handleToggleStatus}
          />
        ) : activeTab === 'profile' ? (
          <ProfileScreen onLogout={() => setIsAuthenticated(false)} />
        ) : null}
      </main>

      {!selectedSignal && !showNotifications && (
        <BottomNav
          activeTab={activeTab === 'profile' ? '' : activeTab}
          onChangeTab={(tab) => {
            setActiveTab(tab);
            setShowNotifications(false);
            setSelectedSignal(null);
          }}
        />
      )}
    </div>
  );
}
