import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Bar, BarChart, Legend } from "recharts";
import { Activity, BarChart3, BrainCircuit, DollarSign, TrendingUp, Zap, Wallet, LogOut, Download, Settings, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useWallet } from "@/hooks/use-wallet";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function Dashboard() {
  const navigate = useNavigate();
  const { isConnected, address, walletType, disconnect } = useWallet();
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  const marketData = useQuery(api.market.getLatestData, { symbol: "BTC-USD" });
  const currentRegime = useQuery(api.market.getCurrentRegime);
  const recentSignals = useQuery(api.market.getRecentSignals);
  const recentTrades = useQuery(api.market.getRecentTrades);
  const stats = useQuery(api.market.getStats);
  const regimeHistory = useQuery(api.market.getRegimeHistory);
  const portfolioValue = useQuery(api.market.getPortfolioValue);
  const strategyPerformance = useQuery(api.market.getStrategyPerformance);
  
  const tick = useMutation(api.simulation.tick);
  const seed = useMutation(api.simulation.seed);

  useEffect(() => {
    if (!isConnected) {
      navigate("/");
    }
  }, [isConnected, navigate]);

  useEffect(() => {
    seed();
  }, []);

  // Auto-refresh every 5 seconds
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        tick();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, tick]);

  const getRegimeColor = (regime?: string) => {
    switch (regime) {
      case "BULL": return "text-green-500 border-green-500/50 bg-green-500/10";
      case "BEAR": return "text-red-500 border-red-500/50 bg-red-500/10";
      case "VOLATILE": return "text-yellow-500 border-yellow-500/50 bg-yellow-500/10";
      default: return "text-blue-500 border-blue-500/50 bg-blue-500/10";
    }
  };

  const handleExportTrades = () => {
    if (!recentTrades) return;
    
    const csv = [
      ["Time", "Symbol", "Side", "Price", "Amount", "PnL", "Status"],
      ...recentTrades.map(t => [
        format(t.timestamp, "MM/dd/yyyy HH:mm:ss"),
        t.symbol,
        t.side,
        t.price.toFixed(2),
        t.amount,
        t.pnl ? t.pnl.toFixed(2) : "OPEN",
        t.status
      ])
    ].map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `trades_${Date.now()}.csv`;
    a.click();
    toast.success("Trade history exported!");
  };

  if (!isConnected) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
            <BrainCircuit className="h-6 md:h-8 w-6 md:w-8 text-primary" />
            AI Market Regime Switcher
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">Algorithmic Trading System • BTC-USD</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
          <div className="flex items-center gap-2 px-3 py-2 rounded-md border bg-card text-xs md:text-sm">
            <Wallet className="h-4 w-4 text-muted-foreground" />
            <span className="font-mono">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            <Badge variant="outline" className="text-xs">
              {walletType}
            </Badge>
          </div>
          <Button variant="outline" size="sm" onClick={disconnect}>
            <LogOut className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Disconnect</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${autoRefresh ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline">{autoRefresh ? 'Auto' : 'Manual'}</span>
          </Button>
          <Button variant="outline" size="sm" onClick={() => tick()}>
            <Zap className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Tick</span>
          </Button>
          <div className={`px-3 md:px-4 py-2 rounded-md border font-bold text-xs md:text-sm ${getRegimeColor(currentRegime?.regime)}`}>
            {currentRegime?.regime || "DETECTING..."}
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold text-primary">
                ${portfolioValue?.toFixed(2) || "10000.00"}
              </div>
              <p className="text-xs text-muted-foreground">
                Initial: $10,000
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Total PnL</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-xl md:text-2xl font-bold ${stats?.totalPnl && stats.totalPnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                {stats?.totalPnl ? `$${stats.totalPnl.toFixed(2)}` : "$0.00"}
              </div>
              <p className="text-xs text-muted-foreground">
                Realized profit/loss
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Win Rate</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">{stats?.winRate ? `${stats.winRate.toFixed(1)}%` : "0%"}</div>
              <p className="text-xs text-muted-foreground">
                {stats?.totalTrades || 0} total trades
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Current Price</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">
                ${marketData?.[marketData.length - 1]?.price.toFixed(2) || "---"}
              </div>
              <p className="text-xs text-muted-foreground">
                Latest tick
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Chart Area */}
      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle>Market Analysis</CardTitle>
            <CardDescription>
              Real-time price action with regime detection overlays.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] md:h-[350px] w-full">
              {marketData ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[...marketData].reverse()}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={(ts) => format(ts, "HH:mm:ss")}
                      className="text-xs text-muted-foreground"
                    />
                    <YAxis 
                      domain={['auto', 'auto']}
                      className="text-xs text-muted-foreground"
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
                      labelFormatter={(ts) => format(ts, "HH:mm:ss")}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke="var(--primary)" 
                      fillOpacity={1} 
                      fill="url(#colorPrice)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Loading market data...
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Signals */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm md:text-base">Recent Signals</CardTitle>
            <CardDescription className="text-xs">
              AI generated trading signals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[300px] md:max-h-[350px] overflow-y-auto">
              {recentSignals?.map((signal) => (
                <motion.div 
                  key={signal._id} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between border-b pb-2 last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant={signal.type === "BUY" ? "default" : "destructive"} className="text-xs">
                      {signal.type}
                    </Badge>
                    <div className="flex flex-col">
                      <span className="text-xs md:text-sm font-medium">{signal.symbol}</span>
                      <span className="text-xs text-muted-foreground">{format(signal.timestamp, "HH:mm:ss")}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-medium block">{signal.strategy}</span>
                    <span className="text-xs text-muted-foreground">{(signal.confidence * 100).toFixed(0)}%</span>
                  </div>
                </motion.div>
              ))}
              {!recentSignals?.length && (
                <div className="text-sm text-muted-foreground text-center py-4">No signals yet</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategy Performance */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Strategy Performance</CardTitle>
              <CardDescription>
                Comparison of different trading strategies
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            {strategyPerformance ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={strategyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="strategy" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }} />
                  <Legend />
                  <Bar dataKey="count" fill="var(--primary)" name="Signal Count" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Loading strategy data...
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Trades */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <div>
              <CardTitle>Trade Log</CardTitle>
              <CardDescription>
                Executed trades and performance
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleExportTrades}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 overflow-x-auto">
            <div className="grid grid-cols-6 text-xs md:text-sm font-medium text-muted-foreground mb-2 min-w-[600px]">
              <div>Time</div>
              <div>Symbol</div>
              <div>Side</div>
              <div>Price</div>
              <div>Amount</div>
              <div className="text-right">PnL</div>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {recentTrades?.map((trade) => (
                <motion.div 
                  key={trade._id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-6 text-xs md:text-sm items-center border-b py-2 last:border-0 min-w-[600px]"
                >
                  <div>{format(trade.timestamp, "MM/dd HH:mm")}</div>
                  <div className="font-medium">{trade.symbol}</div>
                  <div className={trade.side === "BUY" ? "text-green-500" : "text-red-500"}>
                    {trade.side}
                  </div>
                  <div>${trade.price.toFixed(2)}</div>
                  <div>{trade.amount}</div>
                  <div className={`text-right font-medium ${
                    (trade.pnl || 0) > 0 ? "text-green-500" : (trade.pnl || 0) < 0 ? "text-red-500" : ""
                  }`}>
                    {trade.pnl ? `$${trade.pnl.toFixed(2)}` : "OPEN"}
                  </div>
                </motion.div>
              ))}
            </div>
            {!recentTrades?.length && (
              <div className="text-sm text-muted-foreground text-center py-4">No trades yet</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}