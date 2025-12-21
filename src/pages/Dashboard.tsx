import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, ArrowDown, ArrowUp, BarChart3, BrainCircuit, DollarSign, TrendingUp, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function Dashboard() {
  const marketData = useQuery(api.market.getLatestData, { symbol: "BTC-USD" });
  const currentRegime = useQuery(api.market.getCurrentRegime);
  const recentSignals = useQuery(api.market.getRecentSignals);
  const recentTrades = useQuery(api.market.getRecentTrades);
  const stats = useQuery(api.market.getStats);
  
  const tick = useMutation(api.simulation.tick);
  const seed = useMutation(api.simulation.seed);

  useEffect(() => {
    // Ensure we have initial data
    seed();
  }, []);

  const getRegimeColor = (regime?: string) => {
    switch (regime) {
      case "BULL": return "text-green-500 border-green-500/50 bg-green-500/10";
      case "BEAR": return "text-red-500 border-red-500/50 bg-red-500/10";
      case "VOLATILE": return "text-yellow-500 border-yellow-500/50 bg-yellow-500/10";
      default: return "text-blue-500 border-blue-500/50 bg-blue-500/10";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <BrainCircuit className="h-8 w-8 text-primary" />
            AI Market Regime Switcher
          </h1>
          <p className="text-muted-foreground">Algorithmic Trading System • BTC-USD</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => tick()}>
            <Zap className="mr-2 h-4 w-4" />
            Simulate Tick
          </Button>
          <div className={`px-4 py-2 rounded-md border font-bold ${getRegimeColor(currentRegime?.regime)}`}>
            {currentRegime?.regime || "DETECTING..."}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total PnL</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stats?.totalPnl && stats.totalPnl >= 0 ? "text-green-500" : "text-red-500"}`}>
              {stats?.totalPnl ? `$${stats.totalPnl.toFixed(2)}` : "$0.00"}
            </div>
            <p className="text-xs text-muted-foreground">
              Realized profit/loss
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.winRate ? `${stats.winRate.toFixed(1)}%` : "0%"}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.totalTrades || 0} total trades
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Price</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${marketData?.[marketData.length - 1]?.price.toFixed(2) || "---"}
            </div>
            <p className="text-xs text-muted-foreground">
              Latest tick
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Strategy</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate text-sm">
              {currentRegime?.regime === "BULL" || currentRegime?.regime === "BEAR" ? "Trend Following" : 
               currentRegime?.regime === "SIDEWAYS" ? "Mean Reversion" : "Capital Preservation"}
            </div>
            <p className="text-xs text-muted-foreground">
              Based on regime
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Chart Area */}
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4 md:col-span-5">
          <CardHeader>
            <CardTitle>Market Analysis</CardTitle>
            <CardDescription>
              Real-time price action with regime detection overlays.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[350px] w-full">
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
        <Card className="col-span-3 md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Signals</CardTitle>
            <CardDescription>
              AI generated trading signals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSignals?.map((signal) => (
                <div key={signal._id} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div className="flex items-center gap-2">
                    <Badge variant={signal.type === "BUY" ? "default" : "destructive"}>
                      {signal.type}
                    </Badge>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{signal.symbol}</span>
                      <span className="text-xs text-muted-foreground">{format(signal.timestamp, "HH:mm:ss")}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-medium block">{signal.strategy}</span>
                    <span className="text-xs text-muted-foreground">{(signal.confidence * 100).toFixed(0)}% Conf.</span>
                  </div>
                </div>
              ))}
              {!recentSignals?.length && (
                <div className="text-sm text-muted-foreground text-center py-4">No signals yet</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Trades */}
      <Card>
        <CardHeader>
          <CardTitle>Trade Log</CardTitle>
          <CardDescription>
            Executed trades and performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-6 text-sm font-medium text-muted-foreground mb-2">
              <div>Time</div>
              <div>Symbol</div>
              <div>Side</div>
              <div>Price</div>
              <div>Amount</div>
              <div className="text-right">PnL</div>
            </div>
            {recentTrades?.map((trade) => (
              <div key={trade._id} className="grid grid-cols-6 text-sm items-center border-b py-2 last:border-0">
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
              </div>
            ))}
             {!recentTrades?.length && (
                <div className="text-sm text-muted-foreground text-center py-4">No trades yet</div>
              )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
