import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  Heart,
  Eye,
  ChevronDown,
  Grid3X3,
  LayoutList,
  ArrowUpDown,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// --- Types ---
interface CollectionItem {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  price?: number;
  image: string;
}

// --- Sample Data ---
const sampleItems: CollectionItem[] = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  title: [
    "Horizon Dashboard",
    "Lumina Brand Suite",
    "Vertex Analytics",
    "Prism Mobile App",
    "Echo Design System",
    "Nimbus Cloud Platform",
    "Atlas Mapping Tool",
    "Zenith Portfolio",
    "Cascade E-commerce",
    "Meridian CRM",
    "Nova Landing Page",
    "Orbit SaaS Platform",
  ][i % 12],
  subtitle: [
    "UI/UX Design",
    "Brand Identity",
    "Data Visualization",
    "Mobile Design",
    "Design Systems",
    "Web Application",
    "Interactive Maps",
    "Portfolio Design",
    "E-commerce",
    "Enterprise Software",
    "Marketing",
    "SaaS Product",
  ][i % 12],
  category: ["Design", "Development", "Branding", "Strategy"][i % 4],
  tags: [["ui", "web"], ["brand", "identity"], ["data", "analytics"], ["mobile", "app"]][i % 4],
  price: [49, 129, 89, 199, 69, 149, 99, 179, 59, 139, 79, 159][i % 12],
  image: `hsl(${210 + (i * 15) % 60} ${40 + (i * 5) % 30}% ${88 - (i * 2) % 15}%)`,
}));

const categories = ["All", "Design", "Development", "Branding", "Strategy"];
const sortOptions = ["Newest", "Popular", "Price: Low–High", "Price: High–Low", "A–Z"];
const ITEMS_PER_PAGE = 9;

// --- Animation Configs ---
const ease = [0.22, 1, 0.36, 1] as const;
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

// --- Component ---
export default function Collection() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    let items = [...sampleItems];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.subtitle.toLowerCase().includes(q) ||
          i.tags.some((t) => t.includes(q))
      );
    }
    if (category !== "All") items = items.filter((i) => i.category === category);
    items = items.filter((i) => (i.price ?? 0) >= priceRange[0] && (i.price ?? 200) <= priceRange[1]);
    switch (sort) {
      case "Price: Low–High":
        items.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case "Price: High–Low":
        items.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case "A–Z":
        items.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    return items;
  }, [search, category, sort, priceRange]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = page * ITEMS_PER_PAGE < filtered.length;

  const toggleWishlist = (id: number) =>
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero / Header */}
      <section className="pt-28 md:pt-36 pb-8 md:pb-12">
        <div className="container-wide">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.p variants={fadeUp} className="text-sm font-medium text-primary tracking-wider uppercase mb-3">
              Collection
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl font-semibold text-foreground tracking-tight leading-tight">
              Explore our work
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
              Browse through our curated collection of projects, products, and case studies.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="sticky top-16 md:top-20 z-30 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container-wide flex items-center gap-3 py-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <input
              type="text"
              placeholder="Search items..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full h-10 pl-10 pr-10 text-sm bg-secondary/50 border border-border/50 rounded-full outline-none placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
            />
            {search && (
              <button onClick={() => { setSearch(""); setPage(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Desktop categories */}
          <div className="hidden lg:flex items-center gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setCategory(cat); setPage(1); }}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  category === cat
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 h-10 px-4 text-sm font-medium text-muted-foreground border border-border/50 rounded-full hover:border-border hover:text-foreground transition-all"
            >
              <ArrowUpDown className="h-3.5 w-3.5" />
              {sort}
              <ChevronDown className={`h-3 w-3 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-48 glass-strong rounded-xl shadow-elevated p-1 z-50"
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setSort(opt); setSortOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                        sort === opt ? "bg-accent text-foreground font-medium" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* View toggle */}
          <div className="hidden md:flex items-center border border-border/50 rounded-full overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 transition-colors ${viewMode === "grid" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 transition-colors ${viewMode === "list" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
            >
              <LayoutList className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile filter button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex items-center gap-2 h-10 px-4 text-sm font-medium text-muted-foreground border border-border/50 rounded-full hover:border-border hover:text-foreground transition-all"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-wide py-8 md:py-12 flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <FilterPanel
            category={category}
            setCategory={(c) => { setCategory(c); setPage(1); }}
            priceRange={priceRange}
            setPriceRange={(r) => { setPriceRange(r); setPage(1); }}
            sort={sort}
            setSort={setSort}
          />
        </aside>

        {/* Grid */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              {filtered.length} item{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>

          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <Search className="h-10 w-10 text-muted-foreground/40 mb-4" />
              <p className="text-lg font-medium text-foreground mb-1">No results found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
              <button
                onClick={() => { setSearch(""); setCategory("All"); setPriceRange([0, 200]); setPage(1); }}
                className="mt-4 text-sm font-medium text-primary hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          ) : (
            <>
              <motion.div
                key={`${category}-${sort}-${search}-${viewMode}`}
                initial="hidden"
                animate="visible"
                variants={stagger}
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                    : "flex flex-col gap-4"
                }
              >
                {paginated.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    viewMode={viewMode}
                    wishlisted={wishlist.has(item.id)}
                    onToggleWishlist={() => toggleWishlist(item.id)}
                  />
                ))}
              </motion.div>

              {/* Load More */}
              {hasMore && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    className="group inline-flex items-center gap-2 px-8 py-3 text-sm font-medium text-foreground border border-border rounded-full hover:bg-foreground hover:text-background transition-all duration-300"
                  >
                    Load more
                    <span className="text-xs text-muted-foreground group-hover:text-background/70 transition-colors">
                      ({filtered.length - paginated.length} remaining)
                    </span>
                  </button>
                </div>
              )}

              {/* Page indicator */}
              {!hasMore && filtered.length > ITEMS_PER_PAGE && (
                <p className="text-center text-sm text-muted-foreground mt-12">
                  You've seen all {filtered.length} items
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-background z-50 shadow-elevated lg:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <h3 className="text-lg font-semibold text-foreground">Filters</h3>
                <button onClick={() => setSidebarOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">
                <FilterPanel
                  category={category}
                  setCategory={(c) => { setCategory(c); setPage(1); }}
                  priceRange={priceRange}
                  setPriceRange={(r) => { setPriceRange(r); setPage(1); }}
                  sort={sort}
                  setSort={setSort}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

// --- Filter Panel ---
function FilterPanel({
  category,
  setCategory,
  priceRange,
  setPriceRange,
  sort,
  setSort,
}: {
  category: string;
  setCategory: (c: string) => void;
  priceRange: [number, number];
  setPriceRange: (r: [number, number]) => void;
  sort: string;
  setSort: (s: string) => void;
}) {
  return (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Category</h4>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all ${
                category === cat
                  ? "bg-accent text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Price Range</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span className="flex-1 h-px bg-border" />
            <span>${priceRange[1]}</span>
          </div>
          <input
            type="range"
            min={0}
            max={200}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full accent-primary h-1 bg-secondary rounded-full appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Sort (mobile) */}
      <div className="lg:hidden">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Sort By</h4>
        <div className="space-y-1">
          {sortOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setSort(opt)}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all ${
                sort === opt
                  ? "bg-accent text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Item Card ---
function ItemCard({
  item,
  viewMode,
  wishlisted,
  onToggleWishlist,
}: {
  item: CollectionItem;
  viewMode: "grid" | "list";
  wishlisted: boolean;
  onToggleWishlist: () => void;
}) {
  if (viewMode === "list") {
    return (
      <motion.div
        variants={fadeUp}
        className="group flex items-center gap-5 p-4 rounded-2xl border border-border/30 hover:border-border/60 hover:shadow-soft transition-all duration-300 cursor-pointer"
      >
        <div
          className="w-20 h-20 rounded-xl shrink-0 overflow-hidden"
          style={{ backgroundColor: item.image }}
        >
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-transparent" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">{item.subtitle}</p>
        </div>
        <span className="text-xs font-medium text-muted-foreground bg-secondary/80 px-2.5 py-1 rounded-full">
          {item.category}
        </span>
        {item.price && (
          <span className="text-sm font-semibold text-foreground">${item.price}</span>
        )}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={onToggleWishlist} className="p-2 rounded-full hover:bg-accent transition-colors">
            <Heart className={`h-4 w-4 ${wishlisted ? "fill-primary text-primary" : "text-muted-foreground"}`} />
          </button>
          <button className="p-2 rounded-full hover:bg-accent transition-colors">
            <Eye className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeUp}
      className="group cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
        <div
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundColor: item.image }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/5 to-transparent" />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />

        {/* Quick actions */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <button
            onClick={(e) => { e.stopPropagation(); onToggleWishlist(); }}
            className="p-2.5 rounded-full bg-background/90 backdrop-blur-sm shadow-sm hover:bg-background transition-colors"
          >
            <Heart className={`h-4 w-4 ${wishlisted ? "fill-primary text-primary" : "text-foreground"}`} />
          </button>
          <button className="p-2.5 rounded-full bg-background/90 backdrop-blur-sm shadow-sm hover:bg-background transition-colors">
            <Eye className="h-4 w-4 text-foreground" />
          </button>
        </div>

        {/* Category badge */}
        <div className="absolute bottom-3 left-3">
          <span className="text-xs font-medium bg-background/90 backdrop-blur-sm text-foreground px-3 py-1.5 rounded-full">
            {item.category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">{item.subtitle}</p>
        </div>
        {item.price && (
          <span className="text-sm font-semibold text-foreground shrink-0">
            ${item.price}
          </span>
        )}
      </div>
    </motion.div>
  );
}
