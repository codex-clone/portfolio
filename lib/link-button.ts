import { cn } from "./utils"

type Variant = "primary" | "outline" | "ghost"
type Size = "sm" | "md" | "lg"

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-slate-900 text-white hover:bg-slate-700",
  outline: "border border-slate-300 text-slate-900 hover:bg-slate-100",
  ghost: "text-slate-900 hover:bg-slate-100",
}

const baseClasses =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"

export const linkButtonClasses = (variant: Variant, size: Size = "md") =>
  cn(baseClasses, sizeClasses[size], variantClasses[variant])
