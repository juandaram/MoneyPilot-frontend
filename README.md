# MoneyPilot - Asistente Financiero Personal

MoneyPilot es una aplicación web de finanzas personales diseñada para Latinoamérica que proporciona consejos financieros diarios simples y contextualizados.

## Características

- 🎯 Landing page minimalista con propuesta de valor clara
- 📝 Onboarding de 10 preguntas para capturar perfil financiero
- 🔐 Sistema de autenticación (login/registro)
- 📊 Dashboard con:
  - Consejo financiero diario con nivel de confianza
  - Indicador de salud financiera (Financial Health Rate)
  - Distribución de gastos visualizada
  - Historial de recomendaciones
- 🎨 Diseño mobile-first, accesible y responsive
- 🌐 Microcopy en español latinoamericano

## Tecnologías

- **Framework**: Next.js 15 (App Router)
- **Estilos**: Tailwind CSS v4
- **Lenguaje**: TypeScript
- **Iconos**: Lucide React

## Instalación

1. Clona el repositorio o descarga el código

2. Instala las dependencias:
\`\`\`bash
npm install
\`\`\`

3. Ejecuta el servidor de desarrollo:
\`\`\`bash
npm run dev
\`\`\`

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## Estructura del Proyecto

\`\`\`
├── app/
│   ├── page.tsx              # Landing page
│   ├── register/page.tsx     # Onboarding (10 preguntas)
│   ├── login/page.tsx        # Inicio de sesión
│   ├── dashboard/page.tsx    # Panel principal
│   └── api/                  # Endpoints mock
│       ├── auth/
│       ├── profile/
│       ├── recommendation/
│       └── transactions/
├── public/data/              # JSONs estáticos
│   ├── user_profile.json
│   ├── recommendation_today.json
│   └── transactions.json
└── README.md
\`\`\`

## Datos Estáticos

La aplicación actualmente usa datos estáticos en `/public/data/` para demostración. Los endpoints de API en `/app/api/` están preparados para integración con backend real.

### Archivos de datos:

- `user_profile.json` - Perfil completo del usuario
- `recommendation_today.json` - Consejo financiero diario
- `transactions.json` - Historial de recomendaciones

## Integración con Backend

Los siguientes endpoints están listos para conectar con una API real:

- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Autenticación
- `GET /api/profile` - Obtener perfil de usuario
- `GET /api/recommendation/today` - Consejo del día
- `GET /api/transactions` - Historial de transacciones

Busca comentarios `// TODO: Replace with actual...` en el código para identificar puntos de integración.

## Cálculo del Financial Health Rate (FHR)

El FHR se calcula con la siguiente fórmula:

\`\`\`
savings_rate = ahorro_mensual / ingreso_mensual
debt_ratio = total_deuda / ingreso_mensual

debt_score = 
  1.0 si debt_ratio <= 0.3
  0.6 si debt_ratio <= 0.5
  0.2 si debt_ratio <= 0.8
  0.0 si debt_ratio > 0.8

FHR = (min(savings_rate/0.3, 1) * 0.4) + (debt_score * 0.3) + ((nivel_conocimiento/5) * 0.3)
\`\`\`

Interpretación:
- **≥60%**: Verde (Excelente)
- **40-59%**: Amarillo (Bueno)
- **<40%**: Rojo (Necesita atención)

## Próximos Pasos

1. Integrar con base de datos real (Supabase, Neon, etc.)
2. Implementar autenticación segura con JWT
3. Conectar con API de recomendaciones financieras
4. Agregar más visualizaciones y análisis
5. Implementar notificaciones push

## Licencia

Este proyecto es un prototipo de demostración..
