import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Loader2, ArrowLeftRight, Key, Activity, Zap, Plus, BookOpen, Code, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [shifts, setShifts] = useState<any[]>([]);
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalCalls: 0,
    successfulCalls: 0,
    failedCalls: 0,
  });
  const [showConverter, setShowConverter] = useState(false);
  const [converting, setConverting] = useState(false);
  
  const [fromCurrency, setFromCurrency] = useState("BTC");
  const [toCurrency, setToCurrency] = useState("ETH");
  const [amount, setAmount] = useState("0.001");
  const [settleAddress, setSettleAddress] = useState("");

  const currencies = ["BTC", "ETH", "SOL", "MATIC", "BNB", "USDC", "USDT"];

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    await Promise.all([loadShifts(), loadApiKeys()]);
    setLoading(false);
  };

  const loadShifts = async () => {
    const { data, error } = await supabase
      .from("shifts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      toast.error("Failed to load conversions");
      return;
    }
    setShifts(data || []);
  };

  const loadApiKeys = async () => {
    const { data, error } = await supabase
      .from("api_keys")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return;
    
    setApiKeys(data || []);
    
    // Calculate total stats from all API keys
    const totalCalls = data?.reduce((acc, key) => acc + key.total_calls, 0) || 0;
    const successfulCalls = data?.reduce((acc, key) => acc + key.successful_calls, 0) || 0;
    const failedCalls = data?.reduce((acc, key) => acc + key.failed_calls, 0) || 0;
    
    setStats({ totalCalls, successfulCalls, failedCalls });
  };

  const handleConvert = async () => {
    if (!settleAddress) {
      toast.error("Please enter a settlement address");
      return;
    }

    setConverting(true);
    try {
      const { data, error } = await supabase.functions.invoke("sideshift-convert", {
        body: {
          fromCurrency,
          toCurrency,
          amount: parseFloat(amount),
          settleAddress,
        },
      });

      if (error) throw error;
      
      toast.success("Conversion initiated successfully!");
      await loadShifts();
      setSettleAddress("");
      setShowConverter(false);
    } catch (error: any) {
      toast.error(error.message || "Conversion failed");
    } finally {
      setConverting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl font-black mb-2">Dashboard</h1>
          <p className="text-muted-foreground mb-8">Manage your API keys and conversions</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* API Keys Overview */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Key className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold">API Keys</h2>
              </div>
              <div className="space-y-3">
                {apiKeys.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground mb-3">No API keys yet</p>
                    <Button onClick={() => navigate("/api-keys")} size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Key
                    </Button>
                  </div>
                ) : (
                  <>
                    {apiKeys.slice(0, 3).map((key) => (
                      <div key={key.id} className="p-3 bg-secondary/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-bold text-sm">{key.key_name}</p>
                          <Badge variant={key.status === "active" ? "default" : "destructive"}>
                            {key.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {key.total_calls} calls • {key.free_tier_calls_remaining} free remaining
                        </p>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate("/api-keys")}
                    >
                      Manage All Keys
                    </Button>
                  </>
                )}
              </div>
            </Card>

            {/* Usage Stats */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="h-6 w-6 text-green-600" />
                <h2 className="text-xl font-bold">Usage Stats</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total API Calls</p>
                  <p className="text-3xl font-black">{stats.totalCalls}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-3xl font-black text-green-600">
                    {stats.totalCalls > 0 
                      ? ((stats.successfulCalls / stats.totalCalls) * 100).toFixed(1)
                      : 0}%
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/monitoring")}
                >
                  View Detailed Monitoring
                </Button>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-6 w-6 text-yellow-600" />
                <h2 className="text-xl font-bold">Quick Actions</h2>
              </div>
              <div className="space-y-3">
                <Button 
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => navigate("/api-keys")}
                >
                  <Key className="mr-2 h-4 w-4" />
                  Create API Key
                </Button>
                <Button 
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => navigate("/docs")}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Documentation
                </Button>
                <Button 
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => navigate("/developer")}
                >
                  <Code className="mr-2 h-4 w-4" />
                  AI Developer Tools
                </Button>
                <Button 
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => {
                    setShowConverter(!showConverter);
                  }}
                >
                  <ArrowLeftRight className="mr-2 h-4 w-4" />
                  Test Conversion
                </Button>
              </div>
            </Card>
          </div>

          {/* Crypto Converter - Collapsible */}
          {showConverter && (
            <Card className="p-6 mb-6">
              <h2 className="text-2xl font-bold mb-6">Crypto Converter</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">From</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      step="0.001"
                      className="flex-1"
                    />
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger className="w-[110px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((curr) => (
                          <SelectItem key={curr} value={curr}>{curr}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">To</label>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((curr) => (
                        <SelectItem key={curr} value={curr}>{curr}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-2 block">Settlement Address</label>
                  <Input
                    type="text"
                    value={settleAddress}
                    onChange={(e) => setSettleAddress(e.target.value)}
                    placeholder={`Your ${toCurrency} address`}
                  />
                </div>

                <div className="md:col-span-2">
                  <Button 
                    onClick={handleConvert}
                    disabled={converting}
                    className="w-full"
                  >
                    {converting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Converting...
                      </>
                    ) : (
                      <>
                        Convert <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Conversion History */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Recent Conversions</h2>
            {shifts.length === 0 ? (
              <div className="text-center py-12">
                <ArrowLeftRight className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No Conversions Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by testing a crypto conversion
                </p>
                <Button onClick={() => setShowConverter(true)}>
                  Try a Conversion
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {shifts.map((shift) => (
                  <div 
                    key={shift.id}
                    className="p-4 border border-border rounded-lg hover:border-primary transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="text-sm">
                          <span className="font-bold">{shift.from_amount} {shift.from_currency}</span>
                          <ArrowRight className="inline mx-2 h-4 w-4" />
                          <span className="font-bold">{shift.to_amount} {shift.to_currency}</span>
                        </div>
                      </div>
                      <Badge variant={
                        shift.status === "completed" ? "default" :
                        shift.status === "pending" ? "secondary" : "destructive"
                      }>
                        {shift.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(shift.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
