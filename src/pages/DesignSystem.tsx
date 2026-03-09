import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, Check, X, Plus, Search, Mail, Eye, EyeOff,
  Sun, Moon, Heart, Star, Bell, Settings, Download, Upload,
  Loader2, ChevronRight, AlertCircle, Info, Copy,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useTheme } from "@/hooks/use-theme";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";

const ease = [0.22, 1, 0.36, 1] as const;
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
};

const colors = [
  { name: "Background", var: "--background", class: "bg-background" },
  { name: "Foreground", var: "--foreground", class: "bg-foreground" },
  { name: "Primary", var: "--primary", class: "bg-primary" },
  { name: "Primary FG", var: "--primary-foreground", class: "bg-primary-foreground" },
  { name: "Secondary", var: "--secondary", class: "bg-secondary" },
  { name: "Secondary FG", var: "--secondary-foreground", class: "bg-secondary-foreground" },
  { name: "Muted", var: "--muted", class: "bg-muted" },
  { name: "Muted FG", var: "--muted-foreground", class: "bg-muted-foreground" },
  { name: "Accent", var: "--accent", class: "bg-accent" },
  { name: "Accent FG", var: "--accent-foreground", class: "bg-accent-foreground" },
  { name: "Destructive", var: "--destructive", class: "bg-destructive" },
  { name: "Border", var: "--border", class: "bg-border" },
  { name: "Input", var: "--input", class: "bg-input" },
  { name: "Ring", var: "--ring", class: "bg-ring" },
  { name: "Card", var: "--card", class: "bg-card" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.section variants={fadeUp} className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold text-foreground tracking-tight">{title}</h2>
        <div className="flex-1 h-px bg-border/50" />
      </div>
      {children}
    </motion.section>
  );
}

function ColorSwatch({ name, cssVar, className }: { name: string; cssVar: string; className: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(cssVar);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={handleCopy} className="group text-left">
      <div className={`h-16 rounded-xl ${className} border border-border/30 mb-2 relative overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-foreground/10">
          {copied ? <Check className="h-4 w-4 text-primary-foreground" /> : <Copy className="h-4 w-4 text-primary-foreground" />}
        </div>
      </div>
      <p className="text-xs font-medium text-foreground">{name}</p>
      <p className="text-[10px] text-muted-foreground font-mono">{cssVar}</p>
    </button>
  );
}

export default function DesignSystem() {
  const { setIsOpen } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-lg font-semibold text-foreground tracking-tight">
              Platform<span className="text-primary">.</span>
            </a>
            <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">Design System</span>
          </div>
          <button onClick={toggleTheme} className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-16">

          {/* Intro */}
          <motion.div variants={fadeUp}>
            <p className="text-sm font-medium text-primary tracking-wider uppercase mb-2">Style Guide</p>
            <h1 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">Master Design System</h1>
            <p className="mt-3 text-muted-foreground max-w-xl leading-relaxed">
              A living reference of all typography, colors, components, and patterns used across the platform.
            </p>
          </motion.div>

          {/* ─── Typography ─── */}
          <Section title="Typography">
            <div className="space-y-6 p-6 rounded-2xl border border-border/50 bg-card">
              <div className="space-y-4">
                <h1 className="text-5xl font-semibold text-foreground tracking-tight">Heading 1 — 3rem</h1>
                <h2 className="text-3xl font-semibold text-foreground tracking-tight">Heading 2 — 1.875rem</h2>
                <h3 className="text-2xl font-semibold text-foreground tracking-tight">Heading 3 — 1.5rem</h3>
                <h4 className="text-xl font-semibold text-foreground">Heading 4 — 1.25rem</h4>
                <h5 className="text-lg font-semibold text-foreground">Heading 5 — 1.125rem</h5>
                <h6 className="text-base font-semibold text-foreground">Heading 6 — 1rem</h6>
              </div>
              <div className="border-t border-border/50 pt-4 space-y-3">
                <p className="text-base text-foreground leading-relaxed">Body text — The quick brown fox jumps over the lazy dog. This is the standard body copy used throughout the platform.</p>
                <p className="text-sm text-muted-foreground leading-relaxed">Small text — Secondary information, captions, and metadata use this style for visual hierarchy.</p>
                <p className="text-xs text-muted-foreground">Extra small — Labels, badges, and micro-copy.</p>
              </div>
              <div className="border-t border-border/50 pt-4 space-y-2">
                <a href="#" className="text-sm font-medium text-primary hover:underline">Standard link style</a>
                <span className="block"><span className="link-underline text-sm font-medium text-foreground cursor-pointer">Animated underline link</span></span>
                <p className="text-sm"><span className="text-gradient-primary font-semibold">Gradient text accent</span></p>
              </div>
            </div>
          </Section>

          {/* ─── Colors ─── */}
          <Section title="Colors">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {colors.map((c) => (
                <ColorSwatch key={c.var} name={c.name} cssVar={c.var} className={c.class} />
              ))}
            </div>
            <div className="p-4 rounded-xl border border-border/50 bg-secondary/30">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Note:</span> All colors use HSL values via CSS custom properties. Toggle dark mode above to see dark variants.
              </p>
            </div>
          </Section>

          {/* ─── Buttons ─── */}
          <Section title="Buttons">
            <div className="p-6 rounded-2xl border border-border/50 bg-card space-y-6">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Variants</p>
                <div className="flex flex-wrap gap-3">
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Sizes</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button>Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon"><Plus className="h-4 w-4" /></Button>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">States & Icons</p>
                <div className="flex flex-wrap gap-3">
                  <Button disabled>Disabled</Button>
                  <Button disabled><Loader2 className="h-4 w-4 animate-spin" /> Loading</Button>
                  <Button><Download className="h-4 w-4" /> Download</Button>
                  <Button variant="outline"><Heart className="h-4 w-4" /> Favorite</Button>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Custom (Rounded Full)</p>
                <div className="flex flex-wrap gap-3">
                  <button className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </button>
                  <button className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium border border-border text-foreground rounded-full hover:bg-foreground hover:text-background transition-all">
                    Learn More
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-foreground text-background rounded-full hover:opacity-90 transition-opacity">
                    Dark CTA
                  </button>
                </div>
              </div>
            </div>
          </Section>

          {/* ─── Inputs ─── */}
          <Section title="Form Inputs">
            <div className="p-6 rounded-2xl border border-border/50 bg-card space-y-5 max-w-md">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-foreground">Default Input</label>
                <input placeholder="Placeholder text" className="w-full h-11 px-4 text-sm bg-secondary/40 border border-border/50 rounded-xl outline-none placeholder:text-muted-foreground/60 focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-foreground">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full h-11 px-4 pr-11 text-sm bg-secondary/40 border border-border/50 rounded-xl outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-foreground">With Error</label>
                <input defaultValue="bad@" className="w-full h-11 px-4 text-sm bg-secondary/40 border border-destructive rounded-xl outline-none focus:ring-2 focus:ring-destructive/10 transition-all" />
                <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Please enter a valid email</p>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-foreground">Textarea</label>
                <textarea rows={3} placeholder="Write something..." className="w-full px-4 py-3 text-sm bg-secondary/40 border border-border/50 rounded-xl outline-none resize-none placeholder:text-muted-foreground/60 focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-foreground">Search (Rounded)</label>
                <div className="relative group">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input placeholder="Search..." className="w-full h-10 pl-10 pr-4 text-sm bg-secondary/50 border border-border/50 rounded-full outline-none placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all" />
                </div>
              </div>
            </div>
          </Section>

          {/* ─── Cards & Glass ─── */}
          <Section title="Cards & Glassmorphism">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="card-premium p-6">
                <h4 className="text-sm font-semibold text-foreground mb-1">Premium Card</h4>
                <p className="text-xs text-muted-foreground">Uses <code className="text-[10px] bg-secondary px-1 py-0.5 rounded">.card-premium</code> class with hover shadow elevation.</p>
              </div>
              <div className="glass rounded-2xl p-6">
                <h4 className="text-sm font-semibold text-foreground mb-1">Glass</h4>
                <p className="text-xs text-muted-foreground">Uses <code className="text-[10px] bg-secondary px-1 py-0.5 rounded">.glass</code> — 70% opacity + backdrop blur.</p>
              </div>
              <div className="glass-strong rounded-2xl p-6">
                <h4 className="text-sm font-semibold text-foreground mb-1">Glass Strong</h4>
                <p className="text-xs text-muted-foreground">Uses <code className="text-[10px] bg-secondary px-1 py-0.5 rounded">.glass-strong</code> — 90% opacity + heavy blur.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="shadow-soft rounded-2xl border border-border/50 bg-card p-6">
                <h4 className="text-sm font-semibold text-foreground mb-1">Shadow Soft</h4>
                <p className="text-xs text-muted-foreground">Subtle drop shadow for lightweight elevation.</p>
              </div>
              <div className="shadow-elevated rounded-2xl border border-border/50 bg-card p-6">
                <h4 className="text-sm font-semibold text-foreground mb-1">Shadow Elevated</h4>
                <p className="text-xs text-muted-foreground">Dramatic shadow for modals and popovers.</p>
              </div>
            </div>
          </Section>

          {/* ─── Modals, Drawers & Toasts ─── */}
          <Section title="Overlays & Feedback">
            <div className="p-6 rounded-2xl border border-border/50 bg-card">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Trigger Components</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setIsOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-xl text-foreground hover:bg-accent transition-colors"
                >
                  Open Cart Drawer
                </button>

                <Dialog>
                  <DialogTrigger asChild>
                    <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-xl text-foreground hover:bg-accent transition-colors">
                      Open Modal
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Sample Modal</DialogTitle>
                      <DialogDescription>This is a sample dialog using the shadcn Dialog component, styled with the platform's design tokens.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm text-muted-foreground">Modal content goes here. All colors and spacing inherit from the theme.</p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <button
                  onClick={() => toast({ title: "Success!", description: "Your changes have been saved." })}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-xl text-foreground hover:bg-accent transition-colors"
                >
                  <Check className="h-4 w-4" /> Success Toast
                </button>

                <button
                  onClick={() => toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" })}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-xl text-foreground hover:bg-accent transition-colors"
                >
                  <X className="h-4 w-4" /> Error Toast
                </button>

                <button
                  onClick={() => toast({ title: "Heads up", description: "This action cannot be undone." })}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-xl text-foreground hover:bg-accent transition-colors"
                >
                  <Info className="h-4 w-4" /> Info Toast
                </button>
              </div>
            </div>
          </Section>

          {/* ─── Spacing & Layout ─── */}
          <Section title="Spacing & Layout Tokens">
            <div className="p-6 rounded-2xl border border-border/50 bg-card space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                {[
                  { label: ".container-tight", desc: "max-w-5xl, centered" },
                  { label: ".container-wide", desc: "max-w-7xl, centered" },
                  { label: ".section-padding", desc: "py-20 md:py-28 lg:py-32" },
                  { label: "--radius", desc: "0.75rem (border-radius)" },
                  { label: "--shadow-soft", desc: "Subtle card shadow" },
                  { label: "--shadow-elevated", desc: "Modal/popover shadow" },
                ].map((t) => (
                  <div key={t.label} className="p-3 rounded-xl bg-secondary/50">
                    <code className="font-mono text-[11px] text-primary">{t.label}</code>
                    <p className="text-muted-foreground mt-0.5">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* ─── Animation ─── */}
          <Section title="Animation Patterns">
            <div className="p-6 rounded-2xl border border-border/50 bg-card space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Fade Up", desc: "opacity 0→1, y 20→0, staggered" },
                  { label: "Spring Toggle", desc: "layoutId + spring for tabs/toggles" },
                  { label: "Scroll Reveal", desc: "useInView + fade for article sections" },
                ].map((a) => (
                  <div key={a.label} className="p-4 rounded-xl border border-border/50">
                    <p className="text-sm font-medium text-foreground">{a.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{a.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Ease curve: <code className="font-mono text-[11px] text-primary">[0.22, 1, 0.36, 1]</code> — used consistently across all page transitions.
              </p>
            </div>
          </Section>

        </motion.div>
      </main>

      <div className="border-t border-border/50 py-8">
        <p className="text-center text-xs text-muted-foreground">Platform Design System — Synced with tailwind.config.ts & index.css</p>
      </div>
    </div>
  );
}
