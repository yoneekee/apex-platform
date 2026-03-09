import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Home,
  FileText,
  ShoppingBag,
  BarChart3,
  Settings,
  User,
  Mail,
  CreditCard,
  Layers,
  Image,
  Palette,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CommandItem {
  label: string;
  href: string;
  icon: React.ElementType;
  group: string;
}

const commandItems: CommandItem[] = [
  { label: "Home", href: "/", icon: Home, group: "Pages" },
  { label: "Collection & Search", href: "/collection", icon: Layers, group: "Pages" },
  { label: "Pricing & Plans", href: "/pricing", icon: CreditCard, group: "Pages" },
  { label: "Blog", href: "/blog", icon: BookOpen, group: "Pages" },
  { label: "About", href: "/about", icon: User, group: "Pages" },
  { label: "Contact", href: "/contact", icon: Mail, group: "Pages" },
  { label: "Detail View", href: "/detail", icon: Image, group: "Pages" },
  { label: "Dashboard", href: "/dashboard", icon: BarChart3, group: "App" },
  { label: "Settings", href: "/settings", icon: Settings, group: "App" },
  { label: "Checkout", href: "/checkout", icon: ShoppingBag, group: "App" },
  { label: "Login", href: "/login", icon: User, group: "Auth" },
  { label: "Sign Up", href: "/signup", icon: FileText, group: "Auth" },
  { label: "Design System", href: "/design-system", icon: Palette, group: "Dev" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();

  const filtered = query
    ? commandItems.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    : commandItems;

  const groups = [...new Set(filtered.map((i) => i.group))];

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Reset on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
    }
  }, [open]);

  // Arrow keys + enter
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      } else if (e.key === "Enter" && filtered[selected]) {
        navigate(filtered[selected].href);
        setOpen(false);
      }
    },
    [filtered, selected, navigate]
  );

  const goTo = (href: string) => {
    navigate(href);
    setOpen(false);
  };

  return (
    <>
      {/* Trigger button in navbar */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 h-9 px-3 text-xs text-muted-foreground border border-border/50 rounded-lg hover:border-border hover:text-foreground transition-colors"
      >
        <Search className="h-3.5 w-3.5" />
        <span>Search...</span>
        <kbd className="ml-2 text-[10px] font-mono bg-secondary/80 px-1.5 py-0.5 rounded">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-[60]"
              onClick={() => setOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-[61]"
            >
              <div className="mx-4 glass-strong rounded-2xl shadow-elevated overflow-hidden">
                {/* Search input */}
                <div className="flex items-center gap-3 px-4 border-b border-border/50">
                  <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
                    onKeyDown={handleKeyDown}
                    placeholder="Search pages..."
                    className="flex-1 h-12 text-sm bg-transparent outline-none placeholder:text-muted-foreground/60 text-foreground"
                  />
                  <kbd className="text-[10px] font-mono text-muted-foreground bg-secondary/80 px-1.5 py-0.5 rounded">ESC</kbd>
                </div>

                {/* Results */}
                <div className="max-h-72 overflow-y-auto py-2">
                  {filtered.length === 0 ? (
                    <div className="py-8 text-center">
                      <p className="text-sm text-muted-foreground">No results found</p>
                    </div>
                  ) : (
                    groups.map((group) => {
                      const items = filtered.filter((i) => i.group === group);
                      return (
                        <div key={group}>
                          <p className="px-4 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                            {group}
                          </p>
                          {items.map((item) => {
                            const globalIndex = filtered.indexOf(item);
                            const Icon = item.icon;
                            const isSelected = globalIndex === selected;
                            return (
                              <button
                                key={item.href}
                                onClick={() => goTo(item.href)}
                                onMouseEnter={() => setSelected(globalIndex)}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                                  isSelected
                                    ? "bg-accent text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                              >
                                <Icon className="h-4 w-4 shrink-0" />
                                <span className="flex-1 text-left font-medium">{item.label}</span>
                                {isSelected && <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />}
                              </button>
                            );
                          })}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center gap-4 px-4 py-2.5 border-t border-border/50 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><kbd className="font-mono bg-secondary/80 px-1 py-0.5 rounded">↑↓</kbd> Navigate</span>
                  <span className="flex items-center gap-1"><kbd className="font-mono bg-secondary/80 px-1 py-0.5 rounded">↵</kbd> Open</span>
                  <span className="flex items-center gap-1"><kbd className="font-mono bg-secondary/80 px-1 py-0.5 rounded">Esc</kbd> Close</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
