import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Brain, Shield, Zap, Wallet, TrendingUp, Activity, BarChart3, FileText, Lock, Users } from "lucide-react";
import { useNavigate } from "react-router";
import { useWallet } from "@/hooks/use-wallet";
import { useEffect } from "react";

export default function Landing() {
  const navigate = useNavigate();
  const { isConnected, address, connectMetaMask, connectPhantom, disconnect } = useWallet();

  // Auto-navigate to dashboard when wallet connects
  useEffect(() => {
    if (isConnected) {
      navigate("/dashboard");
    }
  }, [isConnected, navigate]);

  const handleGetStarted = () => {
    if (isConnected) {
      navigate("/dashboard");
    } else {
      // Scroll to connect section smoothly
      const connectSection = document.getElementById("connect-section");
      if (connectSection) {
        connectSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="border-b p-4 flex justify-between items-center container mx-auto"
      >
        <div className="flex items-center gap-2 font-bold text-xl cursor-pointer" onClick={() => navigate("/")}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Brain className="h-6 w-6 text-primary" />
          </motion.div>
          <span>RegimeSwitcher.AI</span>
        </div>
        <div className="flex gap-4 items-center">
          {isConnected ? (
            <>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-sm text-muted-foreground hidden md:block"
              >
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </motion.div>
              <Button variant="outline" onClick={disconnect}>
                Disconnect
              </Button>
              <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
            </>
          ) : (
            <Button onClick={handleGetStarted}>Connect Wallet</Button>
          )}
        </div>
      </motion.nav>

      {/* Hero */}
      <main className="flex-1 container mx-auto px-4 py-12 md:py-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl space-y-6"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
          >
            v1.0 Public Beta
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
          >
            Algorithmic Trading Adapted to <motion.span 
              animate={{ 
                color: ["hsl(var(--primary))", "hsl(var(--chart-1))", "hsl(var(--primary))"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-primary"
            >
              Market Regimes
            </motion.span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground"
          >
            Our AI detects whether the market is Bull, Bear, or Sideways and automatically switches strategies to maximize alpha and minimize drawdown.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="gap-2" onClick={() => navigate("/dashboard")}>
                Launch Dashboard
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" onClick={handleGetStarted}>
                {isConnected ? "View Dashboard" : "Connect Wallet"}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Wallet Connect Section */}
        {!isConnected && (
          <motion.div
            id="connect-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 md:mt-16 p-6 md:p-8 rounded-xl border bg-card text-card-foreground shadow-sm max-w-md w-full"
          >
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex justify-center mb-4"
            >
              <Wallet className="h-12 w-12 text-primary" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Connect Your Wallet</h3>
            <p className="text-muted-foreground mb-6">
              Choose your preferred wallet to get started
            </p>
            <div className="space-y-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={connectMetaMask}
                  className="w-full gap-2"
                  variant="outline"
                  size="lg"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" className="h-5 w-5" />
                  Connect MetaMask
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={connectPhantom}
                  className="w-full gap-2"
                  variant="outline"
                  size="lg"
                >
                  <img src="https://phantom.app/img/phantom-logo.svg" alt="Phantom" className="h-5 w-5" />
                  Connect Phantom
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-16 md:mt-24 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm"
          >
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto"
            >
              <Brain className="h-6 w-6 text-primary" />
            </motion.div>
            <h3 className="text-lg font-bold mb-2">Regime Detection</h3>
            <p className="text-muted-foreground text-sm">
              HMM and LSTM models analyze price action to classify market states in real-time.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05, rotate: -1 }}
            className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm"
          >
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto"
            >
              <Zap className="h-6 w-6 text-primary" />
            </motion.div>
            <h3 className="text-lg font-bold mb-2">Dynamic Switching</h3>
            <p className="text-muted-foreground text-sm">
              Automatically rotates between Trend Following, Mean Reversion, and Capital Preservation.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm"
          >
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
              className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto"
            >
              <Shield className="h-6 w-6 text-primary" />
            </motion.div>
            <h3 className="text-lg font-bold mb-2">Risk Management</h3>
            <p className="text-muted-foreground text-sm">
              Built-in volatility scaling and stop-loss mechanisms to protect your portfolio.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05, rotate: -1 }}
            className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto"
            >
              <TrendingUp className="h-6 w-6 text-primary" />
            </motion.div>
            <h3 className="text-lg font-bold mb-2">Real-Time Analytics</h3>
            <p className="text-muted-foreground text-sm">
              Live performance metrics, PnL tracking, and win rate analysis at your fingertips.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm"
          >
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto"
            >
              <Activity className="h-6 w-6 text-primary" />
            </motion.div>
            <h3 className="text-lg font-bold mb-2">Auto-Refresh</h3>
            <p className="text-muted-foreground text-sm">
              Continuous market simulation with automatic data updates every 5 seconds.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05, rotate: -1 }}
            className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm"
          >
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
              className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto"
            >
              <BarChart3 className="h-6 w-6 text-primary" />
            </motion.div>
            <h3 className="text-lg font-bold mb-2">Strategy Comparison</h3>
            <p className="text-muted-foreground text-sm">
              Compare performance across different strategies and optimize your approach.
            </p>
          </motion.div>
        </div>
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/whitepaper")}
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <FileText className="h-4 w-4" />
              Whitepaper
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/privacy")}
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Lock className="h-4 w-4" />
              Privacy Policy
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/about")}
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Users className="h-4 w-4" />
              About Us
            </motion.button>
          </div>
          <p>© 2024 RegimeSwitcher.AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}