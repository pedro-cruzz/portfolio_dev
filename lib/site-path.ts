// Public assets and plain anchors do not receive Next.js basePath automatically.
export function withBasePath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return path.startsWith("/") && !path.startsWith("//")
    ? `${basePath}${path}`
    : path;
}
