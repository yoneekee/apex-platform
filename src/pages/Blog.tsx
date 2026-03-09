import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ease = [0.22, 1, 0.36, 1] as const;
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  date: string;
  author: { name: string; initials: string };
  coverColor: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "design-systems-at-scale",
    title: "Building Design Systems That Scale",
    excerpt: "How we architected a design system that serves 50+ products while maintaining consistency and developer velocity.",
    category: "Design",
    readTime: 8,
    date: "Mar 5, 2026",
    author: { name: "Sarah Chen", initials: "SC" },
    coverColor: "hsl(221 60% 88%)",
    featured: true,
  },
  {
    slug: "future-of-web-performance",
    title: "The Future of Web Performance",
    excerpt: "Exploring cutting-edge techniques for sub-second page loads and seamless user experiences.",
    category: "Engineering",
    readTime: 6,
    date: "Mar 2, 2026",
    author: { name: "James Miller", initials: "JM" },
    coverColor: "hsl(235 50% 85%)",
  },
  {
    slug: "typography-in-digital-products",
    title: "Typography in Digital Products",
    excerpt: "A deep dive into typographic choices that enhance readability, hierarchy, and brand expression.",
    category: "Design",
    readTime: 10,
    date: "Feb 28, 2026",
    author: { name: "Emily Park", initials: "EP" },
    coverColor: "hsl(210 45% 86%)",
  },
  {
    slug: "ai-powered-workflows",
    title: "AI-Powered Workflows for Creatives",
    excerpt: "How artificial intelligence is reshaping the creative process without replacing human intuition.",
    category: "Technology",
    readTime: 7,
    date: "Feb 24, 2026",
    author: { name: "Alex Rivera", initials: "AR" },
    coverColor: "hsl(250 40% 87%)",
  },
  {
    slug: "minimalism-in-ux",
    title: "The Art of Minimalism in UX",
    excerpt: "Less isn't always more — learning when to simplify and when complexity serves the user.",
    category: "UX",
    readTime: 5,
    date: "Feb 20, 2026",
    author: { name: "Sarah Chen", initials: "SC" },
    coverColor: "hsl(200 50% 88%)",
  },
  {
    slug: "startup-branding-guide",
    title: "The Startup Branding Playbook",
    excerpt: "From naming to visual identity — a comprehensive guide for early-stage companies.",
    category: "Branding",
    readTime: 12,
    date: "Feb 16, 2026",
    author: { name: "James Miller", initials: "JM" },
    coverColor: "hsl(225 55% 84%)",
  },
];

const categories = ["All", "Design", "Engineering", "Technology", "UX", "Branding"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  const featured = filtered.find((p) => p.featured) || filtered[0];
  const rest = filtered.filter((p) => p.slug !== featured?.slug);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 md:pt-36 pb-8 md:pb-12">
        <div className="container-wide">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="text-sm font-medium text-primary tracking-wider uppercase mb-3">
              Blog
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl font-semibold text-foreground tracking-tight">
              Insights & Ideas
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed">
              Thoughts on design, engineering, and building products that matter.
            </motion.p>

            {/* Categories */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    activeCategory === cat
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="pb-12">
          <div className="container-wide">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <Link to={`/blog/${featured.slug}`}>
                <motion.div
                  variants={fadeUp}
                  className="group grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 p-5 md:p-6 rounded-2xl border border-border/50 bg-card hover:border-border hover:shadow-soft transition-all duration-300"
                >
                  <div
                    className="aspect-[16/10] rounded-xl overflow-hidden"
                    style={{ backgroundColor: featured.coverColor }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-transparent group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col justify-center py-2">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                        {featured.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" /> {featured.readTime} min read
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors leading-tight">
                      {featured.title}
                    </h2>
                    <p className="mt-3 text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-3 mt-6">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                        {featured.author.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{featured.author.name}</p>
                        <p className="text-xs text-muted-foreground">{featured.date}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="pb-16 md:pb-24">
        <div className="container-wide">
          <motion.div
            key={activeCategory}
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {rest.map((post) => (
              <motion.div key={post.slug} variants={fadeUp}>
                <Link to={`/blog/${post.slug}`} className="group block">
                  <div
                    className="aspect-[16/10] rounded-xl overflow-hidden mb-4"
                    style={{ backgroundColor: post.coverColor }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-primary/8 to-transparent group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="text-xs font-medium text-primary">{post.category}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> {post.readTime} min
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-semibold text-primary">
                      {post.author.initials}
                    </div>
                    <span className="text-xs text-muted-foreground">{post.author.name}</span>
                    <span className="text-xs text-muted-foreground/50">·</span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {rest.length === 0 && (
            <p className="text-center text-muted-foreground py-16">No posts in this category yet.</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

