import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

interface HeroProps {
  variant?: "centered" | "split" | "video";
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  imageSrc?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as const },
  }),
} as const;


export default function HeroSection({
  variant = "centered",
  title = "Build something\nremarkable.",
  subtitle = "A premium, modular platform designed for visionaries. Create stunning digital experiences with sophisticated simplicity.",
  ctaLabel = "Start Building",
  ctaHref = "#features",
  secondaryLabel = "Watch Demo",
  secondaryHref = "#",
  imageSrc,
}: HeroProps) {
  if (variant === "split") {
    return (
      <section className="min-h-screen flex items-center section-padding pt-32">
        <div className="container-wide grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial="hidden" animate="visible" className="space-y-8">
            <motion.h1
              custom={0}
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-foreground whitespace-pre-line"
            >
              {title}
            </motion.h1>
            <motion.p custom={1} variants={fadeUp} className="text-lg text-muted-foreground max-w-md leading-relaxed">
              {subtitle}
            </motion.p>
            <motion.div custom={2} variants={fadeUp} className="flex flex-wrap gap-4">
              <a href={ctaHref} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                {ctaLabel} <ArrowRight className="h-4 w-4" />
              </a>
              <a href={secondaryHref} className="inline-flex items-center gap-2 border border-border text-foreground px-7 py-3.5 rounded-full text-sm font-medium hover:bg-accent transition-colors">
                <Play className="h-4 w-4" /> {secondaryLabel}
              </a>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-secondary to-accent overflow-hidden shadow-elevated">
              {imageSrc ? (
                <img src={imageSrc} alt="Hero" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-lg bg-primary/20" />
                  </div>
                </div>
              )}
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>
    );
  }

  // Centered (default) and video variants
  return (
    <section className="relative min-h-screen flex items-center justify-center section-padding pt-32 overflow-hidden">
      {variant === "video" && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-foreground/60 z-10" />
          <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
            <source src="/video-bg.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      <div className={`relative z-10 container-tight text-center ${variant === "video" ? "[&_*]:!text-primary-foreground" : ""}`}>
        <motion.div initial="hidden" animate="visible" className="space-y-8">
          <motion.div custom={0} variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              Now Available — v2.0 Release
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] tracking-tight text-foreground whitespace-pre-line"
          >
            {title}
          </motion.h1>

          <motion.p custom={2} variants={fadeUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </motion.p>

          <motion.div custom={3} variants={fadeUp} className="flex flex-wrap justify-center gap-4">
            <a href={ctaHref} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/25">
              {ctaLabel} <ArrowRight className="h-4 w-4" />
            </a>
            <a href={secondaryHref} className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-4 rounded-full text-sm font-medium hover:bg-accent transition-colors">
              <Play className="h-4 w-4" /> {secondaryLabel}
            </a>
          </motion.div>

          {/* Floating decorative elements */}
          <motion.div
            custom={4}
            variants={fadeUp}
            className="pt-12 flex justify-center"
          >
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                99.9% Uptime
              </span>
              <span className="w-px h-4 bg-border" />
              <span>Enterprise Ready</span>
              <span className="w-px h-4 bg-border" />
              <span>SOC 2 Certified</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background gradients */}
      {variant !== "video" && (
        <>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        </>
      )}
    </section>
  );
}
