const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : "http://localhost:8000/api";

export function buildApiUrl(path: string) {
  const route = path.replace(/^\/+/, "");
  return `${apiBaseUrl}/${route}`;
}

export function normalizeResponse(data: any) {
  if (Array.isArray(data)) {
    return data;
  }
  if (data && typeof data === "object") {
    return data.data ?? data.items ?? data.results ?? [data];
  }
  return [data];
}
