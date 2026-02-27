import { API_URL } from './api'

type LoginPayload = {
  email: string
  password: string
}

type LoginResponse = {
  token: string
}

export const loginRequest = async (payload: LoginPayload): Promise<LoginResponse> => {
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

  return response.json() as Promise<LoginResponse>
}

export const registerRequest = async (payload: LoginPayload) => {
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

  return response.json() as Promise<{ id: string; email: string; createdAt: string }>
}
