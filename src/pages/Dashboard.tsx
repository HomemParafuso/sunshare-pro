import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, DollarSign, Users, AlertTriangle, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Produção do Dia",
      value: "0 kWh",
      subtitle: "Em Implementação",
      icon: Sun,
      iconColor: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Receita",
      value: "R$ 0,00",
      subtitle: "novembro de 2025",
      icon: DollarSign,
      iconColor: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Imóveis Ativos",
      value: "8",
      subtitle: "Clientes cadastrados",
      icon: Users,
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Faturas em Atraso",
      value: "4",
      subtitle: "R$ 1.060,97 - Mês antigo: ago. de 2025",
      icon: AlertTriangle,
      iconColor: "text-destructive",
      bgColor: "bg-destructive/10",
    },
  ];

  const recentInvoices = [
    { client: "FATIMA", address: "Rua das Mistunas, 85, Emaus, Parnamirim, RN", value: "R$ 227,57", status: "Pago", date: "09/2025" },
    { client: "JAIRO FLAUZINO", address: "RUA JOSÉ ROBERTO DA NOBREGA 174, Serra Negra do Norte, RN", value: "R$ 446,31", status: "Pago", date: "09/2025" },
    { client: "LION", address: "RUA MARIA ADÉLIA DA NOBREGA 509 A, Caicó, RN", value: "R$ 305,14", status: "Pago", date: "09/2025" },
    { client: "NANDO", address: "Rua Araxio de Souza, Lagoa Nova, Natal, RN", value: "R$ 276,10", status: "Pago", date: "09/2025" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Faturas Recentes */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Faturas Recentes - 09/2025
              </CardTitle>
              <CardDescription>Últimas faturas processadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentInvoices.map((invoice, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border/30"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground">{invoice.client}</p>
                      <p className="text-xs text-muted-foreground truncate">{invoice.address}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Ref: {invoice.date} • Venc: {invoice.date}
                      </p>
                    </div>
                    <div className="flex flex-col items-end ml-4">
                      <p className="font-bold text-sm text-foreground">{invoice.value}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-600 font-medium">
                        {invoice.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Compromissos */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Compromissos de Hoje</CardTitle>
              <CardDescription>Clique no ícone de atualizar para carregar os compromissos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                  <Sun className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Nenhum compromisso agendado para hoje
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart Placeholder */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Receita dos últimos 6 meses</CardTitle>
            <CardDescription>
              <span className="text-green-600 font-medium">Receita pelo caixa</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-border/30">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-primary/50 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Gráfico de receita mensal</p>
                <p className="text-xs text-muted-foreground mt-1">Dados em processamento</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
