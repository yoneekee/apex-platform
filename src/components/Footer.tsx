import { ArrowUpRight } from "lucide-react";

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

interface FooterProps {
  logo?: string;
  columns?: FooterColumn[];
}

const defaultColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Integrations", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Press Kit", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "Community", href: "#" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Cookies", href: "#" },
      { label: "Licenses", href: "#" },
    ],
  },
];

export default function Footer({ logo = "Platform", columns = defaultColumns }: FooterProps) {
  return (
    <footer className="border-t border-border">
      <div className="container-wide section-padding pb-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <a href="#" className="text-xl font-semibold tracking-tight text-foreground">
              {logo}<span className="text-primary">.</span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Building the future of digital experiences, one pixel at a time.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title} className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-12 mt-12 border-t border-border gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {logo}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Twitter", "LinkedIn", "GitHub", "Dribbble"].map((social) => (
              <a key={social} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
