"use node";
import { action } from "./_generated/server";
import { v } from "convex/values";
import crypto from "crypto";

// WEEX API Configuration - Updated to correct base URL from documentation
const WEEX_BASE_URL = "https://api.weex.com";

// Hardcoded WEEX credentials for demo/testing
const DEFAULT_WEEX_CONFIG = {
  apiKey: "d4a8ca2488mshc4a0c5f5d9c9e37p176479jsn90e4e0e0a0a0",
  secretKey: "shpat_d4a8ca2488mshc4a0c5f5d9c9e37p176479jsn90e4e0e0a0a0",
  passphrase: "Shriyash@2005",
};

interface WeexConfig {
  apiKey: string;
  secretKey: string;
  passphrase: string;
}

// Generate HMAC signature for WEEX API according to official docs
function generateSignature(
  timestamp: string,
  method: string,
  requestPath: string,
  body: string,
  secretKey: string
): string {
  // Format: timestamp + method + requestPath + body
  const message = timestamp + method + requestPath + body;
  return crypto.createHmac("sha256", secretKey).update(message).digest("base64");
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
    "ACCESS-KEY": config.apiKey,
    "ACCESS-SIGN": signature,
    "ACCESS-TIMESTAMP": timestamp,
    "ACCESS-PASSPHRASE": config.passphrase,
  };

  const url = `${WEEX_BASE_URL}${path}`;
  const options: RequestInit = {
    method,
    headers,
  };

  if (method !== "GET" && bodyString) {
    options.body = bodyString;
  }

  console.log("WEEX Request:", { 
    url, 
    method, 
    timestamp,
    headers: { 
      ...headers, 
      "ACCESS-SIGN": "***", 
      "ACCESS-KEY": config.apiKey.slice(0, 10) + "...",
      "ACCESS-PASSPHRASE": "***"
    } 
  });

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    console.log("WEEX Response:", { status: response.status, data });
    
    if (!response.ok || (data.code && data.code !== "00000")) {
      throw new Error(`WEEX API Error: ${data.msg || data.message || JSON.stringify(data)}`);
    }
    
    return data;
  } catch (error) {
    console.error("WEEX Request Failed:", error);
    throw error;
  }
}

// Test connection - using account balance endpoint (uses default credentials if not provided)
export const testConnection = action({
  args: {
    apiKey: v.optional(v.string()),
    secretKey: v.optional(v.string()),
    passphrase: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      const config: WeexConfig = {
        apiKey: args.apiKey || DEFAULT_WEEX_CONFIG.apiKey,
        secretKey: args.secretKey || DEFAULT_WEEX_CONFIG.secretKey,
        passphrase: args.passphrase || DEFAULT_WEEX_CONFIG.passphrase,
      };
      
      // Test with balance endpoint as per documentation
      const result = await weexRequest(config, "GET", "/api/v1/account/balance");
      return { 
        success: true, 
        message: "Connection successful! API credentials verified.", 
        data: result 
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("WEEX Connection Test Failed:", errorMessage);
      return { 
        success: false, 
        message: `Connection failed: ${errorMessage}. Please verify: 1) API credentials are correct, 2) IP is whitelisted, 3) API key has required permissions, 4) KYC is completed.` 
      };
    }
  },
});

// Get account balance (uses default credentials if not provided)
export const getBalance = action({
  args: {
    apiKey: v.optional(v.string()),
    secretKey: v.optional(v.string()),
    passphrase: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const config: WeexConfig = {
      apiKey: args.apiKey || DEFAULT_WEEX_CONFIG.apiKey,
      secretKey: args.secretKey || DEFAULT_WEEX_CONFIG.secretKey,
      passphrase: args.passphrase || DEFAULT_WEEX_CONFIG.passphrase,
    };
    
    return await weexRequest(config, "GET", "/api/v1/account/balance");
  },
});

// Get asset price (ticker) (uses default credentials if not provided)
export const getPrice = action({
  args: {
    symbol: v.string(),
    apiKey: v.optional(v.string()),
    secretKey: v.optional(v.string()),
    passphrase: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const config: WeexConfig = {
      apiKey: args.apiKey || DEFAULT_WEEX_CONFIG.apiKey,
      secretKey: args.secretKey || DEFAULT_WEEX_CONFIG.secretKey,
      passphrase: args.passphrase || DEFAULT_WEEX_CONFIG.passphrase,
    };
    
    // Using query parameter format from documentation
    return await weexRequest(config, "GET", `/api/v1/market/ticker?symbol=${args.symbol}`);
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