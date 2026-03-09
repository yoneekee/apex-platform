import { motion } from "framer-motion";
import { Award, Users, TrendingUp } from "lucide-react";

interface AboutSectionProps {
  title?: string;
  description?: string;
  stats?: { icon: any; value: string; label: string }[];
}

export default function AboutSection({
  title = "Crafting digital\nexperiences since 2018",
  description = "We're a collective of designers, engineers, and strategists who believe in the power of thoughtful design. Every pixel is intentional, every interaction is considered, and every experience is crafted to delight.",
  stats = [
    { icon: Award, value: "150+", label: "Projects Delivered" },
    { icon: Users, value: "40+", label: "Team Members" },
    { icon: TrendingUp, value: "98%", label: "Client Retention" },
  ],
}: AboutSectionProps) {
  return (
    <section id="about" className="section-padding">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image composition */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="grid grid-cols-12 grid-rows-6 gap-4 h-[500px]">
              <div className="col-span-7 row-span-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden" />
              <div className="col-span-5 row-span-3 rounded-2xl bg-secondary" />
              <div className="col-span-5 row-span-3 col-start-8 row-start-4 rounded-2xl bg-gradient-to-br from-secondary to-accent" />
              <div className="col-span-7 row-span-2 row-start-5 rounded-2xl bg-primary/5" />
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-[1.1] whitespace-pre-line">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>

            <div className="grid grid-cols-3 gap-6 pt-4">
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <stat.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  <div className="text-2xl sm:text-3xl font-semibold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
