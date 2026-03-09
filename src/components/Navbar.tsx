import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight, ShoppingBag, Sun, Moon } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useTheme } from "@/hooks/use-theme";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; description: string; href: string }[];
}

const defaultNavItems: NavItem[] = [
  {
    label: "Products",
    href: "#products",
    children: [
      { label: "Analytics", description: "Powerful insights for your business", href: "#" },
      { label: "Automation", description: "Streamline your workflows", href: "#" },
      { label: "Security", description: "Enterprise-grade protection", href: "#" },
    ],
  },
  { label: "Features", href: "#features" },
  { label: "Collection", href: "/collection" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

interface NavbarProps {
  items?: NavItem[];
  logo?: string;
}

function CartButton() {
  const { totalItems, setIsOpen } = useCart();
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Open cart"
    >
      <ShoppingBag className="h-4 w-4" />
      {totalItems > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] font-semibold bg-primary text-primary-foreground rounded-full flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  );
}

export default function Navbar({ items = defaultNavItems, logo = "Platform" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass shadow-soft" : "bg-transparent"
        }`}
      >
        <div className="container-wide flex items-center justify-between h-16 md:h-20">
          <a href="#" className="text-xl font-semibold tracking-tight text-foreground">
            {logo}<span className="text-primary">.</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {items.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setMegaOpen(item.label)}
                onMouseLeave={() => setMegaOpen(null)}
              >
                <a
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg"
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-3 w-3" />}
                </a>

                {/* Mega menu */}
                <AnimatePresence>
                  {item.children && megaOpen === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 pt-2 w-72"
                    >
                      <div className="glass-strong rounded-xl shadow-elevated p-2">
                        {item.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            className="flex flex-col gap-0.5 p-3 rounded-lg hover:bg-accent transition-colors group"
                          >
                            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                              {child.label}
                            </span>
                            <span className="text-xs text-muted-foreground">{child.description}</span>
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </motion.div>
              </AnimatePresence>
            </button>
            <CartButton />
            <a href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
              Sign In
            </a>
            <a
              href="/signup"
              className="inline-flex items-center gap-2 text-sm font-medium bg-primary text-primary-foreground px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Get Started <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-background z-50 shadow-elevated md:hidden"
            >
              <div className="flex flex-col p-6 pt-20 gap-1">
                {items.map((item) => (
                  <div key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between py-3 text-base font-medium text-foreground border-b border-border/50"
                    >
                      {item.label}
                      {item.children && <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                    </a>
                  </div>
                ))}
                <div className="mt-6 flex flex-col gap-3">
                  <a href="/login" className="text-center text-sm font-medium py-3 border border-border rounded-full text-foreground">
                    Sign In
                  </a>
                  <a href="/signup" className="text-center text-sm font-medium py-3 bg-primary text-primary-foreground rounded-full">
                    Get Started
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
