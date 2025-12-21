import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getLatestData = query({
  args: { symbol: v.string() },
  handler: async (ctx, args) => {
    const data = await ctx.db
      .query("market_data")
      .withIndex("by_symbol_time", (q) => q.eq("symbol", args.symbol))
      .order("desc")
      .take(50);
    return data.reverse();
  },
});

export const getCurrentRegime = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("regimes").order("desc").first();
  },
});

export const getRecentSignals = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("signals").order("desc").take(10);
  },
});

export const getRecentTrades = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("trades").order("desc").take(20);
  },
});

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const trades = await ctx.db.query("trades").order("desc").take(100);
    const closedTrades = trades.filter((t) => t.status === "CLOSED" && t.pnl !== undefined);
    
    const totalPnl = closedTrades.reduce((acc, t) => acc + (t.pnl || 0), 0);
    const winningTrades = closedTrades.filter((t) => (t.pnl || 0) > 0);
    const winRate = closedTrades.length > 0 
      ? (winningTrades.length / closedTrades.length) * 100 
      : 0;
    
    // Calculate additional metrics
    const avgWin = winningTrades.length > 0
      ? winningTrades.reduce((acc, t) => acc + (t.pnl || 0), 0) / winningTrades.length
      : 0;
    
    const losingTrades = closedTrades.filter((t) => (t.pnl || 0) < 0);
    const avgLoss = losingTrades.length > 0
      ? losingTrades.reduce((acc, t) => acc + (t.pnl || 0), 0) / losingTrades.length
      : 0;
    
    return {
      totalPnl,
      winRate,
      totalTrades: trades.length,
      activeTrades: trades.filter((t) => t.status === "OPEN").length,
      avgWin,
      avgLoss,
      profitFactor: avgLoss !== 0 ? Math.abs(avgWin / avgLoss) : 0,
    };
  },
});

export const getRegimeHistory = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("regimes").order("desc").take(20);
  },
});

export const getPortfolioValue = query({
  args: {},
  handler: async (ctx) => {
    const trades = await ctx.db.query("trades").order("desc").take(100);
    const closedTrades = trades.filter((t) => t.status === "CLOSED" && t.pnl !== undefined);
    const totalPnl = closedTrades.reduce((acc, t) => acc + (t.pnl || 0), 0);
    
    const initialBalance = 10000; // Starting balance
    return initialBalance + totalPnl;
  },
});

export const getStrategyPerformance = query({
  args: {},
  handler: async (ctx) => {
    const signals = await ctx.db.query("signals").order("desc").take(100);
    
    const strategies = ["Trend Following", "Mean Reversion", "Capital Preservation"];
    const performance = strategies.map(strategy => {
      const strategySignals = signals.filter(s => s.strategy === strategy);
      return {
        strategy,
        count: strategySignals.length,
        avgConfidence: strategySignals.length > 0 
          ? strategySignals.reduce((acc, s) => acc + s.confidence, 0) / strategySignals.length 
          : 0,
      };
    });
    
    return performance;
  },
});