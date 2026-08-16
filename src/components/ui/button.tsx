import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      // Hover jest za [@media(hover:hover)], zeby na dotyku stan nie zostawal
      // przyklejony po tapnieciu — inaczej kazde wywolanie musi to obchodzic
      // u siebie, tak jak robil to wczesniej Navbar i HeroV2.
      variant: {
        // primary is the one variant written against the shadcn bridge rather
        // than the pf classes: it needs bg-primary/90 for its hover, and only
        // the HSL-triplet tokens support an opacity modifier. Same colour
        // either way — --primary mirrors --pf-primary-900.
        primary:
          "bg-primary text-primary-foreground [@media(hover:hover)]:hover:bg-primary/90",
        secondary:
          "border border-pf-line bg-pf-surface text-pf-ink [@media(hover:hover)]:hover:border-pf-200 [@media(hover:hover)]:hover:bg-pf-50",
        // pf-subtle, not pf-muted: muted sits under the AA contrast floor for
        // text this size, and a button label has to stay readable.
        ghost:
          "text-pf-subtle [@media(hover:hover)]:hover:bg-pf-50 [@media(hover:hover)]:hover:text-pf-ink",
        // Primary postawiony na ciemnej plaszczyznie (karta NextProject).
        inverse:
          "bg-pf-surface text-pf-ink [@media(hover:hover)]:hover:bg-pf-50",
      },
      size: {
        md: "h-10 px-5",
        lg: "h-12 px-7",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
