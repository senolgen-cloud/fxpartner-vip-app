export interface Broker {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  spreads: string;
  leverage: string;
  minDeposit: string;
  rating: number;
  partnerCode: string;
  regUrl: string;
  badge: string;
  perks: string[];
}

export const BROKERS_DATA: Broker[] = [
  {
    id: 'xm',
    name: 'XM',
    logo: '🔴',
    tagline: 'Best Overall VIP Execution & Ultra Low Spreads',
    spreads: 'from 0.6 pips',
    leverage: 'Up to 1:1000',
    minDeposit: '$5',
    rating: 4.9,
    partnerCode: 'FXPARTNER_XM99',
    regUrl: 'https://www.xm.com',
    badge: '★ VIP Choice',
    perks: ['100% Deposit Bonus', 'Zero Fees on Withdrawals', 'Free VPS for EAs']
  },
  {
    id: 'exness',
    name: 'Exness',
    logo: '⚡',
    tagline: 'Instant Withdrawals & Infinite Leverage Options',
    spreads: 'from 0.0 pips',
    leverage: 'Unlimited',
    minDeposit: '$10',
    rating: 4.95,
    partnerCode: 'VIP_EXNESS_LEAD',
    regUrl: 'https://www.exness.com',
    badge: '👑 Lowest Spreads',
    perks: ['Raw Spread Account', 'Instant Automated Payouts', 'Crypto Trading 24/7']
  },
  {
    id: 'icmarkets',
    name: 'IC Markets',
    logo: '🟢',
    tagline: 'True ECN Institutional Grade Liquidity',
    spreads: 'from 0.0 pips',
    leverage: 'Up to 1:500',
    minDeposit: '$200',
    rating: 4.85,
    partnerCode: 'IC_VIPPARTNER',
    regUrl: 'https://www.icmarkets.com',
    badge: '🛡️ Best for Scalping',
    perks: ['cTrader & MT5 VIP Access', 'Equinix NY4 Servers', 'Ultra-fast Execution (<40ms)']
  },
  {
    id: 'marketscom',
    name: 'Markets.com',
    logo: '🔵',
    tagline: 'Superior Proprietary Tech & Advanced Charting',
    spreads: 'from 0.8 pips',
    leverage: 'Up to 1:300',
    minDeposit: '$100',
    rating: 4.75,
    partnerCode: 'MARKETS_FXVIP',
    regUrl: 'https://www.markets.com',
    badge: '💎 Premium Tools',
    perks: ['Institutional Sentiment Indicators', 'Dedicated Account Manager', 'Free VIP Signal Integration']
  }
];
