import { Outlet, Link, useLocation } from "react-router-dom";
import { RoleSwitcher } from "@/components/RoleSwitcher";
import { useRole } from "@/contexts/RoleContext";
import { cn } from "@/lib/utils";
import {
  GraduationCap, LayoutDashboard, CalendarDays, Users, Ticket, History,
  PlusCircle, QrCode, ClipboardList, UserCog, Building2, ChevronLeft, Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NavItem {
  label: string;
  to: string;
  icon: React.ElementType;
}

const studentNav: NavItem[] = [
  { label: "Dashboard", to: "/app", icon: LayoutDashboard },
  { label: "My Clubs", to: "/app/my-clubs", icon: Users },
  { label: "Registrations", to: "/app/my-registrations", icon: ClipboardList },
  { label: "My Tickets", to: "/app/my-tickets", icon: Ticket },
  { label: "History", to: "/app/history", icon: History },
];

const organizerNav: NavItem[] = [
  { label: "Dashboard", to: "/organizer", icon: LayoutDashboard },
  { label: "Events", to: "/organizer/events", icon: CalendarDays },
  { label: "Create Event", to: "/organizer/events/new", icon: PlusCircle },
  { label: "QR Check-in", to: "/organizer/events/e1/checkin", icon: QrCode },
];

const adminNav: NavItem[] = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "Users", to: "/admin/users", icon: UserCog },
  { label: "Clubs", to: "/admin/clubs", icon: Building2 },
];

export function DashboardLayout() {
  const { role } = useRole();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = role === "admin" ? adminNav : role === "organizer" ? organizerNav : studentNav;
  const portalLabel = role === "admin" ? "Admin Portal" : role === "organizer" ? "Organizer Portal" : "Student Portal";

  const isActive = (path: string) => {
    if (path === "/app" || path === "/organizer" || path === "/admin") return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const SidebarContent = () => (
    <>
      <div className={cn("p-4 flex items-center gap-2.5 border-b border-sidebar-border", collapsed && "justify-center")}>
        <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center shrink-0">
          <GraduationCap className="h-4.5 w-4.5 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && <span className="font-bold text-sm text-sidebar-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>CampusHub</span>}
      </div>
      {!collapsed && (
        <div className="px-4 py-3">
          <p className="text-[10px] uppercase tracking-wider text-sidebar-foreground/50 font-semibold">{portalLabel}</p>
        </div>
      )}
      <nav className="flex-1 px-3 space-y-1">
        {nav.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive(item.to)
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
              collapsed && "justify-center px-2"
            )}
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="h-4.5 w-4.5 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
      <div className={cn("p-4 border-t border-sidebar-border space-y-3", collapsed && "px-2")}>
        {!collapsed && <RoleSwitcher />}
        <Link to="/events" onClick={() => setMobileOpen(false)} className="block">
          <Button variant="outline" size="sm" className={cn("w-full gap-1.5 text-xs border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent", collapsed && "px-2")}>
            <ChevronLeft className="h-3.5 w-3.5" />
            {!collapsed && "Back to Public"}
          </Button>
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex w-full">
      {/* Desktop sidebar */}
      <aside className={cn(
        "hidden lg:flex flex-col bg-sidebar fixed inset-y-0 left-0 z-40 transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}>
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="fixed inset-y-0 left-0 w-60 bg-sidebar z-50 flex flex-col">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className={cn("flex-1 flex flex-col transition-all duration-300", collapsed ? "lg:ml-16" : "lg:ml-60")}>
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b h-14 flex items-center px-4 gap-3">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden lg:flex" onClick={() => setCollapsed(!collapsed)}>
            <Menu className="h-4.5 w-4.5" />
          </Button>
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-sm">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">AR</div>
            <span className="hidden sm:block text-sm font-medium">Ahmad Razif</span>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
