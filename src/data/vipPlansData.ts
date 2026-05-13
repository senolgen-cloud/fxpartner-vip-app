export interface VipPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
}

export const VIP_PLANS: VipPlan[] = [
  {
    id: 'monthly',
    name: 'VIP Elite Monthly',
    price: '$149',
    period: 'per month',
    features: [
      '5-10 Daily Institutional Signals',
      'Exact Entry, 2x TP & SL Targets',
      'Real-time Telegram & Push Alerts',
      'Live Trading Room Access',
      'Broker Cashback Eligibility',
      'Weekly Market Video Breakdown'
    ]
  },
  {
    id: 'quarterly',
    name: 'Institutional Pro',
    price: '$349',
    period: 'per quarter ($116/mo)',
    popular: true,
    features: [
      'All Monthly Plan Features',
      'Direct Telegram 1-on-1 Mentor Support',
      'Algorithmic EA Indicators (MT4/MT5)',
      'VIP News Spike Pre-alert System',
      'Zero Spread Broker Code Access',
      'Priority Trade Execution Queues'
    ]
  },
  {
    id: 'lifetime',
    name: 'FXPARTNER Foundation',
    price: '$999',
    period: 'lifetime access',
    features: [
      'Lifetime VIP Signals & Indicator Suite',
      'Unlimited 1-on-1 Trading Consultations',
      'Private High-Net-Worth Investor Circle',
      'Free VIP Ticket to Annual Gala',
      'Custom Risk Management Bot',
      'Maximum Broker Rebates (Up to $8/lot)'
    ]
  }
];

export const CASHBACK_INFO = {
  title: 'Broker Partnership Cashback',
  description: 'When you open an account using our partner codes, you receive instant cash rebates directly to your trading account for every lot traded.',
  rebateRate: 'Up to $8.00 per traded lot',
  frequency: 'Paid Daily at 00:00 GMT',
  status: 'Active for all verified VIP members'
};
