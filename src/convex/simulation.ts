import { mutation, internalMutation } from "./_generated/server";
import { v } from "convex/values";

// Helper to generate random walk price
function nextPrice(currentPrice: number, volatility: number, trend: number) {
  const change = (Math.random() - 0.5 + trend) * volatility * currentPrice;
  return currentPrice + change;
}

export const tick = mutation({
  args: {},
  handler: async (ctx) => {
    // 1. Get last state or initialize
    const lastData = await ctx.db.query("market_data").order("desc").first();
    const lastRegime = await ctx.db.query("regimes").order("desc").first();
    
    let price = lastData ? lastData.price : 50000; // Start at 50k BTC
    let regime = lastRegime ? lastRegime.regime : "SIDEWAYS";
    let trend = 0;
    let volatility = 0.002; // 0.2% per tick

    // 2. Determine Regime Dynamics (Mock AI)
    // Randomly switch regimes occasionally
    if (Math.random() < 0.05) {
      const regimes = ["BULL", "BEAR", "SIDEWAYS", "VOLATILE"];
      regime = regimes[Math.floor(Math.random() * regimes.length)];
      
      await ctx.db.insert("regimes", {
        timestamp: Date.now(),
        regime,
        confidence: 0.8 + Math.random() * 0.15,
        description: `Market shifted to ${regime} due to simulated volume spike.`,
      });
    }

    // 3. Apply Regime Physics
    switch (regime) {
      case "BULL":
        trend = 0.001; // Upward bias
        volatility = 0.005;
        break;
      case "BEAR":
        trend = -0.001; // Downward bias
        volatility = 0.008;
        break;
      case "VOLATILE":
        trend = 0;
        volatility = 0.02; // High volatility
        break;
      case "SIDEWAYS":
      default:
        trend = 0;
        volatility = 0.002;
        break;
    }

    // 4. Generate new price
    const newPrice = nextPrice(price, volatility, trend);
    const change = ((newPrice - price) / price) * 100;

    await ctx.db.insert("market_data", {
      symbol: "BTC-USD",
      timestamp: Date.now(),
      price: newPrice,
      volume: Math.random() * 1000,
      change,
    });

    // 5. Generate Signals based on Regime
    if (Math.random() < 0.1) {
      let type = "HOLD";
      let strategy = "Wait";
      
      if (regime === "BULL" && change > 0) {
        type = "BUY";
        strategy = "Trend Following";
      } else if (regime === "BEAR" && change < 0) {
        type = "SELL";
        strategy = "Trend Following";
      } else if (regime === "SIDEWAYS") {
        if (change < -0.5) { type = "BUY"; strategy = "Mean Reversion"; }
        if (change > 0.5) { type = "SELL"; strategy = "Mean Reversion"; }
      }

      if (type !== "HOLD") {
        await ctx.db.insert("signals", {
          timestamp: Date.now(),
          symbol: "BTC-USD",
          type,
          strategy,
          confidence: 0.7 + Math.random() * 0.2,
          status: "EXECUTED",
        });

        // Mock Trade Execution
        await ctx.db.insert("trades", {
          timestamp: Date.now(),
          symbol: "BTC-USD",
          side: type,
          price: newPrice,
          amount: 0.1,
          status: "OPEN",
        });
        
        // Close random old trades
        const openTrades = await ctx.db.query("trades")
            .filter(q => q.eq(q.field("status"), "OPEN"))
            .take(1);
            
        if (openTrades.length > 0) {
            const trade = openTrades[0];
            const pnl = type === "SELL" ? (newPrice - trade.price) * trade.amount : (trade.price - newPrice) * trade.amount; // Simple mock pnl logic
            await ctx.db.patch(trade._id, {
                status: "CLOSED",
                pnl: pnl
            });
        }
      }
    }
  },
});

export const seed = mutation({
    args: {},
    handler: async (ctx) => {
        // Clear existing? No, just add initial if empty
        const existing = await ctx.db.query("market_data").first();
        if (!existing) {
            await ctx.db.insert("market_data", {
                symbol: "BTC-USD",
                timestamp: Date.now(),
                price: 50000,
                volume: 100,
                change: 0
            });
            await ctx.db.insert("regimes", {
                timestamp: Date.now(),
                regime: "SIDEWAYS",
                confidence: 0.9,
                description: "Initial state"
            });
        }
    }
})
