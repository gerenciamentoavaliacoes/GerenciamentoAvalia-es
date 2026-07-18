import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-soft hover:bg-brand-700 focus-visible:ring-brand-300 disabled:hover:bg-brand-600",
  secondary:
    "bg-slate-900 text-white shadow-soft hover:bg-slate-800 focus-visible:ring-slate-300",
  outline:
    "border border-slate-200 bg-white text-slate-700 shadow-soft hover:bg-slate-50 focus-visible:ring-slate-200",
  ghost: "text-slate-600 hover:bg-slate-100 focus-visible:ring-slate-200",
  danger:
    "bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 focus-visible:ring-rose-200",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-11 px-5 text-sm gap-2",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", loading, icon, className = "", children, disabled, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-60 ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          icon && <span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
