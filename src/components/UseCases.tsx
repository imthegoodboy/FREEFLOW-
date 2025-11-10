import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Newspaper, Palette, Users, ShoppingCart, Gamepad2, GraduationCap, MessageSquare } from "lucide-react";

const useCases = [
  {
    icon: Newspaper,
    title: "Decentralized News",
    description: "Journalism sites that can't be censored",
    advantage: "No government can shut down reporting",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Palette,
    title: "Creator Portfolios",
    description: "NFT artists, designers showcase work",
    advantage: "Permanent galleries, direct sales",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Users,
    title: "DAO Websites",
    description: "Organization hubs and governance portals",
    advantage: "Always online, truly owned by community",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: ShoppingCart,
    title: "E-commerce DApps",
    description: "Shops accepting global crypto payments",
    advantage: "No payment processor can block you",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Gamepad2,
    title: "Web3 Games",
    description: "Game frontends and metadata hosting",
    advantage: "Immutable game assets and infrastructure",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: GraduationCap,
    title: "Education Platforms",
    description: "Learning content that lives forever",
    advantage: "Knowledge that can't be erased",
    color: "from-teal-500 to-cyan-500"
  },
  {
    icon: MessageSquare,
    title: "Social Communities",
    description: "Forums and discussion platforms",
    advantage: "Truly free speech platforms",
    color: "from-pink-500 to-rose-500"
  }
];

export const UseCases = () => {
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
            Real-World Use Cases
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            FREEFLOW powers the next generation of unstoppable applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-6 h-full bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary hover:shadow-glow transition-all group">
                <div className={`p-4 rounded-lg bg-gradient-to-br ${useCase.color} inline-block mb-4 group-hover:scale-110 transition-transform`}>
                  <useCase.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2 text-card-foreground">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{useCase.description}</p>
                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-primary font-semibold">
                    ✨ {useCase.advantage}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { number: "∞", label: "Permanent Hosting", desc: "Content lives forever" },
            { number: "0", label: "Server Bills", desc: "Pay once, host forever" },
            { number: "100%", label: "Censorship Proof", desc: "Truly unstoppable" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-xl font-bold text-foreground mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
