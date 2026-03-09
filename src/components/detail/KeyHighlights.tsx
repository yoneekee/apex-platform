import { motion } from "framer-motion";
import { Shield, Zap, Award, Gem, Clock, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Highlight {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface KeyHighlightsProps {
  sectionTitle?: string;
  highlights?: Highlight[];
}

const defaultHighlights: Highlight[] = [
  { icon: Shield, title: "5-Year Warranty", description: "Comprehensive international coverage for peace of mind." },
  { icon: Zap, title: "72-Hour Reserve", description: "Extended power reserve for uninterrupted precision." },
  { icon: Award, title: "COSC Certified", description: "Chronometer-certified accuracy of -2/+2 seconds per day." },
  { icon: Gem, title: "Sapphire Crystal", description: "Scratch-resistant with dual anti-reflective coating." },
  { icon: Clock, title: "Swiss Made", description: "Assembled by master watchmakers in our Geneva atelier." },
  { icon: Layers, title: "Grade 5 Titanium", description: "Aerospace-grade material, 40% lighter than steel." },
];

export default function KeyHighlights({
  sectionTitle = "Key Features",
  highlights = defaultHighlights,
}: KeyHighlightsProps) {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-wide">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-12 text-center"
        >
          {sectionTitle}
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-premium p-6 space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
