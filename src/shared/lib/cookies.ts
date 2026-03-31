interface CookieOptions {
  expires?: number;
  path?: string;
}

export function getCookie(name: string): string | null {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'),
  );
  return matches ? decodeURIComponent(matches[1]) : null;
}

export function setCookie(name: string, value: string, options: CookieOptions = {}) {
  const { expires, path = '/' } = options;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=${path}`;

  if (expires) {
    const date = new Date();
    date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
    cookieString += `; expires=${date.toUTCString()}`;
  }

  document.cookie = cookieString;
}

export function removeCookie(name: string, path = '/') {
  document.cookie = `${encodeURIComponent(name)}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}
