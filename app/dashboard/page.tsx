"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { TrendingUp, LogOut, Info } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [recommendation, setRecommendation] = useState<any>(null)
  const [transactions, setTransactions] = useState<any[]>([])
  const [fhr, setFhr] = useState(0)

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("auth_token")
    if (!token) {
      router.push("/login")
      return
    }

    // TODO: Replace with actual API calls
    // Load static data
    fetch("/data/user_profile.json")
      .then((res) => res.json())
      .then((data) => {
        setProfile(data)
        calculateFHR(data)
      })

    fetch("/data/recommendation_today.json")
      .then((res) => res.json())
      .then((data) => setRecommendation(data))

    fetch("/data/transactions.json")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
  }, [router])

  const calculateFHR = (profileData: any) => {
    const { ingreso_mensual, ahorro_mensual, deudas } = profileData.financial_info
    const nivel_conocimiento = profileData.knowledge_profile.nivel_conocimiento_financiero

    const savings_rate = ahorro_mensual / ingreso_mensual
    const total_deuda = deudas.reduce((sum: number, d: any) => sum + d.monto, 0)
    const debt_ratio = total_deuda / ingreso_mensual

    let debt_score = 0
    if (debt_ratio <= 0.3) debt_score = 1
    else if (debt_ratio <= 0.5) debt_score = 0.6
    else if (debt_ratio <= 0.8) debt_score = 0.2
    else debt_score = 0

    const fhrValue = Math.min(savings_rate / 0.3, 1) * 0.4 + debt_score * 0.3 + (nivel_conocimiento / 5) * 0.3

    setFhr(Math.round(fhrValue * 100))
  }

  const handleLogout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_profile")
    router.push("/")
  }

  const getTrafficLight = (fhrValue: number) => {
    if (fhrValue >= 60) return { color: "bg-primary", label: "Excelente" }
    if (fhrValue >= 40) return { color: "bg-accent", label: "Bueno" }
    return { color: "bg-destructive", label: "Necesita atención" }
  }

  if (!profile || !recommendation) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Cargando tu dashboard...</p>
        </div>
      </div>
    )
  }

  const trafficLight = getTrafficLight(fhr)
  const totalGastos = Object.values(profile.financial_info.gastos_principales).reduce(
    (sum: number, val: any) => sum + Number(val),
    0,
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">MoneyPilot</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
            Hola, {profile.personal_info.nombre.split(" ")[0]} 👋
          </h1>
          <p className="text-muted-foreground">Aquí está tu consejo del día</p>
        </div>

        {/* Daily Recommendation Card */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className={`w-3 h-3 ${trafficLight.color} rounded-full mt-1.5`} />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-muted-foreground">{trafficLight.label}</span>
                <span className="text-sm text-muted-foreground">
                  • Confianza: {Math.round(recommendation.nivel_confianza * 100)}%
                </span>
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-3">{recommendation.titulo}</h2>
              <p className="text-foreground leading-relaxed mb-4">{recommendation.mensaje_principal}</p>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                  Entendido
                </button>
                <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
                  Necesito más info
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-1">Ingreso mensual</p>
            <p className="text-2xl font-bold text-foreground">
              ${profile.financial_info.ingreso_mensual.toLocaleString()}
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-1">Ahorro mensual</p>
            <p className="text-2xl font-bold text-primary">${profile.financial_info.ahorro_mensual.toLocaleString()}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-1">Deuda total</p>
            <p className="text-2xl font-bold text-destructive">
              ${profile.financial_info.deudas.reduce((sum: number, d: any) => sum + d.monto, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-1">Financial Health Rate</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-foreground">{fhr}%</p>
              <div className={`w-2 h-2 ${trafficLight.color} rounded-full`} />
            </div>
          </div>
        </div>

        {/* Expense Distribution */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-6">Distribución de gastos</h3>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-48 h-48">
              <DonutChart data={profile.financial_info.gastos_principales} />
            </div>
            <div className="flex-1 space-y-3 w-full">
              {Object.entries(profile.financial_info.gastos_principales).map(([key, value]: [string, any]) => {
                const percentage = ((value / totalGastos) * 100).toFixed(1)
                return (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground capitalize">{key.replace("_", " ")}</span>
                      <span className="text-muted-foreground">
                        ${value.toLocaleString()} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Historial de registros</h3>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Info className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{transaction.titulo}</p>
                    <p className="text-sm text-muted-foreground">{transaction.fecha}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{transaction.tipo}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

function DonutChart({ data }: { data: Record<string, number> }) {
  const total = Object.values(data).reduce((sum, val) => sum + val, 0)
  const colors = ["#10b981", "#f59e0b", "#6366f1", "#ec4899", "#8b5cf6", "#14b8a6"]

  let currentAngle = 0
  const segments = Object.entries(data).map(([key, value], index) => {
    const percentage = value / total
    const angle = percentage * 360
    const startAngle = currentAngle
    currentAngle += angle

    return { key, value, percentage, startAngle, angle, color: colors[index] }
  })

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="40" fill="none" stroke="#f5f5f4" strokeWidth="20" />
      {segments.map((segment, index) => {
        const startAngle = segment.startAngle - 90
        const endAngle = startAngle + segment.angle

        const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
        const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
        const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
        const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)

        const largeArc = segment.angle > 180 ? 1 : 0

        return (
          <path
            key={index}
            d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
            fill={segment.color}
            opacity="0.8"
          />
        )
      })}
      <circle cx="50" cy="50" r="25" fill="#fafaf9" />
    </svg>
  )
}
