import { motion } from "framer-motion";
import { Star, ShoppingBag, MessageCircle, Heart } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

interface ProductInfoProps {
  breadcrumbs?: { label: string; href: string }[];
  title?: string;
  subtitle?: string;
  price?: string;
  rating?: number;
  reviewCount?: number;
  description?: string;
  metadata?: { label: string; value: string }[];
  primaryAction?: string;
  secondaryAction?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProductInfo({
  breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Collection", href: "#" },
  ],
  title = "Meridian Chronograph",
  subtitle = "Precision Timepiece — Limited Edition",
  price = "$4,850",
  rating = 4.9,
  reviewCount = 128,
  description = "A masterpiece of horological engineering, the Meridian Chronograph combines Swiss craftsmanship with contemporary design. Each piece is individually numbered and crafted from aerospace-grade titanium.",
  metadata = [
    { label: "Material", value: "Grade 5 Titanium" },
    { label: "Movement", value: "Automatic Cal. 3255" },
    { label: "Water Resistance", value: "300m / 1000ft" },
    { label: "Case Size", value: "41mm" },
  ],
  primaryAction = "Add to Cart",
  secondaryAction = "Inquire",
}: ProductInfoProps) {
  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease }}
      >
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, i) => (
              <BreadcrumbItem key={i}>
                <BreadcrumbLink href={crumb.href} className="text-xs uppercase tracking-wider">
                  {crumb.label}
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </BreadcrumbItem>
            ))}
            <BreadcrumbItem>
              <BreadcrumbPage className="text-xs uppercase tracking-wider">{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </motion.div>

      {/* Title block */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease }}
        className="space-y-3"
      >
        <p className="text-sm font-medium text-primary tracking-wide uppercase">{subtitle}</p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-[1.1]">
          {title}
        </h1>
      </motion.div>

      {/* Rating & price */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease }}
        className="flex items-center gap-6"
      >
        <span className="text-2xl font-semibold text-foreground">{price}</span>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="font-medium text-foreground">{rating}</span>
          <span>({reviewCount} reviews)</span>
        </div>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease }}
        className="text-muted-foreground leading-relaxed max-w-lg"
      >
        {description}
      </motion.p>

      {/* Metadata grid */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease }}
        className="grid grid-cols-2 gap-4"
      >
        {metadata.map((item) => (
          <div key={item.label} className="space-y-1 p-4 rounded-xl bg-secondary/50">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</p>
            <p className="text-sm font-medium text-foreground">{item.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease }}
        className="flex flex-col sm:flex-row gap-3 pt-2"
      >
        <Button size="lg" className="rounded-full gap-2 flex-1 sm:flex-none">
          <ShoppingBag className="h-4 w-4" />
          {primaryAction}
        </Button>
        <Button variant="outline" size="lg" className="rounded-full gap-2 flex-1 sm:flex-none">
          <MessageCircle className="h-4 w-4" />
          {secondaryAction}
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full shrink-0">
          <Heart className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
}
