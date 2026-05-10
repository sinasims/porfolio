// lib/csrf.js
export function getCsrfToken() {
  if (typeof document === 'undefined') return null;
  const name = 'csrftoken';
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`))
    ?.split('=')[1];
  return cookieValue || null;
}