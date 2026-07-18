"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BookOpen, LayoutDashboard, LogOut, Menu, Users, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { getToken } from "@/utils/auth-storage";
import { Logo, LogoMark } from "@/components/ui/Logo";

const LINKS = [
  { href: "/", label: "Início", icon: LayoutDashboard },
  { href: "/bancos", label: "Banco de Questões", icon: BookOpen },
  { href: "/turmas", label: "Minhas Turmas", icon: Users },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    if (!getToken()) router.replace("/login");
  }, [router]);

  useEffect(() => {
    setMenuAberto(false);
  }, [pathname]);

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  const nav = (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {LINKS.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-brand-50 text-brand-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Icon className="h-4.5 w-4.5" style={{ height: 18, width: 18 }} strokeWidth={2} />
            {label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-100 bg-white lg:flex">
        <div className="px-5 py-6">
          <Logo size={34} />
        </div>
        {nav}
        <div className="border-t border-slate-100 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-rose-50 hover:text-rose-600"
          >
            <LogOut style={{ height: 18, width: 18 }} strokeWidth={2} />
            Sair
          </button>
        </div>
      </aside>

      {menuAberto && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40"
            onClick={() => setMenuAberto(false)}
          />
          <aside className="relative z-50 flex h-full w-72 flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between px-5 py-6">
              <Logo size={32} />
              <button
                onClick={() => setMenuAberto(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {nav}
            <div className="border-t border-slate-100 p-3">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-rose-50 hover:text-rose-600"
              >
                <LogOut style={{ height: 18, width: 18 }} />
                Sair
              </button>
            </div>
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-100 bg-white px-4 py-3.5 lg:hidden">
          <div className="flex items-center gap-2">
            <LogoMark size={30} />
            <span className="text-base font-bold text-slate-900">Avalia+</span>
          </div>
          <button
            onClick={() => setMenuAberto(true)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <Menu className="h-5 w-5" />
          </button>
        </header>

        <main className="flex-1 p-5 sm:p-8 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
