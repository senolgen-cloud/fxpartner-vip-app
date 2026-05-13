export interface ForexSignal {
  id: string;
  symbol: string;
  direction: 'BUY' | 'SELL';
  entry: number;
  sl: number;
  tp: number;
  currentPrice: number;
  pips: number;
  status: 'ACTIVE' | 'CLOSED' | 'PENDING';
  timestamp: string;
  broker: string;
  brokerLogo: string;
  rrRatio: string;
  traderNotes: string;
  newsImpact: string;
  timeframe: string;
  confidence: number;
  history: { time: string; price: number }[];
}

export const INITIAL_SIGNALS: ForexSignal[] = [
  {
    id: 'sig-1',
    symbol: 'XAU/USD',
    direction: 'BUY',
    entry: 2654.80,
    sl: 2642.00,
    tp: 2685.00,
    currentPrice: 2668.50,
    pips: 137,
    status: 'ACTIVE',
    timestamp: '12 mins ago',
    broker: 'Exness',
    brokerLogo: '⚡',
    rrRatio: '1:2.4',
    traderNotes: 'Institutional liquidity grab detected below 2650 key psychological level. Heavy volume accumulation observed from London session open.',
    newsImpact: 'High - Fed Rate Decision sentiment / US Dollar Index correlation weakening.',
    timeframe: 'H4',
    confidence: 94,
    history: [
      { time: '08:00', price: 2652.10 },
      { time: '09:00', price: 2654.80 },
      { time: '10:00', price: 2661.20 },
      { time: '11:00', price: 2668.50 }
    ]
  },
  {
    id: 'sig-2',
    symbol: 'GBP/JPY',
    direction: 'SELL',
    entry: 195.450,
    sl: 196.200,
    tp: 193.500,
    currentPrice: 194.620,
    pips: 83,
    status: 'ACTIVE',
    timestamp: '34 mins ago',
    broker: 'IC Markets',
    brokerLogo: '🟢',
    rrRatio: '1:2.6',
    traderNotes: 'Bearish engulfing structure confirmed on H4. BoE dovish comments triggering massive yen repatriation flows.',
    newsImpact: 'Moderate - UK CPI data release aftermath.',
    timeframe: 'H1',
    confidence: 89,
    history: [
      { time: '07:30', price: 195.600 },
      { time: '08:30', price: 195.450 },
      { time: '09:30', price: 194.950 },
      { time: '10:30', price: 194.620 }
    ]
  },
  {
    id: 'sig-3',
    symbol: 'EUR/USD',
    direction: 'BUY',
    entry: 1.0825,
    sl: 1.0780,
    tp: 1.0940,
    currentPrice: 1.0872,
    pips: 47,
    status: 'ACTIVE',
    timestamp: '1 hour ago',
    broker: 'XM',
    brokerLogo: '🔴',
    rrRatio: '1:2.5',
    traderNotes: 'ECB rate guidance maintaining hawkish bias relative to consensus. Price bouncing cleanly off 200 EMA support band.',
    newsImpact: 'High - German Flash PMI beat expectations.',
    timeframe: 'M30',
    confidence: 91,
    history: [
      { time: '08:15', price: 1.0815 },
      { time: '09:15', price: 1.0825 },
      { time: '10:15', price: 1.0850 },
      { time: '11:15', price: 1.0872 }
    ]
  },
  {
    id: 'sig-4',
    symbol: 'USD/CHF',
    direction: 'SELL',
    entry: 0.8845,
    sl: 0.8895,
    tp: 0.8720,
    currentPrice: 0.8847,
    pips: -2,
    status: 'PENDING',
    timestamp: '2 hours ago',
    broker: 'Markets.com',
    brokerLogo: '🔵',
    rrRatio: '1:2.5',
    traderNotes: 'Limit order placed at premium supply zone. Awaiting US Retail Sales report to trigger liquidity sweep.',
    newsImpact: 'High - SNB Foreign Currency Reserves update.',
    timeframe: 'H4',
    confidence: 85,
    history: [
      { time: '09:00', price: 0.8820 },
      { time: '10:00', price: 0.8835 },
      { time: '11:00', price: 0.8847 }
    ]
  },
  {
    id: 'sig-5',
    symbol: 'AUD/USD',
    direction: 'BUY',
    entry: 0.6540,
    sl: 0.6490,
    tp: 0.6660,
    currentPrice: 0.6655,
    pips: 115,
    status: 'CLOSED',
    timestamp: 'Yesterday',
    broker: 'Exness',
    brokerLogo: '⚡',
    rrRatio: '1:2.4',
    traderNotes: 'RBA Meeting Minutes spiked commodity pairs. Flawless execution reaching Take Profit 2 target.',
    newsImpact: 'High - RBA Cash Rate Decision.',
    timeframe: 'H1',
    confidence: 95,
    history: [
      { time: 'Yesterday', price: 0.6540 },
      { time: 'Yesterday', price: 0.6600 },
      { time: 'Yesterday', price: 0.6655 }
    ]
  },
  {
    id: 'sig-6',
    symbol: 'BTC/USD',
    direction: 'BUY',
    entry: 88500.0,
    sl: 86000.0,
    tp: 94000.0,
    currentPrice: 92450.0,
    pips: 395,
    status: 'CLOSED',
    timestamp: 'Yesterday',
    broker: 'IC Markets',
    brokerLogo: '🟢',
    rrRatio: '1:2.2',
    traderNotes: 'Massive spot ETF inflow premium. Breakout above previous all-time-high consolidation structure.',
    newsImpact: 'High - Sovereign reserve acquisition rumors.',
    timeframe: 'D1',
    confidence: 96,
    history: [
      { time: 'Yesterday', price: 88500 },
      { time: 'Yesterday', price: 90200 },
      { time: 'Yesterday', price: 92450 }
    ]
  }
];

export interface TradeAlert {
  id: string;
  title: string;
  message: string;
  type: 'ALERT' | 'TP' | 'SL' | 'PENDING' | 'NEWS';
  time: string;
  symbol?: string;
  read: boolean;
}

export const INITIAL_NOTIFICATIONS: TradeAlert[] = [
  {
    id: 'notif-1',
    title: '🟢 TP REACHED: XAU/USD',
    message: 'Take Profit 1 hit at 2668.50 (+137 pips). Secure 50% partials and move SL to breakeven.',
    type: 'TP',
    time: '3 mins ago',
    symbol: 'XAU/USD',
    read: false
  },
  {
    id: 'notif-2',
    title: '⚡ NEW VIP SIGNAL: GBP/JPY',
    message: 'SELL GBP/JPY @ 195.450. SL: 196.200 | TP: 193.500. Institutional order block triggered.',
    type: 'ALERT',
    time: '34 mins ago',
    symbol: 'GBP/JPY',
    read: false
  },
  {
    id: 'notif-3',
    title: '⏳ PENDING ORDER TRIGGERED',
    message: 'EUR/USD Buy Limit at 1.0825 activated successfully. Target 1.0940.',
    type: 'PENDING',
    time: '1 hour ago',
    symbol: 'EUR/USD',
    read: true
  },
  {
    id: 'notif-4',
    title: '💎 VIP ECONOMIC BRIEFING',
    message: 'Powell speaking at 18:00 GMT. Expecting 80+ pips volatility across USD crosses. VIP risk models updated.',
    type: 'NEWS',
    time: '3 hours ago',
    read: true
  },
  {
    id: 'notif-5',
    title: '🎯 TRADE CLOSED IN PROFIT',
    message: 'AUD/USD TP reached at 0.6655 (+115 pips). Flawless institutional swing trade.',
    type: 'TP',
    time: 'Yesterday',
    symbol: 'AUD/USD',
    read: true
  }
];
