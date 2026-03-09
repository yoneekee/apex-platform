import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface RelatedItem {
  title: string;
  subtitle: string;
  price?: string;
  href?: string;
}

interface RelatedItemsProps {
  sectionTitle?: string;
  items?: RelatedItem[];
}

const placeholderGradients = [
  "from-primary/15 to-accent",
  "from-accent to-secondary",
  "from-secondary to-muted",
];

const defaultItems: RelatedItem[] = [
  { title: "Eclipse Navigator", subtitle: "Dive Collection", price: "$3,200", href: "/detail" },
  { title: "Zenith Perpetual", subtitle: "Heritage Collection", price: "$7,400", href: "/detail" },
  { title: "Aura Skeleton", subtitle: "Artisan Series", price: "$5,900", href: "/detail" },
];

export default function RelatedItems({
  sectionTitle = "You may also like",
  items = defaultItems,
}: RelatedItemsProps) {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            {sectionTitle}
          </h2>
          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.a
              key={i}
              href={item.href || "#"}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group card-premium overflow-hidden"
            >
              <div
                className={`aspect-[4/5] bg-gradient-to-br ${placeholderGradients[i % placeholderGradients.length]} relative overflow-hidden`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-muted-foreground/30 text-sm font-medium tracking-widest uppercase">
                    Product Image
                  </span>
                </div>
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
              </div>
              <div className="p-5 space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.subtitle}</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  {item.price && (
                    <span className="text-sm font-medium text-muted-foreground">{item.price}</span>
                  )}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
