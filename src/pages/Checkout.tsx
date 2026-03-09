import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CreditCard,
  Lock,
  Check,
  ChevronRight,
  ShoppingBag,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";

const ease = [0.22, 1, 0.36, 1] as const;
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
};

type Step = "shipping" | "payment" | "success";

function formatCard(value: string) {
  return value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim().slice(0, 19);
}
function formatExpiry(value: string) {
  const clean = value.replace(/\D/g, "").slice(0, 4);
  if (clean.length >= 3) return clean.slice(0, 2) + "/" + clean.slice(2);
  return clean;
}

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>("shipping");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [orderNumber] = useState(() => `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);

  const shipping = 0;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = () => {
    setStep("success");
    clearCart();
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh] px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease }}
            className="text-center max-w-md"
          >
            {/* Animated checkmark */}
            <div className="relative mx-auto w-24 h-24 mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                className="absolute inset-0 rounded-full bg-primary/10"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.35, type: "spring", stiffness: 200, damping: 15 }}
                className="absolute inset-2 rounded-full bg-primary/20"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
                className="absolute inset-4 rounded-full bg-primary flex items-center justify-center"
              >
                <motion.div
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                >
                  <Check className="h-8 w-8 text-primary-foreground" strokeWidth={3} />
                </motion.div>
              </motion.div>
              {/* Particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: [0, Math.cos((i * 60 * Math.PI) / 180) * 50],
                    y: [0, Math.sin((i * 60 * Math.PI) / 180) * 50],
                  }}
                  transition={{ delay: 0.6 + i * 0.05, duration: 0.6 }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-primary"
                />
              ))}
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4, ease }}
              className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight"
            >
              Order Confirmed!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4, ease }}
              className="text-muted-foreground mt-2"
            >
              Thank you for your purchase.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.4, ease }}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-secondary/60 rounded-xl"
            >
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{orderNumber}</span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              className="text-xs text-muted-foreground mt-3"
            >
              A confirmation email has been sent to your inbox.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.4, ease }}
              className="mt-8"
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
              >
                <Home className="h-4 w-4" /> Back to Home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 md:pt-32 pb-16">
        <div className="container-wide max-w-5xl">
          {/* Breadcrumb steps */}
          <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-8">
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-sm mb-6">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
              <span className="text-foreground font-medium">Checkout</span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-3">
              {["Shipping", "Payment"].map((s, i) => {
                const stepKey = i === 0 ? "shipping" : "payment";
                const active = step === stepKey;
                const done = (step === "payment" && i === 0);
                return (
                  <div key={s} className="flex items-center gap-2">
                    {i > 0 && <div className={`w-8 h-px ${done || active ? "bg-primary" : "bg-border"}`} />}
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      active ? "bg-primary text-primary-foreground" :
                      done ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
                    }`}>
                      {done ? <Check className="h-3 w-3" /> : <span>{i + 1}</span>}
                      <span>{s}</span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left: Forms */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {step === "shipping" && (
                  <motion.div
                    key="shipping"
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -20 }}
                    variants={stagger}
                    className="p-6 md:p-8 rounded-2xl border border-border/50 bg-card"
                  >
                    <motion.h2 variants={fadeUp} className="text-lg font-semibold text-foreground mb-6">Shipping Information</motion.h2>
                    <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField label="First Name" placeholder="John" />
                      <InputField label="Last Name" placeholder="Doe" />
                      <InputField label="Email" type="email" placeholder="john@example.com" className="sm:col-span-2" />
                      <InputField label="Address" placeholder="123 Innovation Drive" className="sm:col-span-2" />
                      <InputField label="City" placeholder="San Francisco" />
                      <InputField label="ZIP Code" placeholder="94102" />
                      <InputField label="Country" placeholder="United States" className="sm:col-span-2" />
                    </motion.div>
                    <motion.div variants={fadeUp} className="flex justify-between mt-6">
                      <Link to="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="h-4 w-4" /> Back
                      </Link>
                      <button
                        onClick={() => setStep("payment")}
                        className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
                      >
                        Continue <ChevronRight className="h-4 w-4" />
                      </button>
                    </motion.div>
                  </motion.div>
                )}

                {step === "payment" && (
                  <motion.div
                    key="payment"
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -20 }}
                    variants={stagger}
                    className="p-6 md:p-8 rounded-2xl border border-border/50 bg-card"
                  >
                    <motion.h2 variants={fadeUp} className="text-lg font-semibold text-foreground mb-6">Payment Method</motion.h2>

                    {/* Card visual */}
                    <motion.div variants={fadeUp} className="relative w-full max-w-sm aspect-[1.6/1] rounded-2xl bg-gradient-to-br from-foreground to-foreground/80 p-6 mb-6 overflow-hidden">
                      <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-primary/20 -translate-y-1/2 translate-x-1/4" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-primary/10 translate-y-1/2 -translate-x-1/4" />
                      <div className="relative h-full flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-7 rounded bg-primary/30" />
                          <CreditCard className="h-5 w-5 text-background/60" />
                        </div>
                        <div>
                          <p className="text-sm font-mono text-background/80 tracking-widest">
                            {cardNumber || "•••• •••• •••• ••••"}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-background/50">CARDHOLDER</p>
                            <p className="text-xs text-background/50">{expiry || "MM/YY"}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={fadeUp} className="space-y-4 max-w-sm">
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-foreground">Card Number</label>
                        <input
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCard(e.target.value.replace(/\D/g, "")))}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className="w-full h-11 px-4 text-sm font-mono bg-secondary/40 border border-border/50 rounded-xl outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-sm font-medium text-foreground">Expiry</label>
                          <input
                            value={expiry}
                            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full h-11 px-4 text-sm font-mono bg-secondary/40 border border-border/50 rounded-xl outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-sm font-medium text-foreground">CVC</label>
                          <input
                            placeholder="•••"
                            maxLength={4}
                            className="w-full h-11 px-4 text-sm font-mono bg-secondary/40 border border-border/50 rounded-xl outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
                          />
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={fadeUp} className="flex justify-between mt-6">
                      <button
                        onClick={() => setStep("shipping")}
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4" /> Back
                      </button>
                      <button
                        onClick={handlePlaceOrder}
                        className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
                      >
                        <Lock className="h-3.5 w-3.5" /> Place Order — ${total.toFixed(2)}
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-2">
              <div className="sticky top-28 p-6 rounded-2xl border border-border/50 bg-card">
                <h3 className="text-sm font-semibold text-foreground mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl shrink-0" style={{ backgroundColor: item.image }}>
                        <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary/10 to-transparent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium text-foreground">${item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border/50 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold pt-2 border-t border-border/50">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">${total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-4 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  <span>Secure, encrypted checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  className = "",
  ...props
}: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="block text-sm font-medium text-foreground">{label}</label>
      <input
        {...props}
        className="w-full h-11 px-4 text-sm bg-secondary/40 border border-border/50 rounded-xl outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/60"
      />
    </div>
  );
}
