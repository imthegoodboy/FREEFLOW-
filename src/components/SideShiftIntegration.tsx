import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const useCases = [
  {
    title: "Hosting Payments",
    description: "Developers pay in any token (BTC, ETH, SOL) → SideShift converts → $FLOW network token",
    example: "Publish website globally without needing specific tokens"
  },
  {
    title: "In-App Commerce",
    description: "DApps accept any crypto → SideShift converts → merchant's chosen currency (USDC)",
    example: "Sell NFTs, memberships, or products across all blockchains"
  },
  {
    title: "Node Rewards",
    description: "Operators earn $FLOW → auto-convert via SideShift → BTC, USDC, or ETH",
    example: "Maintain liquidity in preferred assets automatically"
  },
  {
    title: "DAO Treasury",
    description: "Collect fees in multiple tokens → SideShift rebalances portfolio automatically",
    example: "Efficient cross-chain treasury management"
  }
];

const currencies = ["BTC", "ETH", "SOL", "MATIC", "BNB", "USDC", "USDT", "FLOW"];

export const SideShiftIntegration = () => {
  const [fromCurrency, setFromCurrency] = useState("BTC");
  const [toCurrency, setToCurrency] = useState("FLOW");
  const [amount, setAmount] = useState("0.001");
  const [estimatedAmount, setEstimatedAmount] = useState("~125");

  const handleConvert = () => {
    toast.success("Conversion simulated!", {
      description: `${amount} ${fromCurrency} → ${estimatedAmount} ${toCurrency}`
    });
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-card/30 to-background">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            SideShift: Payment Infrastructure
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The critical payment layer bridging multi-chain currencies into one unified network economy
          </p>
        </motion.div>

        {/* Live Demo Converter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-16"
        >
          <Card className="p-8 bg-card/80 backdrop-blur-sm border-primary/30 shadow-glow">
            <h3 className="text-2xl font-bold mb-6 text-center text-card-foreground">
              Live Crypto Converter Demo
            </h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">From</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="flex-1 bg-background"
                      step="0.001"
                    />
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger className="w-[110px] bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map(curr => (
                          <SelectItem key={curr} value={curr}>{curr}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">To</label>
                  <div className="flex gap-2">
                    <Input
                      value={estimatedAmount}
                      readOnly
                      className="flex-1 bg-muted"
                    />
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger className="w-[110px] bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map(curr => (
                          <SelectItem key={curr} value={curr}>{curr}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleConvert}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                size="lg"
              >
                Convert via SideShift <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                * Demo simulation - Real SideShift API integration in production
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Use Cases */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((useCase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-6 h-full bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <RefreshCw className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-card-foreground">{useCase.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{useCase.description}</p>
                    <p className="text-xs text-primary italic">✨ {useCase.example}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Why It Matters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <Card className="p-8 bg-secondary/10 border-secondary/30">
            <h3 className="text-2xl font-bold mb-4 text-secondary">Why SideShift is Critical</h3>
            <div className="space-y-3 text-muted-foreground">
              <p>✅ <strong>Global Accessibility:</strong> Anyone can participate without holding specific tokens</p>
              <p>✅ <strong>Seamless UX:</strong> Users pay in their preferred crypto, automatic conversion happens behind the scenes</p>
              <p>✅ <strong>Cross-Chain Unity:</strong> Brings together BTC, ETH, SOL, and 100+ chains into one ecosystem</p>
              <p>✅ <strong>Developer Freedom:</strong> Accept any currency without complex multi-chain integration</p>
              <p>✅ <strong>True Decentralization:</strong> No single payment processor controls the flow of value</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
