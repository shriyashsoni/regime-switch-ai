import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useCallback } from "react";
import { toast } from "sonner";

interface WeexCredentials {
  apiKey: string;
  secretKey: string;
  passphrase: string;
}

export function useWeex() {
  const [credentials, setCredentials] = useState<WeexCredentials | null>(() => {
    const stored = localStorage.getItem("weexCredentials");
    return stored ? JSON.parse(stored) : null;
  });
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = useAction(api.weex.testConnection);
  const getBalanceAction = useAction(api.weex.getBalance);
  const getPriceAction = useAction(api.weex.getPrice);
  const placeOrderAction = useAction(api.weex.placeOrder);
  const getOpenOrdersAction = useAction(api.weex.getOpenOrders);
  const getOrderHistoryAction = useAction(api.weex.getOrderHistory);
  const setLeverageAction = useAction(api.weex.setLeverage);

  const saveCredentials = useCallback((creds: WeexCredentials) => {
    localStorage.setItem("weexCredentials", JSON.stringify(creds));
    setCredentials(creds);
  }, []);

  const clearCredentials = useCallback(() => {
    localStorage.removeItem("weexCredentials");
    setCredentials(null);
    setIsConnected(false);
  }, []);

  const connect = useCallback(async (creds: WeexCredentials) => {
    setIsLoading(true);
    try {
      const result = await testConnection(creds);
      if (result.success) {
        saveCredentials(creds);
        setIsConnected(true);
        toast.success("WEEX API connected successfully!");
        return true;
      } else {
        toast.error(`Connection failed: ${result.message}`);
        return false;
      }
    } catch (error) {
      toast.error("Failed to connect to WEEX API");
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [testConnection, saveCredentials]);

  const getBalance = useCallback(async () => {
    if (!credentials) {
      toast.error("No WEEX credentials configured");
      return null;
    }
    try {
      return await getBalanceAction(credentials);
    } catch (error) {
      toast.error("Failed to fetch balance");
      console.error(error);
      return null;
    }
  }, [credentials, getBalanceAction]);

  const getPrice = useCallback(async (symbol: string) => {
    if (!credentials) {
      toast.error("No WEEX credentials configured");
      return null;
    }
    try {
      return await getPriceAction({ ...credentials, symbol });
    } catch (error) {
      toast.error("Failed to fetch price");
      console.error(error);
      return null;
    }
  }, [credentials, getPriceAction]);

  const placeOrder = useCallback(async (
    symbol: string,
    side: string,
    type: string,
    quantity: number,
    price?: number
  ) => {
    if (!credentials) {
      toast.error("No WEEX credentials configured");
      return null;
    }
    try {
      const result = await placeOrderAction({
        ...credentials,
        symbol,
        side,
        type,
        quantity,
        price,
      });
      toast.success(`Order placed: ${side} ${quantity} ${symbol}`);
      return result;
    } catch (error) {
      toast.error("Failed to place order");
      console.error(error);
      return null;
    }
  }, [credentials, placeOrderAction]);

  const getOpenOrders = useCallback(async (symbol?: string) => {
    if (!credentials) return null;
    try {
      return await getOpenOrdersAction({ ...credentials, symbol });
    } catch (error) {
      console.error(error);
      return null;
    }
  }, [credentials, getOpenOrdersAction]);

  const getOrderHistory = useCallback(async (symbol?: string, limit?: number) => {
    if (!credentials) return null;
    try {
      return await getOrderHistoryAction({ ...credentials, symbol, limit });
    } catch (error) {
      console.error(error);
      return null;
    }
  }, [credentials, getOrderHistoryAction]);

  const setLeverage = useCallback(async (symbol: string, leverage: number) => {
    if (!credentials) {
      toast.error("No WEEX credentials configured");
      return null;
    }
    try {
      const result = await setLeverageAction({ ...credentials, symbol, leverage });
      toast.success(`Leverage set to ${leverage}x for ${symbol}`);
      return result;
    } catch (error) {
      toast.error("Failed to set leverage");
      console.error(error);
      return null;
    }
  }, [credentials, setLeverageAction]);

  return {
    credentials,
    isConnected,
    isLoading,
    connect,
    clearCredentials,
    getBalance,
    getPrice,
    placeOrder,
    getOpenOrders,
    getOrderHistory,
    setLeverage,
  };
}