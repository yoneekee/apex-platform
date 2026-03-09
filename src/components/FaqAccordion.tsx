import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  title?: string;
  subtitle?: string;
  items?: FaqItem[];
}

const defaultFaqs: FaqItem[] = [
  { question: "How does the modular system work?", answer: "Each section is a self-contained, reusable component with customizable props. Simply import the sections you need, configure them with your content, and arrange them in any order to create your perfect layout." },
  { question: "Is the platform fully responsive?", answer: "Absolutely. Every component is built mobile-first with responsive breakpoints for tablet and desktop. The design adapts fluidly across all screen sizes." },
  { question: "Can I customize the design tokens?", answer: "Yes. All colors, typography, spacing, and effects are controlled through a centralized design system in CSS variables. Change a few values and the entire theme updates consistently." },
  { question: "What about performance and accessibility?", answer: "Performance is a core priority with optimized animations, lazy loading, and minimal bundle size. All components follow WCAG 2.1 AA guidelines with proper ARIA attributes and keyboard navigation." },
  { question: "Do you offer support and updates?", answer: "We provide continuous updates, bug fixes, and new components. Enterprise clients receive priority support with dedicated response times." },
];

export default function FaqAccordion({
  title = "Frequently asked questions",
  subtitle = "Everything you need to know about our platform.",
  items = defaultFaqs,
}: FaqAccordionProps) {
  return (
    <section className="section-padding">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="card-premium px-6 border border-border/50 data-[state=open]:border-border"
              >
                <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
