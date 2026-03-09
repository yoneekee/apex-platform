import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Settings,
  Bell,
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  FileText,
  Zap,
  FolderOpen,
  ChevronRight,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const ease = [0.22, 1, 0.36, 1] as const;
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
};

const sidebarNav = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Notifications", icon: Bell, href: "/dashboard/notifications" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

const stats = [
  { label: "Total Views", value: "24,531", change: "+12.5%", up: true, icon: Eye },
  { label: "Revenue", value: "$8,420", change: "+8.2%", up: true, icon: BarChart3 },
  { label: "Users", value: "1,204", change: "+23.1%", up: true, icon: Users },
  { label: "Growth", value: "14.2%", change: "-2.4%", up: false, icon: TrendingUp },
];

const activity = [
  { title: "New project created", desc: "Horizon Dashboard v2.0", time: "2 min ago", icon: FolderOpen },
  { title: "Invoice paid", desc: "Invoice #1042 — $2,400", time: "1 hour ago", icon: FileText },
  { title: "Team member joined", desc: "Sarah Chen accepted invite", time: "3 hours ago", icon: Users },
  { title: "Deployment complete", desc: "Production build deployed", time: "5 hours ago", icon: Zap },
  { title: "New subscriber", desc: "Enterprise plan activated", time: "Yesterday", icon: TrendingUp },
];

const quickActions = [
  { label: "New Project", icon: Plus },
  { label: "Create Report", icon: FileText },
  { label: "Invite Member", icon: Users },
  { label: "View Analytics", icon: BarChart3 },
];

// Mini chart bars
function MiniChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-[3px] h-10">
      {data.map((v, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${(v / max) * 100}%` }}
          transition={{ duration: 0.5, delay: i * 0.05, ease }}
          className="w-[6px] rounded-full bg-primary/20"
        >
          <div
            className="w-full rounded-full bg-primary transition-all"
            style={{ height: `${(v / max) * 100}%`, minHeight: 2 }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// Sidebar component
function DashboardSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-card border-r border-border/50 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-border/50">
          <Link to="/" className="text-lg font-semibold text-foreground tracking-tight">
            Platform<span className="text-primary">.</span>
          </Link>
          <button onClick={onClose} className="lg:hidden text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {sidebarNav.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-border/50">
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john@example.com</p>
            </div>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-5 md:px-8 border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-muted-foreground hover:text-foreground">
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/dashboard/notifications"
              className="relative p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="p-5 md:p-8 max-w-6xl">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-8">
            {/* Welcome */}
            <motion.div variants={fadeUp}>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                Welcome back, John
              </h2>
              <p className="text-muted-foreground mt-1">Here's what's happening with your projects.</p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="p-5 rounded-2xl border border-border/50 bg-card hover:border-border hover:shadow-soft transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-secondary/80 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                          stat.up
                            ? "bg-primary/10 text-primary"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                  </div>
                );
              })}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chart placeholder */}
              <motion.div
                variants={fadeUp}
                className="lg:col-span-2 p-6 rounded-2xl border border-border/50 bg-card"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Performance Overview</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Last 30 days</p>
                  </div>
                  <div className="flex gap-1 bg-secondary/60 rounded-full p-0.5">
                    {["Week", "Month", "Year"].map((p, i) => (
                      <button
                        key={p}
                        className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                          i === 1 ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-end justify-between gap-1 h-40">
                  <MiniChart data={[30, 45, 35, 60, 50, 75, 65, 80, 70, 90, 85, 95, 88, 72, 78, 92, 85, 70, 88, 95, 80, 75, 90, 85]} />
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-xs text-muted-foreground">Views</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-primary/30" />
                      <span className="text-xs text-muted-foreground">Clicks</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Quick actions */}
              <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-border/50 bg-card">
                <h3 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.label}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border/50 text-muted-foreground hover:text-foreground hover:border-border hover:bg-accent/50 transition-all duration-200"
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-xs font-medium">{action.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-border/50 bg-card">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
                <button className="text-xs font-medium text-primary hover:underline">View all</button>
              </div>
              <div className="space-y-1">
                {activity.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-accent/50 transition-colors group cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-xl bg-secondary/80 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                        <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0 hidden sm:block">{item.time}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/40 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
