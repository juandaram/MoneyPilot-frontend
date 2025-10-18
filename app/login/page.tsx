"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { TrendingUp } from "lucide-react"
import { loginUser, getCurrentUser } from "@/lib/api"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [statusMsg, setStatusMsg] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("mp_token")
    if (token) {
      console.log(`[v0] INIT: token found in localStorage`)
      // Optionally verify token is still valid
    } else {
      console.log(`[v0] INIT: no token in localStorage`)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatusMsg("Iniciando sesión...")

    try {
      // Step 1: Login
      const loginResult = await loginUser(email, password)

      if (!loginResult.ok) {
        setStatusMsg("Error en el login")
        setIsLoading(false)
        return
      }

      setStatusMsg("Login exitoso")

      // Step 2: Check for token in response
      let token = null
      // TODO: Verify actual token field name from API response
      if (loginResult.json?.token) {
        token = loginResult.json.token
        localStorage.setItem("mp_token", token)
        console.log(`[v0] LOGIN: token saved to localStorage`)
      }

      // Step 3: Fetch current user (API may return null body on login)
      const userResult = await getCurrentUser(token || undefined)

      if (userResult.ok && userResult.json) {
        localStorage.setItem("current_user", JSON.stringify(userResult.json))
        console.log(`[v0] LOGIN: current user saved`, userResult.json)
      }

      // Navigate to dashboard
      setTimeout(() => {
        router.push("/dashboard")
      }, 500)
    } catch (error: any) {
      console.error(`[v0] LOGIN: Unexpected error`, error)
      setStatusMsg("Error inesperado")
      setIsLoading(false)
    }
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

      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-foreground mb-2">Iniciar sesión</h1>
          <p className="text-muted-foreground mb-8">Bienvenido de vuelta a MoneyPilot</p>

          {statusMsg && (
            <div className="mb-4 p-3 bg-secondary rounded-lg text-center">
              <p className="text-sm text-foreground">{statusMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>

            <p className="text-sm text-center text-muted-foreground">
              ¿No tienes cuenta?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Regístrate gratis
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  )
}
