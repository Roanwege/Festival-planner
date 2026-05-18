import React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-slate-900 text-white shadow hover:bg-slate-700",
    outline: "border border-slate-200 bg-white shadow-sm hover:bg-slate-100",
    ghost: "hover:bg-slate-100",
  };
  const sizes = {
    default: "h-9 px-4 py-2",
    icon: "h-9 w-9",
  };
  return (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };
