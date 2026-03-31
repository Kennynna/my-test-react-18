import type { LoginRequest, LoginResponse, User } from '../types.ts';
import { API_URL } from '../../../shared/config/index.ts';

const REQUEST_TIMEOUT_MS = 5000;

export async function loginRequest(body: LoginRequest): Promise<LoginResponse> {
  const controller = new AbortController();
  const timerId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;

  try {
    response = await fetch(API_URL.auth.login, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw err;
  } finally {
    clearTimeout(timerId);
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? 'Ошибка авторизации');
  }

  return response.json();
}

export async function getMeRequest(accessToken: string): Promise<User> {
  const response = await fetch(API_URL.auth.me, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error('Сессия истекла');
  }

  return response.json();
}

export async function refreshTokenRequest(refreshToken: string): Promise<LoginResponse> {
  const response = await fetch(API_URL.auth.refresh, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken, expiresInMins: 30 }),
  });

  if (!response.ok) {
    throw new Error('Не удалось обновить токен');
  }

  return response.json();
}
