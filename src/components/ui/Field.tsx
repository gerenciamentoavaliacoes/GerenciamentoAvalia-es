import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

export function Label({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-slate-700">
      {children}
    </label>
  );
}

const fieldBase =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-soft transition-colors placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => (
    <input ref={ref} className={`${fieldBase} ${className}`} {...props} />
  )
);
Input.displayName = "Input";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className = "", ...props }, ref) => (
  <textarea ref={ref} className={`${fieldBase} resize-none ${className}`} {...props} />
));
Textarea.displayName = "Textarea";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={`${fieldBase} appearance-none pr-9 ${className}`}
        {...props}
      >
        {children}
      </select>
      <svg
        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M5 7.5L10 12.5L15 7.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
);
Select.displayName = "Select";
