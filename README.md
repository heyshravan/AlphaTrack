# AlphaTrack

> Machine Learning-Based Stock Trend Analysis
> *"See the Trend. Understand the Market."*

AlphaTrack is a modern, high-performance financial stock trend analysis dashboard that demonstrates machine-learning-based equity forecasts, technical indicators (RSI, MACD, Moving Averages, Bollinger Bands), market sentiment, and risk analysis.

## Features

- **Landing Page**: AI gradient hero, live index ticker (NIFTY 50, SENSEX, NASDAQ, S&P 500), and interactive preview.
- **Stock Analysis Dashboard**: Multi-timeframe interactive price charts (`1D`, `1W`, `1M`, `6M`, `1Y`, `5Y`) with volume profiles and indicator overlays.
- **AI Trend Prediction**: 7-day directional trajectory forecast with 95% Bayesian confidence intervals.
- **Technical Indicators**: Real-time progress gauges for RSI (14), MACD, 20-period Moving Average, and Bollinger Bands.
- **Market Sentiment**: Donut visualization breaking down Bullish, Neutral, and Bearish institutional flows.
- **Risk Analysis**: Dial meter and progress indicators for Volatility, Beta factor, Max Drawdown, and Systemic Market Risk.
- **Interactive Watchlist**: Search, filter by trend conviction, sort by confidence/price, and add custom equities.
- **Multi-Device Responsive**: Tailored layouts for Mobile (with bottom app bar), Tablet, and Desktop.

## Tech Stack

- **Framework**: Next.js 16 (React 19, Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Glassmorphism
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/heyshravan/AlphaTrack.git
cd AlphaTrack

# Install dependencies
npm install --prefix frontend

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## License
MIT
