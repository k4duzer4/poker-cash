import { API_URL } from './api'

type LoginPayload = {
  email: string
  password: string
}

type LoginResponse = {
  token: string
  mode: 'api' | 'demo'
}

type RegisterResponse = {
  id: string
  email: string
  createdAt: string
  mode: 'api' | 'demo'
}

const demoAuthEnabled = (import.meta.env.VITE_DEMO_AUTH ?? 'false') === 'true'

const wait = (milliseconds: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds)
  })

export const loginRequest = async (payload: LoginPayload): Promise<LoginResponse> => {
  if (demoAuthEnabled) {
    await wait(500)

    return {
      token: `demo-token-${Date.now()}`,
      mode: 'demo',
    }
  }

  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.message ?? 'Falha ao fazer login.')
  }

  const body = (await response.json()) as { token: string }

  return {
    token: body.token,
    mode: 'api',
  }
}

export const registerRequest = async (payload: LoginPayload): Promise<RegisterResponse> => {
  if (demoAuthEnabled) {
    await wait(650)

    return {
      id: `demo-user-${Date.now()}`,
      email: payload.email,
      createdAt: new Date().toISOString(),
      mode: 'demo',
    }
  }

  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.message ?? 'Falha ao registrar usuário.')
  }

  const body = (await response.json()) as { id: string; email: string; createdAt: string }

  return {
    ...body,
    mode: 'api',
  }
}
