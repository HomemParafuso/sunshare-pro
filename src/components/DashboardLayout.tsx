import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Bell, User } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-muted/20">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border/30 bg-background flex items-center justify-between px-6 shadow-sm">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
            <p className="text-xs text-muted-foreground">Bem-vindo ao sistema Renovva Mais</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-muted/50 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-2 pl-4 border-l border-border">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-foreground">Admin</p>
                <p className="text-xs text-muted-foreground">13:40</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
