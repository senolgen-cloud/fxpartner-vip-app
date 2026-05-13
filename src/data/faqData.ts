export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    question: 'How do I connect my Telegram for instant VIP alerts?',
    answer: 'Navigate to the Profile tab or click the floating support button. Enter your Telegram handle (@username) and our automated verification bot will instantly sync your signals to your private chat.'
  },
  {
    question: 'What is the recommended risk management strategy?',
    answer: 'We strictly recommend risking no more than 1% to 2% of your total account equity per signal. Always utilize the provided Stop Loss (SL) and secure partial profits at Take Profit 1 (TP1).'
  },
  {
    question: 'How are the signals generated?',
    answer: 'Our institutional analysis combines advanced algorithmic order-flow tracking, liquidity grab identification, and fundamental macroeconomic sentiment from former hedge fund traders.'
  },
  {
    question: 'Can I use any broker with FXPARTNER VIP?',
    answer: 'Yes! However, connecting one of our partner brokers (XM, Exness, IC Markets, Markets.com) unlocks raw ECN spreads, zero slippage, and daily cashback rebates up to $8/lot.'
  },
  {
    question: 'How fast are the push notifications delivered?',
    answer: 'Our dedicated Firebase real-time infrastructure pushes alerts in under 150ms directly to your mobile device and Telegram client simultaneously.'
  }
];
