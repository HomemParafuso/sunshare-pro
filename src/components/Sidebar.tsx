import { LayoutDashboard, Zap, Users, FileText, DollarSign, BarChart3, UserPlus, Bell, Settings, Sun } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useState } from "react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Zap, label: "Usinas", path: "/usinas" },
  { icon: Users, label: "Clientes", path: "/clientes" },
  { icon: FileText, label: "Faturas", path: "/faturas" },
  { icon: DollarSign, label: "Financeiro", path: "/financeiro" },
  { icon: BarChart3, label: "Relatórios", path: "/relatorios" },
  { icon: UserPlus, label: "CRM", path: "/crm" },
  { icon: Bell, label: "Notificações", path: "/notificacoes" },
  { icon: Settings, label: "Configurações", path: "/configuracoes" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "h-screen bg-gradient-to-b from-[hsl(210,70%,12%)] to-[hsl(210,65%,18%)] border-r border-border/50 transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border/30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-bold text-lg">R+</span>
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-foreground font-semibold">Renovva Mais</h2>
              <p className="text-xs text-muted-foreground">LAIANY</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-200"
            activeClassName="bg-primary/10 text-primary border-l-2 border-primary"
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer with animated sun */}
      <div className="p-4 border-t border-border/30">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-secondary/50 transition-all group"
        >
          <Sun className="w-5 h-5 text-accent animate-pulse group-hover:rotate-180 transition-transform duration-500" />
          {!collapsed && <span className="text-xs text-muted-foreground">Energia Solar</span>}
        </button>
      </div>
    </aside>
  );
}
