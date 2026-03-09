import { motion } from "framer-motion";
import { Target, Heart, Zap, Shield, Globe, Sparkles, Linkedin, Twitter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
} as const;

const team = [
  { name: "Alex Chen", role: "CEO & Founder", initials: "AC" },
  { name: "Sarah Kim", role: "Head of Design", initials: "SK" },
  { name: "Marcus Williams", role: "CTO", initials: "MW" },
  { name: "Emma Rodriguez", role: "VP of Product", initials: "ER" },
  { name: "James Park", role: "Lead Engineer", initials: "JP" },
  { name: "Olivia Thompson", role: "Head of Growth", initials: "OT" },
];

const values = [
  { icon: Target, title: "Purpose-Driven", description: "Every decision is guided by our mission to empower creators and builders." },
  { icon: Heart, title: "Craft & Care", description: "We obsess over details because quality is the sum of all small things done well." },
  { icon: Zap, title: "Speed & Simplicity", description: "We move fast without sacrificing clarity or elegance in our solutions." },
  { icon: Shield, title: "Trust & Transparency", description: "Honest communication and reliability form the foundation of everything we do." },
  { icon: Globe, title: "Global Perspective", description: "We build for everyone, embracing diversity in thought, culture, and experience." },
  { icon: Sparkles, title: "Continuous Innovation", description: "We challenge convention and constantly push the boundaries of what's possible." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="container-tight text-center">
          <motion.div initial="hidden" animate="visible" className="space-y-6">
            <motion.span custom={0} variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              About Us
            </motion.span>
            <motion.h1 custom={1} variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.05]">
              We build tools for<br />the next generation.
            </motion.h1>
            <motion.p custom={2} variants={fadeUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Founded in 2018, we set out to create a platform that empowers teams to build
              remarkable digital experiences — without compromise.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="grid grid-cols-12 grid-rows-6 gap-4 h-[480px]">
                <div className="col-span-7 row-span-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5" />
                <div className="col-span-5 row-span-3 rounded-2xl bg-secondary" />
                <div className="col-span-5 row-span-3 col-start-8 row-start-4 rounded-2xl bg-gradient-to-br from-secondary to-accent" />
                <div className="col-span-7 row-span-2 row-start-5 rounded-2xl bg-primary/5" />
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-8"
            >
              <span className="text-xs font-medium uppercase tracking-widest text-primary">Our Mission</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-[1.1]">
                Empowering builders<br />to create without limits.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that great software should be accessible to everyone. Our platform removes
                the barriers between ideas and execution, giving teams the tools they need to ship
                products that users love.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From startups to enterprise, we serve over 10,000 teams across 50 countries,
                helping them build, iterate, and scale with confidence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 space-y-4"
          >
            <span className="text-xs font-medium uppercase tracking-widest text-primary">Our Values</span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              What drives us forward
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-premium p-8 space-y-4"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <value.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 space-y-4"
          >
            <span className="text-xs font-medium uppercase tracking-widest text-primary">The Team</span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              Meet the people behind Platform
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A diverse collective of designers, engineers, and strategists united by a shared passion for exceptional craft.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group card-premium p-8 text-center space-y-4"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                  <span className="text-lg font-semibold text-primary">{member.initials}</span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{member.role}</p>
                </div>
                <div className="flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
