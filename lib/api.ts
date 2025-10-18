const API_BASE_URL = "https://mpbackend.david35mm.com/api/v1"

export interface FetchResult<T = any> {
  ok: boolean
  status: number
  json: T | null
  fromFallback?: boolean
  error?: string
}

/**
 * Fetch utility that tries API first, then falls back to static JSON on failure
 * @param url - Full API URL
 * @param options - Fetch options
 * @param fallbackPath - Path to fallback JSON file in /public/data/
 */
export async function fetchWithFallback<T = any>(
  url: string,
  options: RequestInit = {},
  fallbackPath?: string,
): Promise<FetchResult<T>> {
  try {
    console.log(`[v0] FETCH: Attempting ${options.method || "GET"} ${url}`)

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    console.log(`[v0] FETCH: Response status ${response.status}`)

    let json = null
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      json = await response.json()
      console.log(`[v0] FETCH: Response body`, json)
    } else {
      console.log(`[v0] FETCH: Response body is not JSON or empty`)
    }

    if (!response.ok && fallbackPath) {
      console.log(`[v0] FETCH: API failed with status ${response.status}, trying fallback: ${fallbackPath}`)
      return await loadFallback<T>(fallbackPath)
    }

    return {
      ok: response.ok,
      status: response.status,
      json,
    }
  } catch (error: any) {
    console.error(`[v0] NETWORK ERROR: ${error.message}`)

    if (fallbackPath) {
      console.log(`[v0] FETCH: Network error, trying fallback: ${fallbackPath}`)
      return await loadFallback<T>(fallbackPath)
    }

    return {
      ok: false,
      status: 0,
      json: null,
      error: error.message,
    }
  }
}

async function loadFallback<T>(fallbackPath: string): Promise<FetchResult<T>> {
  try {
    const response = await fetch(`/data/${fallbackPath}`)
    const json = await response.json()
    console.log(`[v0] FALLBACK: Loaded ${fallbackPath}`, json)
    return {
      ok: true,
      status: 200,
      json,
      fromFallback: true,
    }
  } catch (error: any) {
    console.error(`[v0] FALLBACK ERROR: Failed to load ${fallbackPath}`, error.message)
    return {
      ok: false,
      status: 0,
      json: null,
      error: `Fallback failed: ${error.message}`,
    }
  }
}

// Auth API functions
export async function registerUser(email: string, password: string, nombre: string) {
  console.log(`[v0] REGISTER: start`)
  console.log(`[v0] REGISTER: payload (contains password)`, { email, password, nombre })

  const result = await fetchWithFallback(
    `${API_BASE_URL}/register`,
    {
      method: "POST",
      body: JSON.stringify({ email, password, nombre }),
    },
    "mock-register.json",
  )

  console.log(`[v0] REGISTER: fetch result`, result)

  if (result.ok) {
    console.log(`[v0] REGISTER: success`, result.json)
  } else {
    console.log(`[v0] REGISTER: failed`, result.error || `Status ${result.status}`)
  }

  return result
}

export async function loginUser(email: string, password: string) {
  console.log(`[v0] LOGIN: start`)
  console.log(`[v0] LOGIN: payload (contains password)`, { email, password })

  const result = await fetchWithFallback(
    `${API_BASE_URL}/login`,
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    },
    "mock-login.json",
  )

  console.log(`[v0] LOGIN: fetch result`, result)

  if (result.ok) {
    console.log(`[v0] LOGIN: success`)
  } else {
    console.log(`[v0] LOGIN: failed`, result.error || `Status ${result.status}`)
  }

  return result
}

export async function getCurrentUser(token?: string) {
  console.log(`[v0] FETCH_CURRENT_USER: start`)

  const headers: Record<string, string> = {}
  if (token) {
    // TODO: Verify if API uses Bearer token or session cookies
    headers["Authorization"] = `Bearer ${token}`
  }

  const result = await fetchWithFallback(
    `${API_BASE_URL}/usuarios/me`,
    {
      method: "GET",
      headers,
    },
    "mock-current-user.json",
  )

  if (result.ok) {
    console.log(`[v0] FETCH_CURRENT_USER: success`, result.json)
  } else {
    console.log(`[v0] FETCH_CURRENT_USER: failed`, result.error || `Status ${result.status}`)
  }

  return result
}

// Profile API functions
export async function getPerfiles(token?: string) {
  console.log(`[v0] PERFILES: get start`)

  const headers: Record<string, string> = {}
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const result = await fetchWithFallback(
    `${API_BASE_URL}/perfiles`,
    {
      method: "GET",
      headers,
    },
    "mock-perfiles.json",
  )

  console.log(`[v0] PERFILES: get result`, result)
  return result
}

export async function createPerfil(payload: any, token?: string) {
  console.log(`[v0] PERFILES: post start`, payload)

  const headers: Record<string, string> = {}
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const result = await fetchWithFallback(
    `${API_BASE_URL}/perfiles`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    },
    "mock-perfil-post.json",
  )

  console.log(`[v0] PERFILES: post result`, result)
  return result
}

export async function updatePerfil(payload: any, token?: string) {
  console.log(`[v0] PERFILES: put start`, payload)

  const headers: Record<string, string> = {}
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const result = await fetchWithFallback(
    `${API_BASE_URL}/perfiles`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(payload),
    },
    "mock-perfil-put.json",
  )

  console.log(`[v0] PERFILES: put result`, result)
  return result
}
