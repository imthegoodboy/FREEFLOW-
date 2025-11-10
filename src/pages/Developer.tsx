import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Loader2, Sparkles } from "lucide-react";

export default function Developer() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [stats, setStats] = useState({
    totalCalls: 0,
    successfulCalls: 0,
    activeKeys: 0,
  });

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    await loadStats();
    setLoading(false);
  };

  const loadStats = async () => {
    const { data, error } = await supabase
      .from("api_keys")
      .select("*");

    if (error) return;
    
    const totalCalls = data?.reduce((acc, key) => acc + key.total_calls, 0) || 0;
    const successfulCalls = data?.reduce((acc, key) => acc + key.successful_calls, 0) || 0;
    const activeKeys = data?.filter(key => key.status === "active").length || 0;
    
    setStats({ totalCalls, successfulCalls, activeKeys });
  };

  const handleAiAssist = async () => {
    if (!aiPrompt.trim()) return;

    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: { prompt: aiPrompt },
      });

      if (error) throw error;
      setAiResponse(data.response);
      toast.success("AI response generated!");
    } catch (error: any) {
      toast.error(error.message || "AI request failed");
    } finally {
      setAiLoading(false);
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
          <h1 className="text-4xl font-black mb-2">Developer Dashboard</h1>
          <p className="text-muted-foreground mb-8">Build on the decentralized web</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* API Stats */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">API Usage</h2>
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total API Calls</p>
                  <p className="text-3xl font-black">{stats.totalCalls}</p>
                </div>
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">Successful Calls</p>
                  <p className="text-3xl font-black">{stats.successfulCalls}</p>
                </div>
                <div className="p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">Active API Keys</p>
                  <p className="text-3xl font-black">{stats.activeKeys}</p>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/monitoring")}
                >
                  View Detailed Analytics
                </Button>
              </div>
            </Card>

            {/* AI Assistant */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                AI Code Assistant
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Ask anything about FREEFLOW</label>
                  <Textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="e.g., How do I integrate SideShift API in Python?"
                    rows={4}
                  />
                </div>

                <Button 
                  onClick={handleAiAssist}
                  disabled={aiLoading || !aiPrompt.trim()}
                  className="w-full"
                >
                  {aiLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Thinking...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Get AI Help
                    </>
                  )}
                </Button>

                {aiResponse && (
                  <div className="p-4 bg-secondary/20 rounded-lg">
                    <p className="text-sm font-medium mb-2">AI Response:</p>
                    <p className="text-sm whitespace-pre-wrap">{aiResponse}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Quick Start */}
            <Card className="p-6 lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Quick Integration</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
                  <h3 className="font-bold mb-2">JavaScript</h3>
                  <p className="text-sm text-muted-foreground">Get started with JS/TS integration</p>
                </div>
                <div className="p-4 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
                  <h3 className="font-bold mb-2">Python</h3>
                  <p className="text-sm text-muted-foreground">Build with Python SDK</p>
                </div>
                <div className="p-4 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
                  <h3 className="font-bold mb-2">Rust</h3>
                  <p className="text-sm text-muted-foreground">High-performance Rust integration</p>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}