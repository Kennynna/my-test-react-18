const AUTH_ERROR_MAP: Record<string, string> = {
  'Invalid credentials':
    "Неправильные данные для входа. Используйте: emilys / emilyspass",
  'Failed to fetch':
    'Не удалось отправить запрос на сервер, проверьте соединение',
  'Request timeout':
    'Долгое ожидание от сервера',
};

const FALLBACK_MESSAGE = 'Неизвестная ошибка, попробуйте позже';

export function resolveAuthError(error: unknown): string {
  if (error instanceof Error) {
    return AUTH_ERROR_MAP[error.message] ?? FALLBACK_MESSAGE;
  }
  return FALLBACK_MESSAGE;
}
