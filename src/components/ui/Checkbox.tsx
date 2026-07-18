import { Check } from "lucide-react";

export function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
      <span
        onClick={(e) => {
          e.preventDefault();
          onChange();
        }}
        className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border transition-colors ${
          checked
            ? "border-brand-600 bg-brand-600"
            : "border-slate-300 bg-white"
        }`}
        style={{ height: 18, width: 18 }}
      >
        {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
      </span>
      {label}
    </label>
  );
}
