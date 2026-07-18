type BadgeTone = "brand" | "slate" | "emerald" | "amber" | "rose";

const TONE_CLASSES: Record<BadgeTone, string> = {
  brand: "bg-brand-50 text-brand-700 ring-brand-200",
  slate: "bg-slate-100 text-slate-600 ring-slate-200",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  rose: "bg-rose-50 text-rose-700 ring-rose-200",
};

export function Badge({
  tone = "slate",
  children,
}: {
  tone?: BadgeTone;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${TONE_CLASSES[tone]}`}
    >
      {children}
    </span>
  );
}
