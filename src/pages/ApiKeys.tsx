import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Loader2, Key, Copy, Eye, EyeOff, Trash2, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ApiKey {
  id: string;
  key_name: string;
  api_key: string;
  status: string;
  free_tier_calls_remaining: number;
  total_calls: number;
  successful_calls: number;
  failed_calls: number;
  last_used_at: string | null;
  created_at: string;
}

export default function ApiKeys() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [keyName, setKeyName] = useState("");
  const [creating, setCreating] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    await loadApiKeys();
    setLoading(false);
  };

  const loadApiKeys = async () => {
    const { data, error } = await supabase
      .from("api_keys")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load API keys");
      return;
    }
    setApiKeys(data || []);
  };

  const generateApiKey = async () => {
    if (!keyName.trim()) {
      toast.error("Please enter a name for your API key");
      return;
    }

    setCreating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Generate random API key
      const randomKey = `ff_${Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')}`;

      const { error } = await supabase
        .from("api_keys")
        .insert({
          user_id: user.id,
          key_name: keyName,
          api_key: randomKey,
        });

      if (error) throw error;

      toast.success("API key created successfully!");
      setKeyName("");
      await loadApiKeys();
    } catch (error: any) {
      toast.error(error.message || "Failed to create API key");
    } finally {
      setCreating(false);
    }
  };

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const revokeKey = async (keyId: string) => {
    const { error } = await supabase
      .from("api_keys")
      .update({ status: "revoked" })
      .eq("id", keyId);

    if (error) {
      toast.error("Failed to revoke key");
      return;
    }

    toast.success("API key revoked");
    await loadApiKeys();
  };

  const deleteKey = async (keyId: string) => {
    const { error } = await supabase
      .from("api_keys")
      .delete()
      .eq("id", keyId);

    if (error) {
      toast.error("Failed to delete key");
      return;
    }

    toast.success("API key deleted");
    await loadApiKeys();
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
          <div className="flex items-center gap-3 mb-2">
            <Key className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-black">API Keys</h1>
          </div>
          <p className="text-muted-foreground mb-8">
            Generate and manage your FREEFLOW API keys. Get 3 free API calls to test the platform.
          </p>

          {/* Create New API Key */}
          <Card className="p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Create New API Key</h2>
            <div className="flex gap-4">
              <Input
                placeholder="API Key Name (e.g., Production, Development)"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                className="flex-1"
              />
              <Button onClick={generateApiKey} disabled={creating}>
                {creating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Generate API Key
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* API Keys List */}
          <div className="space-y-4">
            {apiKeys.length === 0 ? (
              <Card className="p-12 text-center">
                <Key className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No API Keys Yet</h3>
                <p className="text-muted-foreground">
                  Create your first API key to start using the FREEFLOW API
                </p>
              </Card>
            ) : (
              apiKeys.map((key) => (
                <Card key={key.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{key.key_name}</h3>
                        <Badge variant={key.status === "active" ? "default" : "destructive"}>
                          {key.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Created {new Date(key.created_at).toLocaleDateString()}
                      </p>
                      {key.last_used_at && (
                        <p className="text-sm text-muted-foreground">
                          Last used {new Date(key.last_used_at).toLocaleString()}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {key.status === "active" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => revokeKey(key.id)}
                        >
                          Revoke
                        </Button>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteKey(key.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="bg-secondary/20 p-4 rounded-lg mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <code className="text-sm font-mono flex-1">
                        {visibleKeys.has(key.id)
                          ? key.api_key
                          : `${key.api_key.substring(0, 10)}${"•".repeat(50)}`}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleKeyVisibility(key.id)}
                      >
                        {visibleKeys.has(key.id) ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(key.api_key)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Free Calls Left</p>
                      <p className="text-2xl font-black text-primary">
                        {key.free_tier_calls_remaining}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Calls</p>
                      <p className="text-2xl font-black">{key.total_calls}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Successful</p>
                      <p className="text-2xl font-black text-green-600">
                        {key.successful_calls}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Failed</p>
                      <p className="text-2xl font-black text-red-600">
                        {key.failed_calls}
                      </p>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
