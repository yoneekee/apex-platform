import { motion } from "framer-motion";

interface NarrativeBlock {
  heading: string;
  body: string;
  imagePosition?: "left" | "right";
}

interface NarrativeSectionProps {
  sectionTitle?: string;
  blocks?: NarrativeBlock[];
}

const defaultBlocks: NarrativeBlock[] = [
  {
    heading: "The Art of Precision",
    body: "Every component is meticulously hand-assembled by master artisans in our Geneva atelier. The result is a timepiece that transcends function — it becomes a statement of refined taste and engineering excellence. Over 200 individual parts work in perfect harmony, calibrated to tolerances measured in microns.",
    imagePosition: "right",
  },
  {
    heading: "Material Innovation",
    body: "Aerospace-grade titanium meets centuries-old craftsmanship. The case is machined from a single billet, then hand-polished to achieve both satin and mirror finishes. The sapphire crystal is treated with anti-reflective coating on both sides, ensuring crystal-clear legibility in any lighting condition.",
    imagePosition: "left",
  },
];

const placeholderGradients = ["from-primary/10 to-secondary", "from-secondary to-accent"];

export default function NarrativeSection({
  sectionTitle = "The Story",
  blocks = defaultBlocks,
}: NarrativeSectionProps) {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-16 lg:mb-24 text-center"
        >
          {sectionTitle}
        </motion.h2>

        <div className="space-y-20 lg:space-y-32">
          {blocks.map((block, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                block.imagePosition === "left" ? "lg:direction-rtl" : ""
              }`}
            >
              <div
                className={`space-y-6 ${block.imagePosition === "left" ? "lg:order-2" : ""}`}
              >
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                  {block.heading}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{block.body}</p>
              </div>
              <div
                className={`aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br ${
                  placeholderGradients[i % placeholderGradients.length]
                } ${block.imagePosition === "left" ? "lg:order-1" : ""}`}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-muted-foreground/30 text-sm font-medium tracking-widest uppercase">
                    Editorial Image
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
