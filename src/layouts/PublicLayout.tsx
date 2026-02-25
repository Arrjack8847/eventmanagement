import { Outlet, Link, useLocation } from "react-router-dom";
import { RoleSwitcher } from "@/components/RoleSwitcher";
import { useRole } from "@/contexts/RoleContext";
import { GraduationCap, Calendar, LayoutDashboard, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function PublicLayout() {
  const { role } = useRole();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Events", to: "/events" },
    { label: "Calendar", to: "/calendar" },
  ];

  const portalLink = role === "admin" ? "/admin" : role === "organizer" ? "/organizer" : "/app";

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/events" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg hidden sm:block" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>CampusHub</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.to) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <RoleSwitcher />
            <Link to={portalLink}>
              <Button size="sm" className="gap-1.5">
                <LayoutDashboard className="h-3.5 w-3.5" />
                Dashboard
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="sm">Login</Button>
            </Link>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t bg-card p-4 space-y-3">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted">
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t space-y-2">
              <RoleSwitcher />
              <div className="flex gap-2">
                <Link to={portalLink} onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="gap-1.5"><LayoutDashboard className="h-3.5 w-3.5" />Dashboard</Button>
                </Link>
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p>© 2026 CampusHub · Campus Club Event Management System</p>
      </footer>
    </div>
  );
}
