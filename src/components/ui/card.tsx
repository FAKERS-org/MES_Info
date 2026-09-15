import { cn } from "@/lib/utils";
import { forwardRef, type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "outlined" | "filled";
  padding?: "none" | "sm" | "md" | "lg";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, onClick, variant = "default", padding = "md", ...props }, ref) => {
    const baseStyles = "rounded-xl border bg-card text-card-foreground shadow-sm transition-all";

    const variants = {
      default: "border-border",
      outlined: "border-2 border-dashed border-border/50 bg-card/50 backdrop-blur-sm",
      filled: "border-none bg-muted/50",
    };

    const paddings = {
      none: "",
      sm: "p-3",
      md: "p-5",
      lg: "p-7",
    };

    const interactiveStyles = onClick ? "cursor-pointer hover:bg-accent/50 active:scale-[0.98] transition-transform" : "";

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], paddings[padding], interactiveStyles, className)}
        onClick={onClick}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}

function CardHeader({ children, className, actions }: CardHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between px-5 pb-3", className)}>
      {children}
      {actions}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

function CardTitle({ children, className }: CardTitleProps) {
  return <h3 className={cn("text-lg font-semibold leading-tight text-card-foreground", className)}>{children}</h3>;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

function CardContent({ children, className }: CardContentProps) {
  return <div className={cn("px-5 pt-2", className)}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

function CardFooter({ children, className }: CardFooterProps) {
  return <div className={cn("flex items-center justify-between px-5 pt-3", className)}>{children}</div>;
}

export { CardHeader, CardTitle, CardContent, CardFooter };