import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

interface NewsletterCtaProps {
  title?: string;
  subtitle?: string;
}

export default function NewsletterCta({
  title = "Ready to get started?",
  subtitle = "Join thousands of forward-thinking teams already using our platform.",
}: NewsletterCtaProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-foreground p-12 sm:p-16 text-center overflow-hidden"
        >
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-background">
              {title}
            </h2>
            <p className="text-base text-background/60 max-w-lg mx-auto">{subtitle}</p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 text-background"
              >
                <Check className="h-5 w-5" />
                <span className="text-sm font-medium">Thank you! We'll be in touch.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-5 py-3.5 rounded-full bg-background/10 border border-background/20 text-background placeholder:text-background/40 text-sm focus:outline-none focus:ring-2 focus:ring-background/30"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-6 py-3.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Subscribe <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

          {/* Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
