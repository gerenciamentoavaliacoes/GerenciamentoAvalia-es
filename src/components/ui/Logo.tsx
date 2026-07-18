interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}

export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <defs>
        <linearGradient id="logo-bg" x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6a5cf0" />
          <stop offset="55%" stopColor="#5641e0" />
          <stop offset="100%" stopColor="#392a97" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#logo-bg)" />
      <rect x="20" y="14" width="24" height="8" rx="3" fill="#c9cffd" />
      <rect x="17" y="18" width="30" height="34" rx="6" fill="white" fillOpacity="0.14" />
      <rect
        x="17"
        y="18"
        width="30"
        height="34"
        rx="6"
        stroke="white"
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />
      <path
        d="M24 34.5L29.5 40L41 26"
        stroke="white"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ size = 36, showWordmark = true, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      {showWordmark && (
        <div className="leading-tight">
          <p className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            Avalia<span className="text-brand-600">+</span>
          </p>
          <p className="-mt-0.5 text-[11px] font-medium uppercase tracking-wide text-slate-400">
            Gerenciamento de Avaliações
          </p>
        </div>
      )}
    </div>
  );
}
