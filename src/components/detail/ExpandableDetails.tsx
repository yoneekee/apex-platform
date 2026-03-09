import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface DetailSection {
  title: string;
  content: string;
}

interface ExpandableDetailsProps {
  sections?: DetailSection[];
}

const defaultSections: DetailSection[] = [
  {
    title: "Specifications",
    content:
      "Crafted from Grade 5 Titanium with a sapphire crystal case back. The automatic movement offers a 72-hour power reserve with chronometer-certified precision of -2/+2 seconds per day. Dial features Super-LumiNova markers for optimal legibility.",
  },
  {
    title: "Shipping & Returns",
    content:
      "Complimentary worldwide shipping via insured express courier. Orders ship within 2–3 business days. Full returns accepted within 30 days in original condition. Each piece arrives in a hand-crafted presentation box.",
  },
  {
    title: "Care & Warranty",
    content:
      "Backed by a 5-year international warranty covering manufacturing defects. We recommend servicing every 4–5 years. Avoid exposure to extreme magnetic fields. Clean with a soft microfiber cloth.",
  },
  {
    title: "Technical Details",
    content:
      "Movement: Caliber 3255, self-winding mechanical. Frequency: 28,800 vibrations/hour (4 Hz). Jewels: 31. Functions: Hours, minutes, seconds, instantaneous date with rapid setting. Certified Superlative Chronometer (COSC + proprietary testing).",
  },
];

export default function ExpandableDetails({ sections = defaultSections }: ExpandableDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Accordion type="single" collapsible className="space-y-2">
        {sections.map((section, i) => (
          <AccordionItem
            key={i}
            value={`detail-${i}`}
            className="card-premium px-6 border border-border/50 data-[state=open]:border-border"
          >
            <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:no-underline py-4">
              {section.title}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
              {section.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  );
}
