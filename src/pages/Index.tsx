import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatedSun } from "@/components/AnimatedSun";
import { LoginModal } from "@/components/LoginModal";
import { FeatureCard } from "@/components/FeatureCard";
import { StatCard } from "@/components/StatCard";
import {
  Zap,
  Users,
  TrendingUp,
  Shield,
  Smartphone,
  CreditCard,
  BarChart3,
  Bot,
  MessageSquare,
  Rocket,
} from "lucide-react";
import solarHero from "@/assets/solar-hero.jpg";

const Index = () => {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Sun */}
      <AnimatedSun />

      {/* Background with solar panels */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 37, 64, 0.85), rgba(10, 37, 64, 0.9)), url(${solarHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-[var(--glow-cyan)]">
                <span className="text-2xl font-bold text-primary-foreground">R⁺</span>
              </div>
              <span className="text-xl font-bold">Renovva Mais</span>
            </div>
            <Button onClick={() => setLoginOpen(true)} variant="hero" size="lg">
              Login
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-20 pb-32 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 bg-card/30 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 text-sm">
              <Zap className="w-4 h-4 text-accent" />
              <span>Energia Solar Inteligente</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Renovva Mais:
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                O Futuro é Agora!
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Plataforma completa de gestão para energia solar compartilhada. 
              Automatize seu negócio e revolucione suas operações com o sistema Renovva Mais.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="hero" size="lg" className="text-lg">
                <Rocket className="w-5 h-5" />
                Começar Agora
              </Button>
              <Button variant="glass" size="lg" className="text-lg">
                Conhecer o Sistema
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-6 pb-32">
          <div className="bg-card/30 backdrop-blur-md border border-primary/20 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatCard value="90" label="Menos Trabalho Manual" suffix="%" />
              <StatCard value="500" label="Clientes por Pessoa" suffix="+" />
              <StatCard value="40" label="Mais Eficiência" suffix="%" />
              <StatCard value="24/7" label="Suporte com IA" />
            </div>
          </div>
        </section>

        {/* Main Features */}
        <section className="container mx-auto px-6 pb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Administre suas usinas de forma{" "}
              <span className="text-primary">eficiente</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Aqui você encontra tudo que precisa para gerenciar seu negócio de energia solar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Users}
              title="Gestão de clientes"
              description="Controle completo de clientes, imóveis e consumo em uma única plataforma inteligente"
            />
            <FeatureCard
              icon={BarChart3}
              title="Cálculos automatizados"
              description="Engine avançado que calcula faturas automaticamente com TUSD, TE e descontos solares"
            />
            <FeatureCard
              icon={CreditCard}
              title="Emissão via PIX ou boletos"
              description="Pagamentos instantâneos via PIX com confirmação automática ou boletos bancários"
            />
            <FeatureCard
              icon={Smartphone}
              title="Integração com o Asaas"
              description="Sincronização automática com bancos para gestão financeira completa"
            />
            <FeatureCard
              icon={MessageSquare}
              title="Baixas automáticas de faturas"
              description="Sistema identifica pagamentos e baixa faturas automaticamente via webhooks"
            />
            <FeatureCard
              icon={TrendingUp}
              title="Economia com mão de obra"
              description="Reduza 90% do trabalho manual com automação inteligente de processos"
            />
          </div>
        </section>

        {/* AI Assistant Feature */}
        <section className="container mx-auto px-6 pb-32">
          <div className="bg-gradient-to-br from-card/50 to-secondary/30 backdrop-blur-md border border-primary/30 rounded-2xl p-8 md:p-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-accent/20 rounded-full px-4 py-2 mb-6">
                  <Bot className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium">Assistente Virtual com IA</span>
                </div>
                <h2 className="text-4xl font-bold mb-6">
                  Conheça a Beatrice
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Nossa assistente virtual com inteligência artificial está disponível 24/7 
                  para tirar dúvidas, explicar cálculos e orientar seus clientes. 
                  Ela aprende continuamente e tem acesso aos dados reais do sistema.
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span>Responde dúvidas sobre faturas e pagamentos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span>Explica cálculos de desconto solar e economia</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span>Reduz drasticamente chamados de suporte</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-2xl" />
                <div className="relative bg-card/50 border border-primary/30 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1 bg-secondary/50 rounded-lg p-3">
                      <p className="text-sm">Olá! Sou a Beatrice. Como posso ajudar você hoje?</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 justify-end mb-4">
                    <div className="flex-1 bg-primary/20 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm text-right">Qual o status da minha fatura?</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1 bg-secondary/50 rounded-lg p-3">
                      <p className="text-sm">Sua fatura de janeiro está paga! Você economizou R$ 127,50 com energia solar. 🌱</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 pb-32">
          <div className="relative bg-gradient-to-br from-primary via-accent to-primary rounded-2xl p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <Shield className="w-16 h-16 mx-auto mb-6 text-primary-foreground" />
              <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                Pronto para revolucionar sua gestão?
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8">
                Junte-se às geradoras que já transformaram suas operações com o Renovva Mais
              </p>
              <Button
                variant="glass"
                size="lg"
                className="text-lg bg-background/90 hover:bg-background text-foreground border-none"
              >
                Comece Automatizar Hoje
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 border-t border-primary/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">R⁺</span>
              </div>
              <div>
                <div className="font-bold">Renovva Mais</div>
                <div className="text-sm text-muted-foreground">O Futuro é Agora</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 Renovva Mais. Todos os direitos reservados.
            </div>
          </div>
        </footer>
      </div>

      {/* Login Modal */}
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </div>
  );
};

export default Index;
