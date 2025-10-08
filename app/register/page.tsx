"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, TrendingUp } from "lucide-react"

const QUESTIONS = [
  {
    id: "ingreso_mensual",
    question: "¿Cuál es tu ingreso mensual promedio actual?",
    type: "number",
    placeholder: "Ej: 2800000",
    suffix: "en tu moneda local",
  },
  {
    id: "tipo_ingreso",
    question: "¿Tus ingresos son fijos o varían cada mes?",
    type: "radio",
    options: [
      { value: "fijo", label: "Fijos" },
      { value: "variables", label: "Variables" },
    ],
  },
  {
    id: "gastos",
    question: "¿Cuáles son tus principales gastos mensuales?",
    type: "expenses",
    categories: ["vivienda", "alimentacion", "transporte", "educacion", "ocio", "otros"],
  },
  {
    id: "deudas",
    question: "¿Tienes alguna deuda actualmente?",
    type: "debt",
  },
  {
    id: "ahorro_mensual",
    question: "¿Cuánto logras ahorrar al mes, en promedio?",
    type: "number",
    placeholder: "Ej: 300000",
  },
  {
    id: "meta_financiera",
    question: "¿Tienes alguna meta financiera a corto/mediano plazo?",
    type: "goal",
  },
  {
    id: "nivel_conocimiento",
    question: "¿Qué nivel de conocimiento financiero consideras tener?",
    type: "scale",
    min: 1,
    max: 5,
    labels: ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"],
  },
  {
    id: "tolerancia_riesgo",
    question: "¿Cuál es tu tolerancia al riesgo?",
    type: "radio",
    options: [
      { value: "bajo", label: "Bajo - Prefiero seguridad" },
      { value: "medio", label: "Medio - Balance entre seguridad y crecimiento" },
      { value: "alto", label: "Alto - Busco mayor crecimiento" },
    ],
  },
  {
    id: "areas_interes",
    question: "¿En qué te gustaría que la app te ayudara principalmente?",
    type: "checkbox",
    options: [
      { value: "ahorro", label: "Ahorro" },
      { value: "control_gastos", label: "Control de gastos" },
      { value: "inversion", label: "Inversión" },
      { value: "manejo_deudas", label: "Manejo de deudas" },
      { value: "educacion_financiera", label: "Educación financiera" },
    ],
  },
  {
    id: "ubicacion",
    question: "¿En qué país y ciudad vives actualmente?",
    type: "location",
  },
]

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, any>>({
    email: "",
    password: "",
    nombre: "",
  })

  const currentQuestion = QUESTIONS[step]
  const progress = ((step + 1) / (QUESTIONS.length + 1)) * 100

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    // TODO: Replace with actual API call to /api/auth/register
    const profile = {
      ...formData,
      fecha_creacion: new Date().toISOString(),
    }

    localStorage.setItem("user_profile", JSON.stringify(profile))
    localStorage.setItem("auth_token", "mock_token_" + Date.now())

    router.push("/dashboard")
  }

  const updateFormData = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value })
  }

  if (step === -1) {
    // Initial step: email, password, name
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">MoneyPilot</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-foreground mb-2">Crear cuenta</h1>
            <p className="text-muted-foreground mb-8">Comienza tu viaje hacia una mejor salud financiera</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nombre completo</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => updateFormData("nombre", e.target.value)}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="María López"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Contraseña</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="••••••••"
                />
              </div>

              <button
                onClick={() => setStep(0)}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Continuar
              </button>

              <p className="text-sm text-center text-muted-foreground">
                ¿Ya tienes cuenta?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">MoneyPilot</span>
          </Link>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Pregunta {step + 1} de {QUESTIONS.length}
            </span>
            <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <QuestionRenderer
            question={currentQuestion}
            value={formData[currentQuestion.id]}
            onChange={(value) => updateFormData(currentQuestion.id, value)}
          />

          <div className="flex gap-4 mt-8">
            {step > 0 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              {step === QUESTIONS.length - 1 ? "Finalizar" : "Siguiente"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

function QuestionRenderer({
  question,
  value,
  onChange,
}: {
  question: any
  value: any
  onChange: (value: any) => void
}) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-balance">{question.question}</h2>

      {question.type === "number" && (
        <div>
          <input
            type="number"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 text-lg border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder={question.placeholder}
          />
          {question.suffix && <p className="text-sm text-muted-foreground mt-2">{question.suffix}</p>}
        </div>
      )}

      {question.type === "radio" && (
        <div className="space-y-3">
          {question.options.map((option: any) => (
            <label
              key={option.value}
              className="flex items-center gap-3 p-4 border border-input rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
            >
              <input
                type="radio"
                name={question.id}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="w-4 h-4 text-primary"
              />
              <span className="text-foreground">{option.label}</span>
            </label>
          ))}
        </div>
      )}

      {question.type === "checkbox" && (
        <div className="space-y-3">
          {question.options.map((option: any) => (
            <label
              key={option.value}
              className="flex items-center gap-3 p-4 border border-input rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
            >
              <input
                type="checkbox"
                value={option.value}
                checked={(value || []).includes(option.value)}
                onChange={(e) => {
                  const current = value || []
                  if (e.target.checked) {
                    onChange([...current, option.value])
                  } else {
                    onChange(current.filter((v: string) => v !== option.value))
                  }
                }}
                className="w-4 h-4 text-primary rounded"
              />
              <span className="text-foreground">{option.label}</span>
            </label>
          ))}
        </div>
      )}

      {question.type === "scale" && (
        <div className="space-y-4">
          <div className="flex justify-between gap-2">
            {Array.from({ length: question.max }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => onChange(num)}
                className={`flex-1 py-4 rounded-lg font-medium transition-colors ${
                  value === num
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{question.labels[0]}</span>
            <span>{question.labels[question.labels.length - 1]}</span>
          </div>
        </div>
      )}

      {question.type === "expenses" && (
        <div className="space-y-3">
          {question.categories.map((category: string) => (
            <div key={category}>
              <label className="block text-sm font-medium text-foreground mb-2 capitalize">
                {category.replace("_", " ")}
              </label>
              <input
                type="number"
                value={(value || {})[category] || ""}
                onChange={(e) => onChange({ ...(value || {}), [category]: e.target.value })}
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      )}

      {question.type === "debt" && (
        <div className="space-y-4">
          <div className="flex gap-4">
            <button
              onClick={() => onChange({ tiene_deuda: false })}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                value?.tiene_deuda === false
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              No
            </button>
            <button
              onClick={() => onChange({ tiene_deuda: true })}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                value?.tiene_deuda === true
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              Sí
            </button>
          </div>

          {value?.tiene_deuda && (
            <div className="space-y-3 pt-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tipo de deuda</label>
                <select
                  value={value.tipo || ""}
                  onChange={(e) => onChange({ ...value, tipo: e.target.value })}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Selecciona...</option>
                  <option value="tarjeta_credito">Tarjeta de crédito</option>
                  <option value="prestamo_personal">Préstamo personal</option>
                  <option value="hipotecario">Hipotecario</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Monto total</label>
                <input
                  type="number"
                  value={value.monto || ""}
                  onChange={(e) => onChange({ ...value, monto: e.target.value })}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tasa de interés aproximada (%)</label>
                <input
                  type="number"
                  value={value.tasa || ""}
                  onChange={(e) => onChange({ ...value, tasa: e.target.value })}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="25"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {question.type === "goal" && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Describe tu meta</label>
            <input
              type="text"
              value={value?.descripcion || ""}
              onChange={(e) => onChange({ ...(value || {}), descripcion: e.target.value })}
              className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Ej: Crear fondo de emergencia"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Plazo</label>
            <select
              value={value?.plazo || ""}
              onChange={(e) => onChange({ ...(value || {}), plazo: e.target.value })}
              className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Selecciona...</option>
              <option value="3m">3 meses</option>
              <option value="6m">6 meses</option>
              <option value="12m">12 meses</option>
              <option value="24m">24 meses</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Monto objetivo</label>
            <input
              type="number"
              value={value?.monto || ""}
              onChange={(e) => onChange({ ...(value || {}), monto: e.target.value })}
              className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="0"
            />
          </div>
        </div>
      )}

      {question.type === "location" && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">País</label>
            <input
              type="text"
              value={value?.pais || ""}
              onChange={(e) => onChange({ ...(value || {}), pais: e.target.value })}
              className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Colombia"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Ciudad</label>
            <input
              type="text"
              value={value?.ciudad || ""}
              onChange={(e) => onChange({ ...(value || {}), ciudad: e.target.value })}
              className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Bogotá"
            />
          </div>
        </div>
      )}
    </div>
  )
}
