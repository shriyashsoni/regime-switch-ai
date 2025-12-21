import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  walletType: "metamask" | "phantom" | null;
}

export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnected: false,
    isConnecting: false,
    walletType: null,
  });

  // Check if wallet is already connected on mount
  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress");
    const savedType = localStorage.getItem("walletType") as "metamask" | "phantom" | null;
    
    if (savedAddress && savedType) {
      setWallet({
        address: savedAddress,
        isConnected: true,
        isConnecting: false,
        walletType: savedType,
      });
    }
  }, []);

  const connectMetaMask = useCallback(async () => {
    if (typeof window.ethereum === "undefined") {
      toast.error("MetaMask is not installed. Please install MetaMask extension.");
      return;
    }

    setWallet(prev => ({ ...prev, isConnecting: true }));

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      }) as string[];

      const address = accounts[0];
      localStorage.setItem("walletAddress", address);
      localStorage.setItem("walletType", "metamask");

      setWallet({
        address,
        isConnected: true,
        isConnecting: false,
        walletType: "metamask",
      });

      toast.success("MetaMask connected successfully!");
    } catch (error) {
      console.error("MetaMask connection error:", error);
      toast.error("Failed to connect MetaMask");
      setWallet(prev => ({ ...prev, isConnecting: false }));
    }
  }, []);

  const connectPhantom = useCallback(async () => {
    if (typeof window.solana === "undefined" || !window.solana.isPhantom) {
      toast.error("Phantom wallet is not installed. Please install Phantom extension.");
      return;
    }

    setWallet(prev => ({ ...prev, isConnecting: true }));

    try {
      const response = await window.solana.connect();
      const address = response.publicKey.toString();

      localStorage.setItem("walletAddress", address);
      localStorage.setItem("walletType", "phantom");

      setWallet({
        address,
        isConnected: true,
        isConnecting: false,
        walletType: "phantom",
      });

      toast.success("Phantom wallet connected successfully!");
    } catch (error) {
      console.error("Phantom connection error:", error);
      toast.error("Failed to connect Phantom wallet");
      setWallet(prev => ({ ...prev, isConnecting: false }));
    }
  }, []);

  const disconnect = useCallback(() => {
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("walletType");
    
    setWallet({
      address: null,
      isConnected: false,
      isConnecting: false,
      walletType: null,
    });

    toast.success("Wallet disconnected");
  }, []);

  return {
    ...wallet,
    connectMetaMask,
    connectPhantom,
    disconnect,
  };
}
