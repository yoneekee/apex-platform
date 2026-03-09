import { motion } from "framer-motion";
import { Zap, Shield, BarChart3, Globe, Layers, Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureGridProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  { icon: Zap, title: "Lightning Fast", description: "Optimized performance that delivers sub-second load times across all devices." },
  { icon: Shield, title: "Enterprise Security", description: "Bank-level encryption and compliance certifications to protect your data." },
  { icon: BarChart3, title: "Deep Analytics", description: "Comprehensive insights and real-time dashboards to drive decisions." },
  { icon: Globe, title: "Global Scale", description: "CDN-powered delivery across 200+ edge locations worldwide." },
  { icon: Layers, title: "Modular Design", description: "Composable architecture that adapts to any business requirement." },
  { icon: Lock, title: "Privacy First", description: "GDPR compliant with full data sovereignty and user controls." },
];

export default function FeatureGrid({
  title = "Everything you need",
  subtitle = "Powerful features designed with precision. Each component is crafted for performance, accessibility, and elegance.",
  features = defaultFeatures,
}: FeatureGridProps) {
  return (
    <section id="features" className="section-padding bg-secondary/30">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-premium p-8 group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
