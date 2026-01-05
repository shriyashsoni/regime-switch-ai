"use node";
import { action } from "./_generated/server";
import { v } from "convex/values";
import crypto from "crypto";

// WEEX API Configuration
const WEEX_BASE_URL = "https://api.weex.com";

interface WeexConfig {
  apiKey: string;
  secretKey: string;
  passphrase: string;
}

// Generate HMAC signature for WEEX API
function generateSignature(
  timestamp: string,
  method: string,
  path: string,
  body: string,
  secretKey: string
): string {
  const message = timestamp + method + path + body;
  return crypto.createHmac("sha256", secretKey).update(message).digest("hex");
}

// Make authenticated request to WEEX API
async function weexRequest(
  config: WeexConfig,
  method: string,
  path: string,
  body: Record<string, any> = {}
) {
  const timestamp = Date.now().toString();
  const bodyString = Object.keys(body).length > 0 ? JSON.stringify(body) : "";
  
  const signature = generateSignature(
    timestamp,
    method,
    path,
    bodyString,
    config.secretKey
  );

  const headers = {
    "Content-Type": "application/json",
    "WEEX-API-KEY": config.apiKey,
    "WEEX-TIMESTAMP": timestamp,
    "WEEX-SIGN": signature,
    "WEEX-PASSPHRASE": config.passphrase,
  };

  const url = `${WEEX_BASE_URL}${path}`;
  const options: RequestInit = {
    method,
    headers,
  };

  if (method !== "GET" && bodyString) {
    options.body = bodyString;
  }

  const response = await fetch(url, options);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(`WEEX API Error: ${JSON.stringify(data)}`);
  }
  
  return data;
}

// Get account balance
export const getBalance = action({
  args: {
    apiKey: v.string(),
    secretKey: v.string(),
    passphrase: v.string(),
  },
  handler: async (ctx, args) => {
    const config: WeexConfig = {
      apiKey: args.apiKey,
      secretKey: args.secretKey,
      passphrase: args.passphrase,
    };
    
    return await weexRequest(config, "GET", "/api/v1/account/balance");
  },
});

// Set leverage
export const setLeverage = action({
  args: {
    apiKey: v.string(),
    secretKey: v.string(),
    passphrase: v.string(),
    symbol: v.string(),
    leverage: v.number(),
  },
  handler: async (ctx, args) => {
    const config: WeexConfig = {
      apiKey: args.apiKey,
      secretKey: args.secretKey,
      passphrase: args.passphrase,
    };
    
    return await weexRequest(config, "POST", "/api/v1/position/leverage", {
      symbol: args.symbol,
      leverage: args.leverage,
    });
  },
});

// Get asset price
export const getPrice = action({
  args: {
    apiKey: v.string(),
    secretKey: v.string(),
    passphrase: v.string(),
    symbol: v.string(),
  },
  handler: async (ctx, args) => {
    const config: WeexConfig = {
      apiKey: args.apiKey,
      secretKey: args.secretKey,
      passphrase: args.passphrase,
    };
    
    return await weexRequest(config, "GET", `/api/v1/market/ticker?symbol=${args.symbol}`);
  },
});

// Place order
export const placeOrder = action({
  args: {
    apiKey: v.string(),
    secretKey: v.string(),
    passphrase: v.string(),
    symbol: v.string(),
    side: v.string(), // "BUY" or "SELL"
    type: v.string(), // "MARKET" or "LIMIT"
    quantity: v.number(),
    price: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const config: WeexConfig = {
      apiKey: args.apiKey,
      secretKey: args.secretKey,
      passphrase: args.passphrase,
    };
    
    const orderData: Record<string, any> = {
      symbol: args.symbol,
      side: args.side,
      type: args.type,
      quantity: args.quantity,
    };
    
    if (args.price) {
      orderData.price = args.price;
    }
    
    return await weexRequest(config, "POST", "/api/v1/order/place", orderData);
  },
});

// Get open orders
export const getOpenOrders = action({
  args: {
    apiKey: v.string(),
    secretKey: v.string(),
    passphrase: v.string(),
    symbol: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const config: WeexConfig = {
      apiKey: args.apiKey,
      secretKey: args.secretKey,
      passphrase: args.passphrase,
    };
    
    const path = args.symbol 
      ? `/api/v1/order/open?symbol=${args.symbol}`
      : "/api/v1/order/open";
    
    return await weexRequest(config, "GET", path);
  },
});

// Get order history
export const getOrderHistory = action({
  args: {
    apiKey: v.string(),
    secretKey: v.string(),
    passphrase: v.string(),
    symbol: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const config: WeexConfig = {
      apiKey: args.apiKey,
      secretKey: args.secretKey,
      passphrase: args.passphrase,
    };
    
    let path = "/api/v1/order/history";
    const params = [];
    
    if (args.symbol) params.push(`symbol=${args.symbol}`);
    if (args.limit) params.push(`limit=${args.limit}`);
    
    if (params.length > 0) {
      path += `?${params.join("&")}`;
    }
    
    return await weexRequest(config, "GET", path);
  },
});

// Get trade details
export const getTradeDetails = action({
  args: {
    apiKey: v.string(),
    secretKey: v.string(),
    passphrase: v.string(),
    orderId: v.string(),
  },
  handler: async (ctx, args) => {
    const config: WeexConfig = {
      apiKey: args.apiKey,
      secretKey: args.secretKey,
      passphrase: args.passphrase,
    };
    
    return await weexRequest(config, "GET", `/api/v1/order/trades?orderId=${args.orderId}`);
  },
});

// Test connection
export const testConnection = action({
  args: {
    apiKey: v.string(),
    secretKey: v.string(),
    passphrase: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const config: WeexConfig = {
        apiKey: args.apiKey,
        secretKey: args.secretKey,
        passphrase: args.passphrase,
      };
      
      const balance = await weexRequest(config, "GET", "/api/v1/account/balance");
      return { success: true, message: "Connection successful", data: balance };
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  },
});
