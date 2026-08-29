/**
 * next/image with `unoptimized: true` passes `src` through untouched — it does
 * NOT apply basePath. On a GitHub Pages project site that turns every image
 * into a 404 while the build still reports success. Prefix them by hand.
 *
 * Must match `basePath` in next.config.ts.
 */
export const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH ?? "/el-haj-international";

export const asset = (path: string) => `${BASE_PATH}${path}`;
