import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: [
        "Up to 10 conversions/month",
        "Basic API access",
        "Community support",
        "1 deployed app",
      ],
    },
    {
      name: "Developer",
      price: "$29",
      description: "For serious builders",
      features: [
        "Unlimited conversions",
        "Full API access",
        "Priority support",
        "10 deployed apps",
        "Custom domains",
        "AI code assistant",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For teams and organizations",
      features: [
        "Everything in Developer",
        "Dedicated support",
        "Unlimited apps",
        "Custom SLA",
        "Advanced analytics",
        "White-label options",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className={`p-8 h-full ${
                    plan.popular ? "border-2 border-primary shadow-glow" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                      Most Popular
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                  <div className="text-4xl font-black mb-2">
                    {plan.price}
                    {plan.price !== "Custom" && (
                      <span className="text-lg font-normal text-muted-foreground">/month</span>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="mt-16 p-8 bg-gradient-to-r from-primary/10 to-secondary/10">
            <h2 className="text-3xl font-black mb-4">All plans include:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h4 className="font-bold mb-2">🔒 Secure by Default</h4>
                <p className="text-sm text-muted-foreground">
                  Enterprise-grade security
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2">⚡ 99.9% Uptime</h4>
                <p className="text-sm text-muted-foreground">
                  Reliable infrastructure
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2">🌍 Global CDN</h4>
                <p className="text-sm text-muted-foreground">
                  Lightning-fast delivery
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2">📊 Analytics</h4>
                <p className="text-sm text-muted-foreground">
                  Detailed insights
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}