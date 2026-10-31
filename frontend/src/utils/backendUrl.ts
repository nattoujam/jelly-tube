export function backendUrl(path: string): string {
  return new URL(path, import.meta.env.VITE_BACKEND_ENDPOINT).href
}
