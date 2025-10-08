import Link from "next/link"
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">MoneyPilot</span>
          </div>
          <Link href="/login" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Iniciar sesión
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Gratis para Latinoamérica
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Tu asistente financiero personal para Latinoamérica
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
            Consejos diarios simples, contextualizados y sin jerga. Toma decisiones en 2 minutos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Empezar gratis
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
            >
              Iniciar sesión
            </Link>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            Tardarás menos de 3 minutos. Tus datos son privados y no requerimos conexión bancaria.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Consejos en 2 minutos</h3>
            <p className="text-muted-foreground leading-relaxed">
              Recomendaciones diarias claras y accionables, sin complicaciones ni jerga financiera.
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Contexto latinoamericano</h3>
            <p className="text-muted-foreground leading-relaxed">
              Consejos adaptados a tu realidad económica, país y situación financiera personal.
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Privacidad garantizada</h3>
            <p className="text-muted-foreground leading-relaxed">
              Tus datos están cifrados y solo se usan para generar recomendaciones personalizadas.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 mb-16">
        <div className="max-w-3xl mx-auto bg-primary rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
            Comienza tu viaje financiero hoy
          </h2>
          <p className="text-primary-foreground/90 text-lg mb-6 text-pretty">
            Únete a miles de personas que ya están tomando mejores decisiones financieras.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card text-foreground rounded-lg font-medium hover:bg-card/90 transition-colors"
          >
            Empezar ahora
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
