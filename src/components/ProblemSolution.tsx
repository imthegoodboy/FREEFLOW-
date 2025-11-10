import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const problems = [
  {
    title: "Centralized Hosting",
    issue: "AWS, Google Cloud host 90% of websites",
    impact: "Can censor, delete, or suspend sites anytime"
  },
  {
    title: "Centralized DNS",
    issue: "Domain names managed by ICANN",
    impact: "Governments or registrars can block access"
  },
  {
    title: "Centralized Payments",
    issue: "Stripe, PayPal, Visa process web transactions",
    impact: "They can freeze funds, reject regions, and charge high fees"
  },
  {
    title: "Data Ownership",
    issue: "Platforms own user data",
    impact: "Users can't export or control their data"
  }
];

const solutions = [
  {
    title: "Decentralized Hosting",
    description: "IPFS / Arweave permanent storage",
    benefit: "Content lives forever, no one can delete it"
  },
  {
    title: "On-chain Naming",
    description: "ENS-style blockchain DNS",
    benefit: "Domains that can't be revoked or censored"
  },
  {
    title: "Crypto Payments",
    description: "SideShift cross-chain conversion",
    benefit: "Accept any crypto, global reach, no middlemen"
  },
  {
    title: "User Ownership",
    description: "Wallet-based identity & auth",
    benefit: "You own your data and digital presence"
  }
];

export const ProblemSolution = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Current Internet Problem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Today's web is broken. Here's what's wrong and how FREEFLOW fixes it.
          </p>
        </motion.div>

        {/* Problems Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center justify-center gap-2 text-destructive">
            <AlertTriangle className="h-6 w-6" />
            The Problems
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((problem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 h-full bg-card/50 backdrop-blur-sm border-destructive/30 hover:border-destructive/60 transition-all">
                  <div className="mb-3">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-card-foreground">{problem.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{problem.issue}</p>
                  <p className="text-xs text-destructive/80 italic">{problem.impact}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center justify-center gap-2 text-secondary">
            <CheckCircle2 className="h-6 w-6" />
            The FREEFLOW Solution
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 h-full bg-card/50 backdrop-blur-sm border-secondary/30 hover:border-secondary hover:shadow-glow transition-all">
                  <div className="mb-3">
                    <CheckCircle2 className="h-8 w-8 text-secondary" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-card-foreground">{solution.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{solution.description}</p>
                  <p className="text-xs text-secondary italic">{solution.benefit}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
