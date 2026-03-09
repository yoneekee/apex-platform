import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowLeft, Clock, Globe, Twitter, Github, Linkedin, Instagram } from "lucide-react";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ease = [0.22, 1, 0.36, 1] as const;
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject is too long"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message is too long"),
});

type FormData = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

const socials = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
];

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@platform.co", href: "mailto:hello@platform.co" },
  { icon: Phone, label: "Phone", value: "+1 (555) 000-0000", href: "tel:+15550000000" },
  { icon: MapPin, label: "Office", value: "123 Innovation Drive\nSan Francisco, CA 94102" },
  { icon: Clock, label: "Hours", value: "Mon–Fri, 9 AM – 6 PM PST" },
];

function InputField({
  label, error, ...props
}: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-foreground">{label}</label>
      <input
        {...props}
        className={`w-full h-11 px-4 text-sm bg-secondary/40 border rounded-xl outline-none placeholder:text-muted-foreground/60 transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${
          error ? "border-destructive focus:border-destructive" : "border-border/50 focus:border-primary/40"
        }`}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const update = (field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormData;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 md:pt-36 pb-8 md:pb-12">
        <div className="container-wide text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="text-sm font-medium text-primary tracking-wider uppercase mb-3">
              Contact
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl font-semibold text-foreground tracking-tight">
              Get in touch
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Have a question or want to work together? We'd love to hear from you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-wide">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 max-w-5xl mx-auto"
          >
            {/* Form */}
            <motion.div variants={fadeUp} className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease }}
                    className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-2xl border border-border/50 bg-card"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Message sent!</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mb-8">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      <ArrowLeft className="h-4 w-4" /> Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5 p-6 md:p-8 rounded-2xl border border-border/50 bg-card"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <InputField label="Name" placeholder="Your name" value={form.name} onChange={(e) => update("name", e.target.value)} error={errors.name} />
                      <InputField label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} error={errors.email} />
                    </div>
                    <InputField label="Subject" placeholder="How can we help?" value={form.subject} onChange={(e) => update("subject", e.target.value)} error={errors.subject} />
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-foreground">Message</label>
                      <textarea
                        rows={5}
                        placeholder="Tell us more about your project..."
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        className={`w-full px-4 py-3 text-sm bg-secondary/40 border rounded-xl outline-none placeholder:text-muted-foreground/60 transition-all duration-200 resize-none focus:ring-2 focus:ring-primary/10 ${
                          errors.message ? "border-destructive focus:border-destructive" : "border-border/50 focus:border-primary/40"
                        }`}
                      />
                      {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
                    </div>
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all disabled:opacity-60"
                    >
                      {sending ? (
                        <span className="inline-block h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      ) : (
                        <>Send message <Send className="h-4 w-4" /></>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Info sidebar */}
            <motion.div variants={fadeUp} className="lg:col-span-2 space-y-8">
              {/* Contact details */}
              <div className="space-y-5">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="flex gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-secondary/80 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                        <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{item.label}</p>
                        <p className="text-sm text-foreground mt-0.5 whitespace-pre-line">{item.value}</p>
                      </div>
                    </div>
                  );
                  return item.href ? (
                    <a key={item.label} href={item.href} className="block">{content}</a>
                  ) : (
                    <div key={item.label}>{content}</div>
                  );
                })}
              </div>

              {/* Map placeholder */}
              <div className="relative rounded-2xl overflow-hidden border border-border/50 aspect-[4/3]">
                <div className="absolute inset-0 bg-secondary/40">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <Globe className="h-8 w-8 text-muted-foreground/30 mb-2" />
                    <p className="text-xs text-muted-foreground/60">Interactive map</p>
                  </div>
                  {/* Decorative grid */}
                  <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                        <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                  {/* Pin */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-primary animate-ping absolute inset-0" />
                      <div className="w-3 h-3 rounded-full bg-primary relative z-10" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Follow us</p>
                <div className="flex gap-2">
                  {socials.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        aria-label={s.label}
                        className="w-10 h-10 rounded-xl bg-secondary/80 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary hover:scale-110 transition-all duration-200"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
