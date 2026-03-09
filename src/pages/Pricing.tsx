import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ease = [0.22, 1, 0.36, 1] as const;
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

interface Plan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular?: boolean;
  icon: React.ElementType;
  features: { text: string; included: boolean }[];
  cta: string;
}

const plans: Plan[] = [
  {
    name: "Basic",
    description: "Everything you need to get started",
    monthlyPrice: 19,
    yearlyPrice: 190,
    icon: Zap,
    cta: "Start free trial",
    features: [
      { text: "Up to 5 projects", included: true },
      { text: "Basic analytics", included: true },
      { text: "Community support", included: true },
      { text: "1 GB storage", included: true },
      { text: "Custom domains", included: false },
      { text: "Advanced integrations", included: false },
      { text: "Priority support", included: false },
      { text: "Team collaboration", included: false },
    ],
  },
  {
    name: "Pro",
    description: "For growing teams and professionals",
    monthlyPrice: 49,
    yearlyPrice: 490,
    popular: true,
    icon: Sparkles,
    cta: "Start free trial",
    features: [
      { text: "Unlimited projects", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Priority email support", included: true },
      { text: "50 GB storage", included: true },
      { text: "Custom domains", included: true },
      { text: "Advanced integrations", included: true },
      { text: "Priority support", included: false },
      { text: "Team collaboration", included: false },
    ],
  },
  {
    name: "Enterprise",
    description: "For organizations at scale",
    monthlyPrice: 99,
    yearlyPrice: 990,
    icon: Shield,
    cta: "Contact sales",
    features: [
      { text: "Unlimited projects", included: true },
      { text: "Custom analytics", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Unlimited storage", included: true },
      { text: "Custom domains", included: true },
      { text: "Advanced integrations", included: true },
      { text: "Priority support", included: true },
      { text: "Team collaboration", included: true },
    ],
  },
];

const faqs = [
  {
    q: "Can I switch plans at any time?",
    a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle, and we'll prorate any differences.",
  },
  {
    q: "Is there a free trial available?",
    a: "Absolutely. Every paid plan comes with a 14-day free trial — no credit card required. You can explore all features before committing.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and bank transfers for annual Enterprise plans.",
  },
  {
    q: "What happens when my trial ends?",
    a: "You'll be notified before your trial expires. If you don't choose a plan, your account will switch to a limited free tier — no data is lost.",
  },
  {
    q: "Do you offer refunds?",
    a: "We offer a 30-day money-back guarantee on all plans. If you're not satisfied, contact support for a full refund.",
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-28 md:pt-36 pb-4">
        <div className="container-wide text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="text-sm font-medium text-primary tracking-wider uppercase mb-3">
              Pricing
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl font-semibold text-foreground tracking-tight">
              Simple, transparent pricing
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Choose the plan that fits your needs. No hidden fees, no surprises.
            </motion.p>

            {/* Toggle */}
            <motion.div variants={fadeUp} className="mt-8 inline-flex items-center gap-3 bg-secondary/60 p-1 rounded-full border border-border/50">
              <button
                onClick={() => setYearly(false)}
                className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  !yearly ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {!yearly && (
                  <motion.div
                    layoutId="billing-toggle"
                    className="absolute inset-0 bg-background rounded-full shadow-sm border border-border/50"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Monthly</span>
              </button>
              <button
                onClick={() => setYearly(true)}
                className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  yearly ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {yearly && (
                  <motion.div
                    layoutId="billing-toggle"
                    className="absolute inset-0 bg-background rounded-full shadow-sm border border-border/50"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  Yearly
                  <span className="ml-1.5 text-xs font-semibold text-primary">–20%</span>
                </span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-12 md:py-16">
        <div className="container-wide">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto"
          >
            {plans.map((plan) => {
              const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.name}
                  variants={fadeUp}
                  className={`relative flex flex-col rounded-2xl border p-6 md:p-8 transition-all duration-300 ${
                    plan.popular
                      ? "border-primary/30 bg-primary/[0.02] shadow-elevated scale-[1.02] md:scale-105 z-10"
                      : "border-border/50 bg-card hover:border-border hover:shadow-soft"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-3.5 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                        <Sparkles className="h-3 w-3" /> Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-5">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-secondary/80 mb-4">
                      <Icon className="h-5 w-5 text-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-semibold text-foreground">
                        ${price}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        /{yearly ? "year" : "month"}
                      </span>
                    </div>
                    {yearly && (
                      <p className="text-xs text-muted-foreground mt-1">
                        ${Math.round(price / 12)}/mo billed annually
                      </p>
                    )}
                  </div>

                  <button
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-medium transition-all duration-300 mb-6 ${
                      plan.popular
                        ? "bg-primary text-primary-foreground hover:opacity-90"
                        : "border border-border text-foreground hover:bg-foreground hover:text-background"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <div className="space-y-3 mt-auto">
                    {plan.features.map((f) => (
                      <div key={f.text} className="flex items-center gap-3">
                        {f.included ? (
                          <Check className="h-4 w-4 text-primary shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                        )}
                        <span
                          className={`text-sm ${
                            f.included ? "text-foreground" : "text-muted-foreground/50"
                          }`}
                        >
                          {f.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding border-t border-border/50">
        <div className="container-tight">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
              Frequently asked questions
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-muted-foreground max-w-md mx-auto">
              Everything you need to know about our pricing and billing.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="max-w-2xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <AccordionItem
                    value={`faq-${i}`}
                    className="border border-border/50 rounded-xl px-5 data-[state=open]:border-border data-[state=open]:shadow-soft transition-all"
                  >
                    <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
