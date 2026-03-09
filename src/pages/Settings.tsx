import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Settings as SettingsIcon,
  Bell,
  User,
  Shield,
  Camera,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Info,
  Zap,
  LogOut,
  Menu,
  X,
  ChevronRight,
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
  { label: "Settings", icon: SettingsIcon, href: "/settings" },
];

const notifications = [
  { title: "System update scheduled", desc: "Maintenance window on March 15, 2:00 AM UTC", time: "5 min ago", priority: "info" as const, read: false },
  { title: "Security alert", desc: "New login detected from San Francisco, CA", time: "1 hour ago", priority: "warning" as const, read: false },
  { title: "Payment successful", desc: "Invoice #1042 has been processed — $2,400", time: "3 hours ago", priority: "success" as const, read: true },
  { title: "Storage limit approaching", desc: "You've used 85% of your storage quota", time: "Yesterday", priority: "warning" as const, read: true },
  { title: "New feature available", desc: "Advanced analytics dashboard is now live", time: "2 days ago", priority: "info" as const, read: true },
  { title: "Deployment failed", desc: "Build #892 failed — check logs for details", time: "3 days ago", priority: "error" as const, read: true },
];

const priorityStyles = {
  info: { bg: "bg-primary/10", text: "text-primary", icon: Info },
  success: { bg: "bg-primary/10", text: "text-primary", icon: Check },
  warning: { bg: "bg-accent", text: "text-foreground", icon: AlertCircle },
  error: { bg: "bg-destructive/10", text: "text-destructive", icon: AlertCircle },
};

// Shared sidebar
function SettingsSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const location = useLocation();
  return (
    <>
      {open && <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed top-0 left-0 bottom-0 w-64 bg-card border-r border-border/50 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-16 flex items-center justify-between px-5 border-b border-border/50">
          <Link to="/" className="text-lg font-semibold text-foreground tracking-tight">Platform<span className="text-primary">.</span></Link>
          <button onClick={onClose} className="lg:hidden text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {sidebarNav.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.href;
            return (
              <Link key={item.label} to={item.href} onClick={onClose} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`}>
                <Icon className="h-4 w-4" />{item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border/50">
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">JD</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john@example.com</p>
            </div>
            <button className="text-muted-foreground hover:text-foreground transition-colors"><LogOut className="h-4 w-4" /></button>
          </div>
        </div>
      </aside>
    </>
  );
}

// Settings tabs
type Tab = "profile" | "security" | "notifications";

export default function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [twoFa, setTwoFa] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <SettingsSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-5 md:px-8 border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-muted-foreground hover:text-foreground"><Menu className="h-5 w-5" /></button>
            <h1 className="text-lg font-semibold text-foreground">Settings</h1>
          </div>
        </header>

        <main className="p-5 md:p-8 max-w-3xl">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-6">
            {/* Tabs */}
            <motion.div variants={fadeUp} className="flex gap-1 bg-secondary/60 p-1 rounded-xl w-fit">
              {tabs.map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      tab === t.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab === t.id && (
                      <motion.div layoutId="settings-tab" className="absolute inset-0 bg-background rounded-lg shadow-sm border border-border/50" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                    )}
                    <span className="relative z-10 flex items-center gap-2"><Icon className="h-4 w-4" /><span className="hidden sm:inline">{t.label}</span></span>
                  </button>
                );
              })}
            </motion.div>

            {/* Profile Tab */}
            {tab === "profile" && (
              <motion.div key="profile" initial="hidden" animate="visible" variants={stagger} className="space-y-6">
                <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-border/50 bg-card">
                  <h3 className="text-sm font-semibold text-foreground mb-5">Profile Information</h3>
                  {/* Avatar */}
                  <div className="flex items-center gap-5 mb-6">
                    <div className="relative group">
                      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-xl font-semibold text-primary">JD</div>
                      <button className="absolute inset-0 rounded-2xl bg-foreground/0 group-hover:bg-foreground/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                        <Camera className="h-5 w-5 text-background" />
                      </button>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Profile Photo</p>
                      <p className="text-xs text-muted-foreground mt-0.5">JPG, PNG or SVG. Max 2MB.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-foreground">First Name</label>
                      <input defaultValue="John" className="w-full h-11 px-4 text-sm bg-secondary/40 border border-border/50 rounded-xl outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-foreground">Last Name</label>
                      <input defaultValue="Doe" className="w-full h-11 px-4 text-sm bg-secondary/40 border border-border/50 rounded-xl outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all" />
                    </div>
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="block text-sm font-medium text-foreground">Email</label>
                      <input defaultValue="john@example.com" type="email" className="w-full h-11 px-4 text-sm bg-secondary/40 border border-border/50 rounded-xl outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all" />
                    </div>
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="block text-sm font-medium text-foreground">Bio</label>
                      <textarea rows={3} defaultValue="Product designer based in San Francisco." className="w-full px-4 py-3 text-sm bg-secondary/40 border border-border/50 rounded-xl outline-none resize-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all" />
                    </div>
                  </div>
                  <div className="flex justify-end mt-5">
                    <button className="px-6 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity">
                      Save Changes
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Security Tab */}
            {tab === "security" && (
              <motion.div key="security" initial="hidden" animate="visible" variants={stagger} className="space-y-6">
                <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-border/50 bg-card">
                  <h3 className="text-sm font-semibold text-foreground mb-5">Change Password</h3>
                  <div className="space-y-4 max-w-md">
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-foreground">Current Password</label>
                      <div className="relative">
                        <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full h-11 px-4 pr-11 text-sm bg-secondary/40 border border-border/50 rounded-xl outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-foreground">New Password</label>
                      <div className="relative">
                        <input type={showNewPassword ? "text" : "password"} placeholder="••••••••" className="w-full h-11 px-4 pr-11 text-sm bg-secondary/40 border border-border/50 rounded-xl outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all" />
                        <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-foreground">Confirm New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full h-11 px-4 text-sm bg-secondary/40 border border-border/50 rounded-xl outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all" />
                    </div>
                  </div>
                  <div className="flex justify-end mt-5">
                    <button className="px-6 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity">Update Password</button>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-border/50 bg-card">
                  <h3 className="text-sm font-semibold text-foreground mb-5">Security Settings</h3>
                  <div className="space-y-4">
                    {/* 2FA Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:border-border transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-secondary/80 flex items-center justify-center">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                          <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setTwoFa(!twoFa)}
                        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${twoFa ? "bg-primary" : "bg-secondary"}`}
                      >
                        <motion.div
                          animate={{ x: twoFa ? 20 : 2 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="absolute top-1 w-4 h-4 rounded-full bg-background shadow-sm"
                        />
                      </button>
                    </div>
                    {/* Login alerts */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:border-border transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-secondary/80 flex items-center justify-center">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Login Alerts</p>
                          <p className="text-xs text-muted-foreground">Get notified of new sign-ins</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setLoginAlerts(!loginAlerts)}
                        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${loginAlerts ? "bg-primary" : "bg-secondary"}`}
                      >
                        <motion.div
                          animate={{ x: loginAlerts ? 20 : 2 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="absolute top-1 w-4 h-4 rounded-full bg-background shadow-sm"
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Notifications Tab */}
            {tab === "notifications" && (
              <motion.div key="notifications" initial="hidden" animate="visible" variants={stagger} className="space-y-4">
                <motion.div variants={fadeUp} className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{notifications.filter((n) => !n.read).length} unread</p>
                  <button className="text-xs font-medium text-primary hover:underline">Mark all as read</button>
                </motion.div>
                {notifications.map((n, i) => {
                  const style = priorityStyles[n.priority];
                  const Icon = style.icon;
                  return (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer group ${
                        n.read
                          ? "border-border/30 hover:border-border/60"
                          : "border-border/50 bg-card hover:border-border shadow-soft"
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl ${style.bg} flex items-center justify-center shrink-0`}>
                        <Icon className={`h-4 w-4 ${style.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-medium ${n.read ? "text-muted-foreground" : "text-foreground"}`}>{n.title}</p>
                          {!n.read && <span className="w-2 h-2 bg-primary rounded-full shrink-0" />}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                        <p className="text-xs text-muted-foreground/60 mt-1">{n.time}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/40 shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
