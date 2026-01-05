import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Key, Lock, Shield } from "lucide-react";
import { useWeex } from "@/hooks/use-weex";
import { Badge } from "@/components/ui/badge";

export function WeexSettings() {
  const { credentials, isConnected, isLoading, connect, clearCredentials } = useWeex();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    apiKey: credentials?.apiKey || "",
    secretKey: credentials?.secretKey || "",
    passphrase: credentials?.passphrase || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await connect(formData);
    if (success) {
      setOpen(false);
    }
  };

  const handleDisconnect = () => {
    clearCredentials();
    setFormData({ apiKey: "", secretKey: "", passphrase: "" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="mr-2 h-4 w-4" />
          WEEX API
          {isConnected && <Badge variant="default" className="ml-2">Connected</Badge>}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            WEEX API Configuration
          </DialogTitle>
          <DialogDescription>
            Configure your WEEX API credentials for live trading. Your credentials are stored locally and encrypted.
          </DialogDescription>
        </DialogHeader>
        
        {isConnected ? (
          <div className="space-y-4">
            <div className="p-4 rounded-lg border bg-green-500/10 border-green-500/50">
              <p className="text-sm font-medium text-green-500">✓ Connected to WEEX API</p>
              <p className="text-xs text-muted-foreground mt-1">
                API Key: {credentials?.apiKey.slice(0, 15)}...
              </p>
            </div>
            <Button variant="destructive" onClick={handleDisconnect} className="w-full">
              Disconnect API
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                API Key
              </Label>
              <Input
                id="apiKey"
                type="text"
                placeholder="Enter your WEEX API Key"
                value={formData.apiKey}
                onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="secretKey" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Secret Key
              </Label>
              <Input
                id="secretKey"
                type="password"
                placeholder="Enter secret key"
                value={formData.secretKey}
                onChange={(e) => setFormData({ ...formData, secretKey: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="passphrase" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Passphrase
              </Label>
              <Input
                id="passphrase"
                type="password"
                placeholder="Enter passphrase"
                value={formData.passphrase}
                onChange={(e) => setFormData({ ...formData, passphrase: e.target.value })}
                required
              />
            </div>
            
            <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/50 text-xs">
              <p className="font-medium mb-1 text-yellow-500">⚠️ Troubleshooting:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Verify API credentials are correct</li>
                <li>Ensure API key has trading permissions enabled</li>
                <li>Check that your IP is whitelisted (if required)</li>
                <li>Confirm passphrase matches the one set during API key creation</li>
              </ul>
            </div>
            
            <div className="p-3 rounded-lg bg-muted text-xs text-muted-foreground">
              <p className="font-medium mb-1">Security Note:</p>
              <p>Your API credentials are stored locally in your browser and never sent to our servers. They are only used to communicate directly with WEEX API.</p>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Connecting..." : "Connect to WEEX"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}