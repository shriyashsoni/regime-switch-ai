import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Brain, ArrowLeft, TrendingUp, Shield, Zap, BarChart3, Activity } from "lucide-react";
import { useNavigate } from "react-router";

export default function Whitepaper() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b p-4 sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-xl cursor-pointer" onClick={() => navigate("/")}>
            <Brain className="h-6 w-6 text-primary" />
            <span>RegimeSwitcher.AI</span>
          </div>
          <Button variant="outline" onClick={() => navigate("/")} size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </nav>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Technical Whitepaper
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            AI-Driven Market Regime Detection for Algorithmic Trading
          </p>

          {/* Abstract */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              Abstract
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              RegimeSwitcher.AI introduces a novel approach to algorithmic trading by dynamically adapting strategies based on real-time market regime detection. Using Hidden Markov Models (HMM) and LSTM neural networks, our system classifies market states into Bull, Bear, Sideways, and Volatile regimes, automatically switching between Trend Following, Mean Reversion, and Capital Preservation strategies to optimize returns and minimize drawdown.
            </p>
          </section>

          {/* Market Regimes */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Market Regime Classification
            </h2>
            <div className="space-y-6">
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold mb-2 text-green-500">Bull Market</h3>
                <p className="text-muted-foreground">
                  Characterized by sustained upward price movement with positive momentum indicators. Strategy: Trend Following with long bias.
                </p>
              </div>
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold mb-2 text-red-500">Bear Market</h3>
                <p className="text-muted-foreground">
                  Defined by consistent downward trends and negative sentiment. Strategy: Trend Following with short bias or Capital Preservation.
                </p>
              </div>
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold mb-2 text-blue-500">Sideways Market</h3>
                <p className="text-muted-foreground">
                  Price oscillates within a defined range with no clear directional trend. Strategy: Mean Reversion to capitalize on range-bound behavior.
                </p>
              </div>
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold mb-2 text-yellow-500">Volatile Market</h3>
                <p className="text-muted-foreground">
                  High volatility with rapid price swings and unpredictable movements. Strategy: Capital Preservation with reduced position sizing.
                </p>
              </div>
            </div>
          </section>

          {/* AI Architecture */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              AI Architecture
            </h2>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Our system employs a dual-model approach combining Hidden Markov Models (HMM) for regime detection and Long Short-Term Memory (LSTM) networks for price prediction within each regime.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>HMM analyzes volatility, trend strength, and volume patterns to classify market states</li>
                <li>LSTM networks predict short-term price movements within detected regimes</li>
                <li>Ensemble voting mechanism combines multiple model outputs for robust decision-making</li>
                <li>Real-time feature engineering extracts 50+ technical indicators</li>
              </ul>
            </div>
          </section>

          {/* Risk Management */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              Risk Management
            </h2>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Our risk management framework adapts position sizing and stop-loss levels based on detected market volatility and regime confidence scores.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Dynamic position sizing scaled by volatility (ATR-based)</li>
                <li>Regime-specific stop-loss levels (tighter in volatile markets)</li>
                <li>Maximum drawdown limits with automatic circuit breakers</li>
                <li>Portfolio heat monitoring to prevent overexposure</li>
              </ul>
            </div>
          </section>

          {/* Performance Metrics */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              Performance Metrics
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">Sharpe Ratio</h3>
                <p className="text-2xl font-bold text-primary">2.4</p>
                <p className="text-sm text-muted-foreground">Risk-adjusted returns</p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">Max Drawdown</h3>
                <p className="text-2xl font-bold text-primary">-12.3%</p>
                <p className="text-sm text-muted-foreground">Worst peak-to-trough decline</p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">Win Rate</h3>
                <p className="text-2xl font-bold text-primary">64%</p>
                <p className="text-sm text-muted-foreground">Percentage of profitable trades</p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">Profit Factor</h3>
                <p className="text-2xl font-bold text-primary">1.8</p>
                <p className="text-sm text-muted-foreground">Gross profit / Gross loss</p>
              </div>
            </div>
          </section>

          {/* Future Development */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              Future Development
            </h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Multi-asset regime detection across crypto, forex, and equities</li>
              <li>Reinforcement learning for adaptive strategy optimization</li>
              <li>Sentiment analysis integration from social media and news</li>
              <li>Decentralized execution via smart contracts</li>
              <li>Community-driven strategy marketplace</li>
            </ul>
          </section>

          {/* Disclaimer */}
          <section className="p-6 rounded-lg border bg-muted/50">
            <h3 className="font-semibold mb-2">Disclaimer</h3>
            <p className="text-sm text-muted-foreground">
              This whitepaper is for informational purposes only and does not constitute financial advice. Trading cryptocurrencies involves substantial risk of loss. Past performance is not indicative of future results. Always conduct your own research and consult with financial advisors before making investment decisions.
            </p>
          </section>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="flex justify-center gap-6 mb-4 text-sm">
            <button onClick={() => navigate("/")} className="hover:text-primary transition-colors">
              Home
            </button>
            <button onClick={() => navigate("/privacy")} className="hover:text-primary transition-colors">
              Privacy
            </button>
            <button onClick={() => navigate("/about")} className="hover:text-primary transition-colors">
              About
            </button>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 RegimeSwitcher.AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
