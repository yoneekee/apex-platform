import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileQuickActionProps {
  title?: string;
  price?: string;
  actionLabel?: string;
}

export default function MobileQuickAction({
  title = "Meridian Chronograph",
  price = "$4,850",
  actionLabel = "Add to Cart",
}: MobileQuickActionProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden glass-strong border-t border-border/50 px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{title}</p>
              <p className="text-sm text-muted-foreground">{price}</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full shrink-0">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="default" className="rounded-full gap-2 shrink-0">
              <ShoppingBag className="h-4 w-4" />
              {actionLabel}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
