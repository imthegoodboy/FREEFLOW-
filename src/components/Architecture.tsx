import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Globe, Database, Shield, Coins, Users, ArrowDown } from "lucide-react";

const layers = [
  {
    icon: Globe,
    title: "Web3 Browser / Wallet",
    description: "Brave, MetaMask, Rainbow, Phantom",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Database,
    title: "FREEFLOW Protocol Layer",
    items: [
      "ENS-Style Domain Smart Contracts",
      "IPFS/Arweave Content Layer",
      "Access Control & Auth Contracts",
      "DAO Governance"
    ],
    color: "from-primary to-accent"
  },
  {
    icon: Coins,
    title: "SideShift API Layer",
    items: [
      "Multi-chain payment conversion",
      "Hosting fee processing",
      "Commerce payments",
      "Node operator rewards",
      "DAO treasury management"
    ],
    color: "from-secondary to-green-400"
  },
  {
    icon: Users,
    title: "Network Participants",
    items: [
      "Developers (publish sites)",
      "Users (browse, transact)",
      "Node Operators (host content, earn)",
      "DAO Members (govern protocol)"
    ],
    color: "from-purple-500 to-pink-500"
  }
];

export const Architecture = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-card/30 to-background">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Technical Architecture
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            How all the pieces fit together to create an unstoppable Internet
          </p>
        </motion.div>

        <div className="space-y-6">
          {layers.map((layer, i) => (
            <div key={i}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-8 bg-card/80 backdrop-blur-sm border-primary/30 hover:shadow-glow transition-all">
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-lg bg-gradient-to-br ${layer.color} flex-shrink-0`}>
                      <layer.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3 text-card-foreground">{layer.title}</h3>
                      {layer.description && (
                        <p className="text-muted-foreground">{layer.description}</p>
                      )}
                      {layer.items && (
                        <ul className="space-y-2 mt-2">
                          {layer.items.map((item, j) => (
                            <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                              <Shield className="h-4 w-4 text-primary flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
              
              {i < layers.length - 1 && (
                <div className="flex justify-center py-4">
                  <ArrowDown className="h-8 w-8 text-primary animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            {
              title: "Truly Decentralized",
              description: "No single point of failure. Every layer is distributed and censorship-resistant."
            },
            {
              title: "Crypto-Native",
              description: "Payments, identity, and governance all built on blockchain from the ground up."
            },
            {
              title: "Interoperable",
              description: "Works across all major blockchains via SideShift integration."
            },
            {
              title: "Self-Sustaining",
              description: "Incentive model ensures network grows and remains available forever."
            }
          ].map((benefit, i) => (
            <Card key={i} className="p-6 bg-secondary/10 border-secondary/30">
              <h4 className="font-bold text-lg mb-2 text-secondary">{benefit.title}</h4>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
