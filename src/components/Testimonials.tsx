import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

interface TestimonialsProps {
  title?: string;
  items?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  { quote: "The level of craft and attention to detail is unmatched. They transformed our digital presence entirely.", name: "Sarah Chen", role: "CEO", company: "Luminary Inc." },
  { quote: "Working with this team felt like a true partnership. They understood our vision and elevated it beyond expectations.", name: "Marcus Rivera", role: "Head of Product", company: "Nexus Labs" },
  { quote: "From concept to launch, the process was seamless. Our conversion rates increased by 340% within three months.", name: "Aisha Johnson", role: "CMO", company: "Vertex AI" },
];

export default function Testimonials({
  title = "Trusted by industry leaders",
  items = defaultTestimonials,
}: TestimonialsProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % items.length), [items.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + items.length) % items.length), [items.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-16">
            {title}
          </h2>

          <div className="relative min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <Quote className="h-8 w-8 text-primary/30 mx-auto" />
                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-light text-foreground leading-relaxed max-w-3xl mx-auto">
                  "{items[current].quote}"
                </blockquote>
                <div className="space-y-1">
                  <div className="text-base font-semibold text-foreground">{items[current].name}</div>
                  <div className="text-sm text-muted-foreground">
                    {items[current].role}, {items[current].company}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-primary" : "w-2 bg-border"
                  }`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
