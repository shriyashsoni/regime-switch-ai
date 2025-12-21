import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, BarChart2, Brain, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <nav className="border-b p-4 flex justify-between items-center container mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Brain className="h-6 w-6 text-primary" />
          <span>RegimeSwitcher.AI</span>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => navigate("/auth")}>Sign In</Button>
          <Button onClick={() => navigate("/auth")}>Get Started</Button>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl space-y-6"
        >
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
            v1.0 Public Beta
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Algorithmic Trading Adapted to <span className="text-primary">Market Regimes</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Our AI detects whether the market is Bull, Bear, or Sideways and automatically switches strategies to maximize alpha and minimize drawdown.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" className="gap-2" onClick={() => navigate("/dashboard")}>
              Launch Dashboard <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/auth")}>
              Create Account
            </Button>
          </div>
        </motion.div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-24 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm"
          >
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-2">Regime Detection</h3>
            <p className="text-muted-foreground">
              HMM and LSTM models analyze price action to classify market states in real-time.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm"
          >
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-2">Dynamic Switching</h3>
            <p className="text-muted-foreground">
              Automatically rotates between Trend Following, Mean Reversion, and Capital Preservation.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm"
          >
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-2">Risk Management</h3>
            <p className="text-muted-foreground">
              Built-in volatility scaling and stop-loss mechanisms to protect your portfolio.
            </p>
          </motion.div>
        </div>
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p>© 2024 RegimeSwitcher.AI. All rights reserved.</p>
      </footer>
    </div>
  );
}