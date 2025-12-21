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
    const winRate = closedTrades.length > 0 
      ? (closedTrades.filter((t) => (t.pnl || 0) > 0).length / closedTrades.length) * 100 
      : 0;
    
    return {
      totalPnl,
      winRate,
      totalTrades: trades.length,
      activeTrades: trades.filter((t) => t.status === "OPEN").length,
    };
  },
});
