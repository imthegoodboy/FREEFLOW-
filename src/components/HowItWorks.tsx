import { motion } from "framer-motion";
import { Code, Database, Globe, Wallet, Coins, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const developerSteps = [
  {
    icon: Code,
    step: "1. Build Your App",
    description: "Create your React/Next.js app just like normal. No special changes required."
  },
  {
    icon: Database,
    step: "2. Deploy to IPFS/Arweave",
    description: "npx freeflow publish ./dist — Your content gets permanent IPFS hash: Qm1234...",
    code: "npx freeflow publish ./dist"
  },
  {
    icon: Globe,
    step: "3. Register Domain",
    description: "Map your .web3 domain to IPFS hash via smart contract. No registrar needed.",
    code: 'freeflow.registerDomain("mysite.web3", "Qm1234...")'
  },
  {
    icon: Coins,
    step: "4. Enable Payments",
    description: "Integrate SideShift to accept any crypto. Auto-converts to your preferred token.",
    code: "// Accept BTC, ETH, SOL, etc.\n// SideShift converts → USDC"
  }
];

const userSteps = [
  {
    icon: Wallet,
    step: "1. Connect Wallet",
    description: "Your wallet is your passport. No signups, passwords, or tracking cookies needed."
  },
  {
    icon: Globe,
    step: "2. Type .web3 Domain",
    description: "Visit mysite.web3 — FREEFLOW resolves it via on-chain lookup instantly."
  },
  {
    icon: Database,
    step: "3. Smart Contract Fetches Content",
    description: "Browser fetches site directly from IPFS using the blockchain-resolved hash."
  },
  {
    icon: Shield,
    step: "4. Browse Freely",
    description: "Site loads decentralized. No company can take it down. No one can censor you."
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Step-by-step guide for developers and users
          </p>
        </motion.div>

        <Tabs defaultValue="developer" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-12">
            <TabsTrigger value="developer" className="text-lg">
              <Code className="mr-2 h-5 w-5" />
              For Developers
            </TabsTrigger>
            <TabsTrigger value="user" className="text-lg">
              <Wallet className="mr-2 h-5 w-5" />
              For Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="developer">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {developerSteps.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-6 h-full bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary hover:shadow-glow transition-all">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-2 text-card-foreground">{item.step}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                        {item.code && (
                          <pre className="bg-muted/50 p-3 rounded text-xs overflow-x-auto">
                            <code className="text-primary">{item.code}</code>
                          </pre>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 p-6 bg-secondary/10 border border-secondary/30 rounded-lg"
            >
              <h4 className="font-bold text-lg mb-2 flex items-center gap-2 text-secondary">
                <Shield className="h-5 w-5" />
                Result
              </h4>
              <p className="text-muted-foreground">
                ✅ No server bills<br />
                ✅ No registrar can revoke it<br />
                ✅ No payment processor required<br />
                ✅ Completely uncensorable
              </p>
            </motion.div>
          </TabsContent>

          <TabsContent value="user">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {userSteps.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-6 h-full bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary hover:shadow-glow transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-2 text-card-foreground">{item.step}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 p-6 bg-secondary/10 border border-secondary/30 rounded-lg"
            >
              <h4 className="font-bold text-lg mb-2 flex items-center gap-2 text-secondary">
                <Shield className="h-5 w-5" />
                Privacy & Freedom
              </h4>
              <p className="text-muted-foreground">
                ✅ No tracking<br />
                ✅ No censorship<br />
                ✅ Always accessible<br />
                ✅ True ownership
              </p>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
