export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav>{/* menu de navegação */}</nav>
      <main>{children}</main>
    </div>
  );
}
