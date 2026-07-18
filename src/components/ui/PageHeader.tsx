export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-600">
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
      {action && <div className="flex shrink-0 gap-2">{action}</div>}
    </div>
  );
}
