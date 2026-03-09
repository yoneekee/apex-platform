import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MediaGalleryProps {
  images?: { src: string; alt: string }[];
}

const defaultImages = [
  { src: "", alt: "Primary view" },
  { src: "", alt: "Detail view" },
  { src: "", alt: "Alternate angle" },
  { src: "", alt: "Context view" },
];

const placeholderGradients = [
  "from-primary/20 to-accent",
  "from-accent to-secondary",
  "from-secondary to-muted",
  "from-muted to-primary/10",
];

export default function MediaGallery({ images = defaultImages }: MediaGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-3 lg:sticky lg:top-24">
      {/* Main image */}
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-secondary">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
            className="absolute inset-0"
          >
            {images[active]?.src ? (
              <img
                src={images[active].src}
                alt={images[active].alt}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className={`w-full h-full bg-gradient-to-br ${placeholderGradients[active % placeholderGradients.length]} flex items-center justify-center`}
              >
                <span className="text-muted-foreground/40 text-sm font-medium tracking-widest uppercase">
                  {images[active]?.alt || "Image"}
                </span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
              i === active
                ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            {img.src ? (
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            ) : (
              <div
                className={`w-full h-full bg-gradient-to-br ${placeholderGradients[i % placeholderGradients.length]}`}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
