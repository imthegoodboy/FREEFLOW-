import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Loader2, Activity, TrendingUp, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface UsageLog {
  id: string;
  endpoint: string;
  method: string;
  status_code: number;
  response_time_ms: number | null;
  error_message: string | null;
  created_at: string;
}

export default function Monitoring() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<UsageLog[]>([]);
  const [stats, setStats] = useState({
    totalRequests: 0,
    successRate: 0,
    avgResponseTime: 0,
    errorCount: 0,
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
    await loadLogs();
    setLoading(false);
  };

  const loadLogs = async () => {
    const { data, error } = await supabase
      .from("api_usage_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      toast.error("Failed to load usage logs");
      return;
    }

    setLogs(data || []);

    // Calculate stats
    if (data && data.length > 0) {
      const total = data.length;
      const successful = data.filter(log => log.status_code >= 200 && log.status_code < 300).length;
      const errors = data.filter(log => log.status_code >= 400).length;
      const avgTime = data
        .filter(log => log.response_time_ms)
        .reduce((acc, log) => acc + (log.response_time_ms || 0), 0) / data.length;

      setStats({
        totalRequests: total,
        successRate: (successful / total) * 100,
        avgResponseTime: Math.round(avgTime),
        errorCount: errors,
      });
    }
  };

  const getStatusColor = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) return "text-green-600";
    if (statusCode >= 400 && statusCode < 500) return "text-yellow-600";
    return "text-red-600";
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
            <Activity className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-black">API Monitoring</h1>
          </div>
          <p className="text-muted-foreground mb-8">
            Real-time monitoring of your API usage and performance metrics
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="h-5 w-5 text-primary" />
                <p className="text-sm text-muted-foreground">Total Requests</p>
              </div>
              <p className="text-3xl font-black">{stats.totalRequests}</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
              <p className="text-3xl font-black text-green-600">
                {stats.successRate.toFixed(1)}%
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <p className="text-sm text-muted-foreground">Avg Response</p>
              </div>
              <p className="text-3xl font-black text-blue-600">
                {stats.avgResponseTime}ms
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <p className="text-sm text-muted-foreground">Errors</p>
              </div>
              <p className="text-3xl font-black text-red-600">{stats.errorCount}</p>
            </Card>
          </div>

          {/* Logs Table */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Recent API Requests</h2>
            {logs.length === 0 ? (
              <div className="text-center py-12">
                <Activity className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No Activity Yet</h3>
                <p className="text-muted-foreground">
                  Start making API requests to see them here
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-bold">Timestamp</th>
                      <th className="text-left p-3 font-bold">Method</th>
                      <th className="text-left p-3 font-bold">Endpoint</th>
                      <th className="text-left p-3 font-bold">Status</th>
                      <th className="text-left p-3 font-bold">Response Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => (
                      <tr key={log.id} className="border-b hover:bg-secondary/20">
                        <td className="p-3 text-sm">
                          {new Date(log.created_at).toLocaleString()}
                        </td>
                        <td className="p-3">
                          <Badge variant="outline">{log.method}</Badge>
                        </td>
                        <td className="p-3 font-mono text-sm">{log.endpoint}</td>
                        <td className="p-3">
                          <span className={`font-bold ${getStatusColor(log.status_code)}`}>
                            {log.status_code}
                          </span>
                        </td>
                        <td className="p-3 text-sm">
                          {log.response_time_ms ? `${log.response_time_ms}ms` : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
