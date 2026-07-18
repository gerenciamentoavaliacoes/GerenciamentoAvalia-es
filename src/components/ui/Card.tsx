import { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-xl border border-slate-100 bg-white shadow-card ${className}`}
      {...props}
    />
  );
}

export function CardBody({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-5 sm:p-6 ${className}`} {...props} />;
}

export function CardSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardBody>
        <div className="mb-4">
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          {description && <p className="mt-0.5 text-sm text-slate-500">{description}</p>}
        </div>
        {children}
      </CardBody>
    </Card>
  );
}
