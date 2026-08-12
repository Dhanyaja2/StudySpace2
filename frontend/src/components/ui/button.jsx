import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-indigo-400/40  text-white shadow-xs hover:bg",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        primary:
  "border border-violet-500/30 bg-[#21124D] text-white shadow-[0_0_12px_rgba(124,58,237,0.12)] transition-all duration-300 hover:bg-[#2A1760] hover:border-violet-400/50 hover:shadow-[0_0_18px_rgba(124,58,237,0.22)] hover:-translate-y-[1px] active:translate-y-0",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        animate:
          "relative overflow-hidden border border-violet-500/25 bg-gradient-to-r from-violet-700/80 to-indigo-700/80 text-white shadow-[0_0_12px_rgba(124,58,237,0.15)] transition-all duration-300 hover:from-violet-600/90 hover:to-indigo-600/90 hover:border-violet-400/40 hover:shadow-[0_0_18px_rgba(124,58,237,0.25)] hover:-translate-y-[1px] active:translate-y-0",
        glass:
          "border border-white/10 bg-white/[0.04] text-gray-200 backdrop-blur-sm transition-all duration-300 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white",
      },
      size: {
        default: "h-9 px-4 py-5 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
