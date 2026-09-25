export interface Stock {
  symbol: string;
  name: string;
  currency: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  volume: string;
  high52W: number;
  low52W: number;
  openPrice: number;
  prevClose: number;
  peRatio: number;
  aiPrediction: {
    trend: "BULLISH" | "BEARISH" | "NEUTRAL";
    confidence: number;
    horizon: string;
    expectedMovement: string;
    riskLevel: "Low" | "Medium" | "High";
    modelName: string;
    summary: string;
    forecastPoints: {
      day: string;
      historical?: number;
      predicted: number;
      upperBand: number;
      lowerBand: number;
    }[];
  };
  indicators: {
    rsi: { value: number; status: "Oversold" | "Neutral" | "Overbought"; signal: string };
    macd: { value: string; status: "Bullish" | "Bearish" | "Neutral"; signal: string };
    movingAverage: { value: string; status: string; signal: string };
    bollingerBands: { status: string; upper: number; lower: number; middle: number };
  };
  sentiment: {
    bullish: number;
    neutral: number;
    bearish: number;
    sources: { name: string; score: number; sentiment: string }[];
  };
  risk: {
    level: "Low" | "Medium" | "High";
    volatility: string;
    volatilityScore: number;
    beta: number;
    drawdown: string;
    drawdownScore: number;
    marketRiskScore: number;
  };
  insights: {
    category: "Momentum" | "Volume" | "Volatility" | "Trend";
    title: string;
    text: string;
    impact: "Positive" | "Neutral" | "Negative";
  }[];
  history: Record<string, {
    date: string;
    price: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    ma20?: number;
    ema20?: number;
    bollingerUpper?: number;
    bollingerLower?: number;
  }[]>;
}

export interface MarketIndex {
  symbol: string;
  name: string;
  value: string;
  change: string;
  changePercent: number;
  isPositive: boolean;
  sparkline: number[];
}

export const MARKET_INDICES: MarketIndex[] = [
  {
    symbol: "NIFTY 50",
    name: "NSE India",
    value: "25,388.90",
    change: "+164.20",
    changePercent: 0.65,
    isPositive: true,
    sparkline: [25200, 25240, 25210, 25290, 25310, 25350, 25388],
  },
  {
    symbol: "SENSEX",
    name: "BSE India",
    value: "82,890.94",
    change: "+478.10",
    changePercent: 0.58,
    isPositive: true,
    sparkline: [82400, 82510, 82490, 82650, 82720, 82810, 82890],
  },
  {
    symbol: "NASDAQ",
    name: "US Composite",
    value: "18,290.40",
    change: "+202.80",
    changePercent: 1.12,
    isPositive: true,
    sparkline: [18050, 18120, 18090, 18190, 18230, 18260, 18290],
  },
  {
    symbol: "S&P 500",
    name: "US Benchmark",
    value: "5,712.30",
    change: "+41.80",
    changePercent: 0.74,
    isPositive: true,
    sparkline: [5660, 5675, 5670, 5690, 5700, 5708, 5712],
  },
];

// Helper to generate realistic chart points
const generateHistory = (basePrice: number, volatility: number) => {
  const timeframes = ["1D", "1W", "1M", "6M", "1Y", "5Y"];
  const history: Record<string, any[]> = {};

  const pointCounts: Record<string, number> = {
    "1D": 24,
    "1W": 28,
    "1M": 30,
    "6M": 40,
    "1Y": 50,
    "5Y": 60,
  };

  timeframes.forEach((tf) => {
    const count = pointCounts[tf];
    const points = [];
    let current = basePrice * (tf === "5Y" ? 0.45 : tf === "1Y" ? 0.75 : tf === "6M" ? 0.88 : 0.98);

    for (let i = 0; i < count; i++) {
      const changePercent = (Math.random() - 0.47) * volatility;
      current = Math.max(current * (1 + changePercent), 10);
      const high = current * (1 + Math.random() * 0.012);
      const low = current * (1 - Math.random() * 0.012);
      const open = low + Math.random() * (high - low);
      const close = current;
      const vol = Math.floor(Math.random() * 800000 + 400000);
      const ma20 = current * (1 + (Math.sin(i / 5) * 0.015));
      const ema20 = current * (1 + (Math.cos(i / 4) * 0.012));
      const bbSpread = current * 0.035;

      let dateLabel = `Pt ${i + 1}`;
      if (tf === "1D") {
        const hour = 9 + Math.floor((i * 6.5) / count);
        const min = Math.floor(((i * 6.5 * 60) / count) % 60);
        dateLabel = `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
      } else if (tf === "1W") {
        const days = ["Mon 10:00", "Mon 14:00", "Tue 10:00", "Tue 14:00", "Wed 10:00", "Thu 10:00", "Fri 15:30"];
        dateLabel = days[i % days.length];
      } else if (tf === "1M") {
        dateLabel = `Day ${i + 1}`;
      } else if (tf === "6M" || tf === "1Y") {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        dateLabel = months[i % 12] + " " + (2025 + Math.floor(i / 12));
      } else {
        dateLabel = `${2021 + Math.floor(i / 12)} Q${(i % 4) + 1}`;
      }

      points.push({
        date: dateLabel,
        price: Number(current.toFixed(2)),
        open: Number(open.toFixed(2)),
        high: Number(high.toFixed(2)),
        low: Number(low.toFixed(2)),
        close: Number(close.toFixed(2)),
        volume: vol,
        ma20: Number(ma20.toFixed(2)),
        ema20: Number(ema20.toFixed(2)),
        bollingerUpper: Number((ma20 + bbSpread).toFixed(2)),
        bollingerLower: Number((ma20 - bbSpread).toFixed(2)),
      });
    }

    // Ensure the last point is exact basePrice
    points[points.length - 1].price = basePrice;
    points[points.length - 1].close = basePrice;

    history[tf] = points;
  });

  return history;
};

export const STOCKS_DATA: Record<string, Stock> = {
  RELIANCE: {
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd.",
    currency: "₹",
    price: 2845.20,
    change: 66.70,
    changePercent: 2.4,
    marketCap: "₹19.24T",
    volume: "7,412,890",
    high52W: 3024.90,
    low52W: 2220.30,
    openPrice: 2785.00,
    prevClose: 2778.50,
    peRatio: 28.4,
    aiPrediction: {
      trend: "BULLISH",
      confidence: 87.4,
      horizon: "Next 7 Days",
      expectedMovement: "+3.8% to +5.2%",
      riskLevel: "Medium",
      modelName: "AlphaLSTM-v4 Multi-Head Transformer",
      summary: "High institutional accumulation with RSI crossing above 60. Neural layers predict an upward continuation towards ₹2,960 resistance.",
      forecastPoints: [
        { day: "Day -3", historical: 2795, predicted: 2795, upperBand: 2810, lowerBand: 2780 },
        { day: "Day -2", historical: 2810, predicted: 2810, upperBand: 2825, lowerBand: 2795 },
        { day: "Day -1", historical: 2825, predicted: 2825, upperBand: 2840, lowerBand: 2810 },
        { day: "Today", historical: 2845, predicted: 2845, upperBand: 2865, lowerBand: 2825 },
        { day: "+1 Day", predicted: 2868, upperBand: 2895, lowerBand: 2840 },
        { day: "+2 Days", predicted: 2892, upperBand: 2928, lowerBand: 2855 },
        { day: "+3 Days", predicted: 2915, upperBand: 2955, lowerBand: 2870 },
        { day: "+4 Days", predicted: 2930, upperBand: 2980, lowerBand: 2885 },
        { day: "+5 Days", predicted: 2948, upperBand: 3005, lowerBand: 2895 },
        { day: "+6 Days", predicted: 2962, upperBand: 3025, lowerBand: 2905 },
        { day: "+7 Days", predicted: 2980, upperBand: 3050, lowerBand: 2915 },
      ],
    },
    indicators: {
      rsi: { value: 64.8, status: "Neutral", signal: "Bullish divergence forming" },
      macd: { value: "+2.41", status: "Bullish", signal: "Fast line crossed signal line upward" },
      movingAverage: { value: "₹2,845", status: "Above MA", signal: "Trading 3.4% above 20-day MA" },
      bollingerBands: { status: "Normal Volatility", upper: 2890, lower: 2760, middle: 2825 },
    },
    sentiment: {
      bullish: 62,
      neutral: 24,
      bearish: 14,
      sources: [
        { name: "Technical Indicators", score: 78, sentiment: "Strong Bullish" },
        { name: "Market Momentum", score: 65, sentiment: "Bullish" },
        { name: "Volume Profile", score: 72, sentiment: "Accumulation" },
        { name: "Historical Patterns", score: 60, sentiment: "Moderate Bullish" },
      ],
    },
    risk: {
      level: "Medium",
      volatility: "18.4%",
      volatilityScore: 42,
      beta: 1.12,
      drawdown: "-11.2%",
      drawdownScore: 35,
      marketRiskScore: 48,
    },
    insights: [
      {
        category: "Momentum",
        title: "Strong 20-Day Momentum",
        text: "RELIANCE is showing positive momentum with the price trading cleanly above its 20-day moving average. Increasing volume and improving RSI indicate stronger short-term velocity.",
        impact: "Positive",
      },
      {
        category: "Volume",
        title: "Institutional Inflow Spike",
        text: "Delivery volume has increased by 34% compared to the 10-day median, suggesting accumulation by institutional funds around the ₹2,800 psychological floor.",
        impact: "Positive",
      },
      {
        category: "Volatility",
        title: "Bollinger Expansion",
        text: "Bollinger Band bandwidth expanded by 12% over the last 3 sessions, preceding a breakout attempt toward the 52-week peak.",
        impact: "Neutral",
      },
      {
        category: "Trend",
        title: "Golden Cross Confirmation",
        text: "Short-term moving averages maintain an upward fan pattern. The primary trend structure remains solidly bullish with higher lows on the daily timeframe.",
        impact: "Positive",
      },
    ],
    history: generateHistory(2845.20, 0.016),
  },

  TCS: {
    symbol: "TCS",
    name: "Tata Consultancy Services Ltd.",
    currency: "₹",
    price: 3921.50,
    change: 46.50,
    changePercent: 1.2,
    marketCap: "₹14.18T",
    volume: "3,189,450",
    high52W: 4250.00,
    low52W: 3310.20,
    openPrice: 3885.00,
    prevClose: 3875.00,
    peRatio: 31.8,
    aiPrediction: {
      trend: "BULLISH",
      confidence: 82.1,
      horizon: "Next 7 Days",
      expectedMovement: "+2.5% to +4.0%",
      riskLevel: "Low",
      modelName: "AlphaLSTM-v4 Multi-Head Transformer",
      summary: "Steady IT-sector momentum with resilient free cash flows. Model identifies consolidating breakout pattern with 82% confidence.",
      forecastPoints: [
        { day: "Day -3", historical: 3860, predicted: 3860, upperBand: 3880, lowerBand: 3840 },
        { day: "Day -2", historical: 3875, predicted: 3875, upperBand: 3895, lowerBand: 3855 },
        { day: "Day -1", historical: 3890, predicted: 3890, upperBand: 3915, lowerBand: 3870 },
        { day: "Today", historical: 3921, predicted: 3921, upperBand: 3945, lowerBand: 3900 },
        { day: "+1 Day", predicted: 3945, upperBand: 3975, lowerBand: 3915 },
        { day: "+2 Days", predicted: 3970, upperBand: 4010, lowerBand: 3930 },
        { day: "+3 Days", predicted: 3995, upperBand: 4040, lowerBand: 3950 },
        { day: "+4 Days", predicted: 4015, upperBand: 4065, lowerBand: 3965 },
        { day: "+5 Days", predicted: 4038, upperBand: 4095, lowerBand: 3980 },
        { day: "+6 Days", predicted: 4055, upperBand: 4120, lowerBand: 3995 },
        { day: "+7 Days", predicted: 4075, upperBand: 4145, lowerBand: 4010 },
      ],
    },
    indicators: {
      rsi: { value: 58.2, status: "Neutral", signal: "Constructive consolidation" },
      macd: { value: "+1.85", status: "Bullish", signal: "Histogram expanding upward" },
      movingAverage: { value: "₹3,921", status: "Above MA", signal: "Sustaining above 50-day EMA" },
      bollingerBands: { status: "Normal Volatility", upper: 3990, lower: 3820, middle: 3905 },
    },
    sentiment: {
      bullish: 58,
      neutral: 31,
      bearish: 11,
      sources: [
        { name: "Technical Indicators", score: 72, sentiment: "Bullish" },
        { name: "Market Momentum", score: 60, sentiment: "Moderate Bullish" },
        { name: "Volume Profile", score: 64, sentiment: "Balanced" },
        { name: "Historical Patterns", score: 68, sentiment: "Bullish" },
      ],
    },
    risk: {
      level: "Low",
      volatility: "14.2%",
      volatilityScore: 28,
      beta: 0.78,
      drawdown: "-8.5%",
      drawdownScore: 24,
      marketRiskScore: 32,
    },
    insights: [
      {
        category: "Momentum",
        title: "Contract Win Backing",
        text: "Recent multi-year cloud transformation contract wins bolster multi-quarter cash visibility, sustaining technical resilience against macro headwinds.",
        impact: "Positive",
      },
      {
        category: "Volume",
        title: "Controlled Liquidity",
        text: "Trading volumes remain orderly without distribution signs. Low sell pressure reinforces support near ₹3,850.",
        impact: "Positive",
      },
      {
        category: "Volatility",
        title: "Defensive Characteristics",
        text: "Beta of 0.78 offers superior downside protection during broader market corrective phases.",
        impact: "Positive",
      },
      {
        category: "Trend",
        title: "Cup & Handle Continuation",
        text: "Technical charting indicates an emerging cup-and-handle pattern targeting ₹4,150 over the medium term.",
        impact: "Positive",
      },
    ],
    history: generateHistory(3921.50, 0.013),
  },

  INFY: {
    symbol: "INFY",
    name: "Infosys Ltd.",
    currency: "₹",
    price: 1624.80,
    change: -13.10,
    changePercent: -0.8,
    marketCap: "₹6.75T",
    volume: "5,124,300",
    high52W: 1950.00,
    low52W: 1350.50,
    openPrice: 1640.00,
    prevClose: 1637.90,
    peRatio: 26.5,
    aiPrediction: {
      trend: "NEUTRAL",
      confidence: 71.3,
      horizon: "Next 7 Days",
      expectedMovement: "-1.0% to +1.5%",
      riskLevel: "Medium",
      modelName: "AlphaLSTM-v4 Multi-Head Transformer",
      summary: "Short-term rangebound consolidation between ₹1,610 support and ₹1,665 resistance. Neural ensemble anticipates sideways oscillation.",
      forecastPoints: [
        { day: "Day -3", historical: 1645, predicted: 1645, upperBand: 1660, lowerBand: 1630 },
        { day: "Day -2", historical: 1638, predicted: 1638, upperBand: 1655, lowerBand: 1625 },
        { day: "Day -1", historical: 1637, predicted: 1637, upperBand: 1650, lowerBand: 1620 },
        { day: "Today", historical: 1624, predicted: 1624, upperBand: 1645, lowerBand: 1610 },
        { day: "+1 Day", predicted: 1620, upperBand: 1640, lowerBand: 1600 },
        { day: "+2 Days", predicted: 1626, upperBand: 1648, lowerBand: 1605 },
        { day: "+3 Days", predicted: 1631, upperBand: 1655, lowerBand: 1610 },
        { day: "+4 Days", predicted: 1635, upperBand: 1662, lowerBand: 1612 },
        { day: "+5 Days", predicted: 1632, upperBand: 1665, lowerBand: 1610 },
        { day: "+6 Days", predicted: 1638, upperBand: 1670, lowerBand: 1615 },
        { day: "+7 Days", predicted: 1642, upperBand: 1675, lowerBand: 1618 },
      ],
    },
    indicators: {
      rsi: { value: 48.6, status: "Neutral", signal: "Oscillating in neutral equilibrium" },
      macd: { value: "-0.45", status: "Neutral", signal: "Converging near zero baseline" },
      movingAverage: { value: "₹1,624", status: "Near MA", signal: "Testing 50-day moving average" },
      bollingerBands: { status: "Narrow Volatility", upper: 1665, lower: 1610, middle: 1638 },
    },
    sentiment: {
      bullish: 42,
      neutral: 38,
      bearish: 20,
      sources: [
        { name: "Technical Indicators", score: 50, sentiment: "Neutral" },
        { name: "Market Momentum", score: 45, sentiment: "Neutral" },
        { name: "Volume Profile", score: 55, sentiment: "Average" },
        { name: "Historical Patterns", score: 52, sentiment: "Neutral" },
      ],
    },
    risk: {
      level: "Medium",
      volatility: "19.8%",
      volatilityScore: 46,
      beta: 1.05,
      drawdown: "-14.6%",
      drawdownScore: 42,
      marketRiskScore: 49,
    },
    insights: [
      {
        category: "Momentum",
        title: "Sideways Range Formation",
        text: "INFY price action is constrained within a tight ₹55 band. Momentum metrics lack directional velocity until a clear breakout occurs.",
        impact: "Neutral",
      },
      {
        category: "Volume",
        title: "Decreasing Volume Trend",
        text: "Volume contraction indicates market hesitation prior to impending earnings pre-announcements.",
        impact: "Neutral",
      },
      {
        category: "Volatility",
        title: "Bollinger Squeeze",
        text: "Bandwidth has compressed to 3-month lows. Historically, such contractions precede significant directional swings within 10-15 trading days.",
        impact: "Neutral",
      },
      {
        category: "Trend",
        title: "Support Test at ₹1,610",
        text: "Buyers consistently defend the ₹1,600-1,610 region. Breakdown below this may test ₹1,570.",
        impact: "Negative",
      },
    ],
    history: generateHistory(1624.80, 0.015),
  },

  HDFCBANK: {
    symbol: "HDFCBANK",
    name: "HDFC Bank Ltd.",
    currency: "₹",
    price: 1782.40,
    change: 31.50,
    changePercent: 1.8,
    marketCap: "₹13.56T",
    volume: "8,924,110",
    high52W: 1820.00,
    low52W: 1363.55,
    openPrice: 1756.00,
    prevClose: 1750.90,
    peRatio: 19.8,
    aiPrediction: {
      trend: "BULLISH",
      confidence: 84.6,
      horizon: "Next 7 Days",
      expectedMovement: "+3.0% to +4.5%",
      riskLevel: "Medium",
      modelName: "AlphaLSTM-v4 Multi-Head Transformer",
      summary: "Credit growth resurgence and FII buying inflows are driving financial sector leadership. Target retest of 52W high at ₹1,820.",
      forecastPoints: [
        { day: "Day -3", historical: 1740, predicted: 1740, upperBand: 1755, lowerBand: 1725 },
        { day: "Day -2", historical: 1752, predicted: 1752, upperBand: 1770, lowerBand: 1735 },
        { day: "Day -1", historical: 1758, predicted: 1758, upperBand: 1775, lowerBand: 1740 },
        { day: "Today", historical: 1782, predicted: 1782, upperBand: 1800, lowerBand: 1765 },
        { day: "+1 Day", predicted: 1798, upperBand: 1820, lowerBand: 1775 },
        { day: "+2 Days", predicted: 1812, upperBand: 1838, lowerBand: 1785 },
        { day: "+3 Days", predicted: 1825, upperBand: 1855, lowerBand: 1798 },
        { day: "+4 Days", predicted: 1836, upperBand: 1870, lowerBand: 1808 },
        { day: "+5 Days", predicted: 1845, upperBand: 1885, lowerBand: 1815 },
        { day: "+6 Days", predicted: 1854, upperBand: 1898, lowerBand: 1820 },
        { day: "+7 Days", predicted: 1865, upperBand: 1915, lowerBand: 1830 },
      ],
    },
    indicators: {
      rsi: { value: 68.2, status: "Neutral", signal: "Strong buying momentum, room before overbought" },
      macd: { value: "+3.12", status: "Bullish", signal: "Bullish divergence strengthening" },
      movingAverage: { value: "₹1,782", status: "Above MA", signal: "Above 20, 50, and 200-day moving averages" },
      bollingerBands: { status: "Expanding", upper: 1810, lower: 1715, middle: 1762 },
    },
    sentiment: {
      bullish: 70,
      neutral: 20,
      bearish: 10,
      sources: [
        { name: "Technical Indicators", score: 84, sentiment: "Strong Bullish" },
        { name: "Market Momentum", score: 76, sentiment: "Bullish" },
        { name: "Volume Profile", score: 79, sentiment: "High Inflow" },
        { name: "Historical Patterns", score: 71, sentiment: "Bullish" },
      ],
    },
    risk: {
      level: "Medium",
      volatility: "16.1%",
      volatilityScore: 36,
      beta: 1.08,
      drawdown: "-9.8%",
      drawdownScore: 30,
      marketRiskScore: 39,
    },
    insights: [
      {
        category: "Momentum",
        title: "Banking Index Outperformance",
        text: "HDFCBANK leads Bank NIFTY gains with 1.8% intraday rally. Institutional block deals point to persistent foreign portfolio additions.",
        impact: "Positive",
      },
      {
        category: "Volume",
        title: "Above-Average Trading Activity",
        text: "Intraday turnover surged 40% over the 30-day average with massive buy orders at market open.",
        impact: "Positive",
      },
      {
        category: "Volatility",
        title: "Stable Beta Distribution",
        text: "Smooth ascending channel with controlled intraday pullbacks demonstrates healthy trend sustainability.",
        impact: "Positive",
      },
      {
        category: "Trend",
        title: "All-Time High Trajectory",
        text: "Only 2.1% shy of the 52-week peak. Technical breakouts above ₹1,820 often trigger rapid blue-sky extensions.",
        impact: "Positive",
      },
    ],
    history: generateHistory(1782.40, 0.014),
  },

  AAPL: {
    symbol: "AAPL",
    name: "Apple Inc.",
    currency: "$",
    price: 228.40,
    change: 3.25,
    changePercent: 1.45,
    marketCap: "$3.48T",
    volume: "48,210,400",
    high52W: 237.23,
    low52W: 164.08,
    openPrice: 225.80,
    prevClose: 225.15,
    peRatio: 34.2,
    aiPrediction: {
      trend: "BULLISH",
      confidence: 89.2,
      horizon: "Next 7 Days",
      expectedMovement: "+2.8% to +4.6%",
      riskLevel: "Low",
      modelName: "AlphaLSTM-v4 Multi-Head Transformer",
      summary: "Apple Intelligence rollout demand and aggressive buyback activity create massive upside momentum. Forecast targets $236.",
      forecastPoints: [
        { day: "Day -3", historical: 222, predicted: 222, upperBand: 225, lowerBand: 219 },
        { day: "Day -2", historical: 224, predicted: 224, upperBand: 227, lowerBand: 221 },
        { day: "Day -1", historical: 226, predicted: 226, upperBand: 229, lowerBand: 223 },
        { day: "Today", historical: 228.4, predicted: 228.4, upperBand: 231, lowerBand: 226 },
        { day: "+1 Day", predicted: 230.5, upperBand: 233.5, lowerBand: 227.5 },
        { day: "+2 Days", predicted: 232.4, upperBand: 236, lowerBand: 229 },
        { day: "+3 Days", predicted: 234.1, upperBand: 238.5, lowerBand: 230.5 },
        { day: "+4 Days", predicted: 235.8, upperBand: 241, lowerBand: 232 },
        { day: "+5 Days", predicted: 237.2, upperBand: 243.5, lowerBand: 233 },
        { day: "+6 Days", predicted: 238.6, upperBand: 245.5, lowerBand: 234 },
        { day: "+7 Days", predicted: 240.2, upperBand: 248, lowerBand: 235.5 },
      ],
    },
    indicators: {
      rsi: { value: 66.4, status: "Neutral", signal: "Strong bullish trend, no divergence" },
      macd: { value: "+1.92", status: "Bullish", signal: "MACD line pulling away from signal line" },
      movingAverage: { value: "$228.40", status: "Above MA", signal: "Clear separation above 20 & 50-day SMA" },
      bollingerBands: { status: "Normal Volatility", upper: 233.5, lower: 219.0, middle: 226.25 },
    },
    sentiment: {
      bullish: 74,
      neutral: 18,
      bearish: 8,
      sources: [
        { name: "Technical Indicators", score: 86, sentiment: "Strong Bullish" },
        { name: "Market Momentum", score: 80, sentiment: "Bullish" },
        { name: "Volume Profile", score: 75, sentiment: "Solid Inflow" },
        { name: "Historical Patterns", score: 78, sentiment: "Bullish" },
      ],
    },
    risk: {
      level: "Low",
      volatility: "17.2%",
      volatilityScore: 32,
      beta: 0.94,
      drawdown: "-10.1%",
      drawdownScore: 29,
      marketRiskScore: 34,
    },
    insights: [
      {
        category: "Momentum",
        title: "Apple Intelligence Supercycle",
        text: "Consumer upgrade cycle signals and software services ecosystem growth maintain robust momentum.",
        impact: "Positive",
      },
      {
        category: "Volume",
        title: "Institutional Rebalancing",
        text: "Large-cap tech inflows remain heavily weighted toward AAPL, supporting strong price floors.",
        impact: "Positive",
      },
      {
        category: "Volatility",
        title: "Low Beta Tech Anchor",
        text: "At 0.94 beta, Apple serves as an anchor asset for institutional equity portfolios.",
        impact: "Positive",
      },
      {
        category: "Trend",
        title: "52-Week High Testing",
        text: "Approaching $237.23 record high with robust breadth and absence of distribution flags.",
        impact: "Positive",
      },
    ],
    history: generateHistory(228.40, 0.015),
  },

  MSFT: {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    currency: "$",
    price: 432.80,
    change: 3.95,
    changePercent: 0.92,
    marketCap: "$3.21T",
    volume: "21,650,200",
    high52W: 468.35,
    low52W: 309.45,
    openPrice: 429.50,
    prevClose: 428.85,
    peRatio: 36.1,
    aiPrediction: {
      trend: "BULLISH",
      confidence: 85.0,
      horizon: "Next 7 Days",
      expectedMovement: "+2.0% to +3.8%",
      riskLevel: "Low",
      modelName: "AlphaLSTM-v4 Multi-Head Transformer",
      summary: "Azure cloud growth acceleration and enterprise Copilot monetization underpin steady institutional bid.",
      forecastPoints: [
        { day: "Day -3", historical: 424, predicted: 424, upperBand: 428, lowerBand: 420 },
        { day: "Day -2", historical: 426, predicted: 426, upperBand: 431, lowerBand: 422 },
        { day: "Day -1", historical: 429, predicted: 429, upperBand: 434, lowerBand: 425 },
        { day: "Today", historical: 432.8, predicted: 432.8, upperBand: 438, lowerBand: 428 },
        { day: "+1 Day", predicted: 435.5, upperBand: 441, lowerBand: 430 },
        { day: "+2 Days", predicted: 438.2, upperBand: 445, lowerBand: 432 },
        { day: "+3 Days", predicted: 441.0, upperBand: 449, lowerBand: 434 },
        { day: "+4 Days", predicted: 443.5, upperBand: 452, lowerBand: 436 },
        { day: "+5 Days", predicted: 446.0, upperBand: 456, lowerBand: 438 },
        { day: "+6 Days", predicted: 448.5, upperBand: 460, lowerBand: 439 },
        { day: "+7 Days", predicted: 451.0, upperBand: 463, lowerBand: 441 },
      ],
    },
    indicators: {
      rsi: { value: 61.5, status: "Neutral", signal: "Steady uptrend with no exhaustion signs" },
      macd: { value: "+1.65", status: "Bullish", signal: "MACD histogram expanding" },
      movingAverage: { value: "$432.80", status: "Above MA", signal: "Safely above 20 and 50-day moving averages" },
      bollingerBands: { status: "Normal Volatility", upper: 442, lower: 421, middle: 431.5 },
    },
    sentiment: {
      bullish: 68,
      neutral: 24,
      bearish: 8,
      sources: [
        { name: "Technical Indicators", score: 81, sentiment: "Bullish" },
        { name: "Market Momentum", score: 74, sentiment: "Bullish" },
        { name: "Volume Profile", score: 70, sentiment: "Steady" },
        { name: "Historical Patterns", score: 75, sentiment: "Bullish" },
      ],
    },
    risk: {
      level: "Low",
      volatility: "16.8%",
      volatilityScore: 31,
      beta: 0.91,
      drawdown: "-11.4%",
      drawdownScore: 32,
      marketRiskScore: 35,
    },
    insights: [
      {
        category: "Momentum",
        title: "Cloud & AI Synergies",
        text: "Azure capacity expansion and Copilot seat adoption support valuation multiple expansion.",
        impact: "Positive",
      },
      {
        category: "Volume",
        title: "Consistent Institutional Flow",
        text: "Dark pool activity signals gradual accumulation ahead of enterprise conference updates.",
        impact: "Positive",
      },
      {
        category: "Volatility",
        title: "Managed Variance",
        text: "Implied volatility in options chain is low, pointing to calm market expectations.",
        impact: "Positive",
      },
      {
        category: "Trend",
        title: "Breakout Confirmation",
        text: "Recent gap fill at $428 holds firmly as support for the current leg up.",
        impact: "Positive",
      },
    ],
    history: generateHistory(432.80, 0.014),
  },

  NVDA: {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    currency: "$",
    price: 128.90,
    change: 4.78,
    changePercent: 3.85,
    marketCap: "$3.16T",
    volume: "82,540,100",
    high52W: 140.76,
    low52W: 39.23,
    openPrice: 125.10,
    prevClose: 124.12,
    peRatio: 52.4,
    aiPrediction: {
      trend: "BULLISH",
      confidence: 94.1,
      horizon: "Next 7 Days",
      expectedMovement: "+6.0% to +9.5%",
      riskLevel: "High",
      modelName: "AlphaLSTM-v4 Multi-Head Transformer",
      summary: "Massive Blackwell architecture datacenter orders and GPU compute bottlenecks drive parabolic momentum. Target test of $140 peak.",
      forecastPoints: [
        { day: "Day -3", historical: 120, predicted: 120, upperBand: 124, lowerBand: 116 },
        { day: "Day -2", historical: 122, predicted: 122, upperBand: 127, lowerBand: 118 },
        { day: "Day -1", historical: 124.1, predicted: 124.1, upperBand: 129, lowerBand: 120 },
        { day: "Today", historical: 128.9, predicted: 128.9, upperBand: 135, lowerBand: 124 },
        { day: "+1 Day", predicted: 132.5, upperBand: 139, lowerBand: 127 },
        { day: "+2 Days", predicted: 135.2, upperBand: 143, lowerBand: 129 },
        { day: "+3 Days", predicted: 137.8, upperBand: 147, lowerBand: 130 },
        { day: "+4 Days", predicted: 139.5, upperBand: 150, lowerBand: 131 },
        { day: "+5 Days", predicted: 141.8, upperBand: 153, lowerBand: 132 },
        { day: "+6 Days", predicted: 143.5, upperBand: 156, lowerBand: 133 },
        { day: "+7 Days", predicted: 145.2, upperBand: 159, lowerBand: 134 },
      ],
    },
    indicators: {
      rsi: { value: 72.4, status: "Overbought", signal: "Strong upside velocity, monitor for short-term cooling" },
      macd: { value: "+4.18", status: "Bullish", signal: "Significant bullish histogram expansion" },
      movingAverage: { value: "$128.90", status: "Above MA", signal: "8.2% above 20-day exponential moving average" },
      bollingerBands: { status: "Riding Upper Band", upper: 134.5, lower: 116.2, middle: 125.35 },
    },
    sentiment: {
      bullish: 82,
      neutral: 12,
      bearish: 6,
      sources: [
        { name: "Technical Indicators", score: 92, sentiment: "Extreme Bullish" },
        { name: "Market Momentum", score: 95, sentiment: "Hyper Bullish" },
        { name: "Volume Profile", score: 88, sentiment: "Exceptional Demand" },
        { name: "Historical Patterns", score: 84, sentiment: "Bullish Continuation" },
      ],
    },
    risk: {
      level: "High",
      volatility: "44.6%",
      volatilityScore: 78,
      beta: 2.15,
      drawdown: "-22.5%",
      drawdownScore: 68,
      marketRiskScore: 72,
    },
    insights: [
      {
        category: "Momentum",
        title: "Hyper-Velocity AI Compute Surge",
        text: "NVDA is experiencing extreme volume-backed velocity following supply-chain reports that Blackwell chip capacity is sold out 12 months ahead.",
        impact: "Positive",
      },
      {
        category: "Volume",
        title: "Daily Volume Leader",
        text: "With over $10B in daily dollar-volume, liquidity depth easily absorbs massive institutional transactions.",
        impact: "Positive",
      },
      {
        category: "Volatility",
        title: "Elevated Beta Profile",
        text: "Beta of 2.15 implies high sensitivity to market swings. Traders should size positions according to volatility.",
        impact: "Neutral",
      },
      {
        category: "Trend",
        title: "Breakout Beyond Resistance",
        text: "Decisive breakthrough of $125 resistance opens the path to testing the $140.76 all-time high.",
        impact: "Positive",
      },
    ],
    history: generateHistory(128.90, 0.026),
  },
};

export const INITIAL_WATCHLIST = [
  { symbol: "RELIANCE", name: "Reliance Industries", price: "₹2,845.20", change: "+2.4%", isPositive: true, aiTrend: "Bullish", confidence: 87.4, volume: "7.4M" },
  { symbol: "TCS", name: "Tata Consultancy", price: "₹3,921.50", change: "+1.2%", isPositive: true, aiTrend: "Bullish", confidence: 82.1, volume: "3.2M" },
  { symbol: "INFY", name: "Infosys Ltd", price: "₹1,624.80", change: "-0.8%", isPositive: false, aiTrend: "Neutral", confidence: 71.3, volume: "5.1M" },
  { symbol: "HDFCBANK", name: "HDFC Bank", price: "₹1,782.40", change: "+1.8%", isPositive: true, aiTrend: "Bullish", confidence: 84.6, volume: "8.9M" },
  { symbol: "AAPL", name: "Apple Inc.", price: "$228.40", change: "+1.45%", isPositive: true, aiTrend: "Bullish", confidence: 89.2, volume: "48.2M" },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: "$128.90", change: "+3.85%", isPositive: true, aiTrend: "Bullish", confidence: 94.1, volume: "82.5M" },
];

export const MOCK_NOTIFICATIONS = [
  { id: 1, title: "AI Model Trigger: RELIANCE", text: "Predicted probability of upward continuation updated to 87.4%.", time: "5m ago", type: "ai" },
  { id: 2, title: "Market Volatility Alert", text: "NVDA intraday volume exceeded 150% of the 30-day median.", time: "18m ago", type: "alert" },
  { id: 3, title: "MACD Bullish Cross", text: "HDFCBANK fast line crossed above signal line on the 4H chart.", time: "42m ago", type: "indicator" },
  { id: 4, title: "Weekly Market Insights Ready", text: "Transformer ensemble generated trend projections for 120+ assets.", time: "2h ago", type: "system" },
];
