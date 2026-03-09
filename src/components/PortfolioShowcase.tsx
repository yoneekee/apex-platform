import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string;
  color: string;
}

interface PortfolioShowcaseProps {
  title?: string;
  subtitle?: string;
  items?: PortfolioItem[];
  categories?: string[];
}

const defaultItems: PortfolioItem[] = [
  { id: 1, title: "Brand Identity System", category: "Branding", description: "Complete visual identity for a fintech startup", color: "from-blue-500/20 to-indigo-500/20" },
  { id: 2, title: "E-Commerce Platform", category: "Development", description: "Full-stack marketplace with 50k+ products", color: "from-emerald-500/20 to-teal-500/20" },
  { id: 3, title: "Mobile Banking App", category: "Design", description: "Award-winning UI for 2M+ active users", color: "from-orange-500/20 to-amber-500/20" },
  { id: 4, title: "AI Dashboard", category: "Development", description: "Real-time analytics for machine learning models", color: "from-purple-500/20 to-pink-500/20" },
  { id: 5, title: "Corporate Website", category: "Branding", description: "Premium web presence for Fortune 500 company", color: "from-cyan-500/20 to-blue-500/20" },
  { id: 6, title: "SaaS Product Suite", category: "Design", description: "Unified design system across 12 products", color: "from-rose-500/20 to-red-500/20" },
];

const defaultCategories = ["All", "Branding", "Design", "Development"];

export default function PortfolioShowcase({
  title = "Selected Work",
  subtitle = "A curated collection of projects that showcase our craft and attention to detail.",
  items = defaultItems,
  categories = defaultCategories,
}: PortfolioShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All" ? items : items.filter((i) => i.category === activeFilter);

  return (
    <section id="portfolio" className="section-padding">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="group cursor-pointer"
              >
                <div className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${item.color} relative overflow-hidden mb-4`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-background/20 backdrop-blur-sm" />
                  </div>
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 rounded-full bg-background/90 backdrop-blur flex items-center justify-center">
                      <ArrowUpRight className="h-4 w-4 text-foreground" />
                    </div>
                  </div>
                </div>
                <div className="px-1">
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">{item.category}</span>
                  <h3 className="text-lg font-semibold text-foreground mt-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
