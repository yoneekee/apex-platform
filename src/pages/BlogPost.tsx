import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, ArrowLeft, Twitter, Linkedin, Link2, Check, ChevronRight, Mail } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { blogPosts } from "./Blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

// Sample article sections
const articleSections = [
  { id: "introduction", title: "Introduction", content: "Great design doesn't happen by accident. It's the result of deliberate decisions, deep empathy, and a willingness to iterate relentlessly. In this article, we explore the principles and practices that separate good design from truly exceptional work.\n\nThe landscape of digital product design has evolved dramatically over the past decade. What once was a discipline focused primarily on aesthetics has become a strategic function that directly impacts business outcomes." },
  { id: "the-problem", title: "Understanding the Problem", content: "Before we can design solutions, we need to deeply understand the problem space. This means going beyond surface-level user research and diving into the underlying motivations, fears, and aspirations of the people we're designing for.\n\nEthnographic research, contextual inquiry, and jobs-to-be-done frameworks give us the vocabulary to articulate user needs in ways that lead to breakthrough solutions rather than incremental improvements." },
  { id: "design-principles", title: "Core Design Principles", content: "Every design system needs a set of guiding principles that serve as a north star for decision-making. These principles should be specific enough to be actionable but flexible enough to allow for creative interpretation.\n\nClarity over cleverness. Every element should serve a purpose. If something doesn't help the user accomplish their goal, it's visual noise.\n\nConsistency breeds trust. When interactions behave predictably, users develop confidence in the product. This doesn't mean everything must look identical — it means patterns should be learnable." },
  { id: "implementation", title: "From Concept to Code", content: "The gap between design and implementation is where many products lose their polish. Bridging this gap requires close collaboration between designers and engineers, shared vocabulary, and tools that facilitate handoff.\n\nDesign tokens — the atomic values that define a visual language — are the foundation. Colors, spacing, typography, shadows, and motion parameters should be codified in a single source of truth." },
  { id: "measuring-impact", title: "Measuring Design Impact", content: "Design is not purely subjective. We can and should measure the impact of design decisions through both quantitative and qualitative methods.\n\nTask completion rates, time-on-task, error rates, and satisfaction scores provide a quantitative baseline. User interviews and usability testing offer the qualitative depth needed to understand the 'why' behind the numbers." },
  { id: "conclusion", title: "Looking Forward", content: "The future of design lies at the intersection of human creativity and artificial intelligence. AI won't replace designers — it will augment them, handling routine tasks while freeing designers to focus on the strategic and empathetic aspects of their craft.\n\nThe organizations that thrive will be those that invest in design as a core capability, not an afterthought. Design is not decoration. It's how things work." },
];

function ScrollFadeSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease }}
    >
      {children}
    </motion.div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug) || blogPosts[0];
  const [activeSection, setActiveSection] = useState(articleSections[0].id);
  const [copied, setCopied] = useState(false);

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    articleSections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-8 md:pb-12">
        <div className="container-tight">
          <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}>
            <motion.div variants={fadeUp} className="flex items-center gap-2 text-sm mb-6">
              <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
              <span className="text-foreground font-medium truncate">{post.title}</span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">{post.category}</span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" /> {post.readTime} min read
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight leading-[1.15]">
              {post.title}
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {post.excerpt}
            </motion.p>

            <motion.div variants={fadeUp} className="flex items-center gap-4 mt-8 pb-8 border-b border-border/50">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                {post.author.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{post.author.name}</p>
                <p className="text-xs text-muted-foreground">{post.date}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Cover image */}
      <section className="pb-12">
        <div className="container-wide max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease }}
            className="aspect-[2/1] rounded-2xl overflow-hidden"
            style={{ backgroundColor: post.coverColor }}
          >
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Content + ToC */}
      <section className="pb-16 md:pb-24">
        <div className="container-wide max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12">
            {/* Article */}
            <article className="min-w-0">
              {articleSections.map((section) => (
                <ScrollFadeSection key={section.id}>
                  <div id={section.id} className="mb-12">
                    <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-4">
                      {section.title}
                    </h2>
                    {section.content.split("\n\n").map((para, i) => (
                      <p key={i} className="text-base text-muted-foreground leading-[1.8] mb-4 last:mb-0">
                        {para}
                      </p>
                    ))}
                  </div>
                </ScrollFadeSection>
              ))}
            </article>

            {/* Sidebar: ToC + Share */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-8">
                {/* Table of Contents */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Contents</p>
                  <nav className="space-y-1">
                    {articleSections.map((s) => (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        className={`block py-1.5 text-sm transition-all border-l-2 pl-3 ${
                          activeSection === s.id
                            ? "border-primary text-foreground font-medium"
                            : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                        }`}
                      >
                        {s.title}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Share */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Share</p>
                  <div className="flex gap-2">
                    {[
                      { icon: Twitter, label: "Twitter" },
                      { icon: Linkedin, label: "LinkedIn" },
                    ].map((s) => {
                      const Icon = s.icon;
                      return (
                        <button
                          key={s.label}
                          aria-label={s.label}
                          className="w-9 h-9 rounded-xl bg-secondary/80 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary hover:scale-110 transition-all duration-200"
                        >
                          <Icon className="h-4 w-4" />
                        </button>
                      );
                    })}
                    <button
                      onClick={handleCopyLink}
                      aria-label="Copy link"
                      className="w-9 h-9 rounded-xl bg-secondary/80 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary hover:scale-110 transition-all duration-200"
                    >
                      {copied ? <Check className="h-4 w-4 text-primary" /> : <Link2 className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="border-t border-border/50">
        <div className="container-tight py-16 md:py-20">
          <ScrollFadeSection>
            <div className="text-center max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                Stay in the loop
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Get the latest articles, case studies, and product updates delivered to your inbox.
              </p>
              <div className="flex gap-2 mt-6 max-w-sm mx-auto">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="flex-1 h-11 px-4 text-sm bg-secondary/40 border border-border/50 rounded-full outline-none placeholder:text-muted-foreground/60 focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
                />
                <button className="px-5 h-11 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-muted-foreground/60 mt-3">No spam. Unsubscribe anytime.</p>
            </div>
          </ScrollFadeSection>
        </div>
      </section>

      {/* Related posts */}
      <section className="border-t border-border/50 py-16 md:py-20">
        <div className="container-wide">
          <h3 className="text-lg font-semibold text-foreground mb-8">More articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts
              .filter((p) => p.slug !== post.slug)
              .slice(0, 3)
              .map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="group block">
                  <div
                    className="aspect-[16/10] rounded-xl overflow-hidden mb-3"
                    style={{ backgroundColor: p.coverColor }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-primary/8 to-transparent group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-primary">{p.category}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> {p.readTime} min
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {p.title}
                  </h4>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
