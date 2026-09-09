import type { Config, Context } from "https://edge.netlify.com/v1/index.ts";

/**
 * Runtime proxy: /api/* -> POLICY_API_URL/*
 *
 * POLICY_API_URL is read at request time from Netlify env vars, so you can
 * switch between ngrok and staging without redeploying the site.
 *
 * Examples:
 *   https://xxxx.ngrok-free.app
 *   https://sandbox-cluster.e2e.api.stere.io/staging/sia-sandbox-1
 */
export default async (request: Request, _context: Context) => {
  const policyApiUrl = Netlify.env.get("POLICY_API_URL");

  if (!policyApiUrl) {
    return new Response(
      JSON.stringify({
        error:
          "POLICY_API_URL is not set. Add it in Netlify → Site configuration → Environment variables.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const url = new URL(request.url);
  const upstreamPath = url.pathname.replace(/^\/api/, "") || "/";
  const upstreamUrl = `${policyApiUrl.replace(/\/$/, "")}${upstreamPath}${url.search}`;

  const headers = new Headers(request.headers);
  headers.delete("host");

  return fetch(
    new Request(upstreamUrl, {
      method: request.method,
      headers,
      body:
        request.method !== "GET" && request.method !== "HEAD"
          ? request.body
          : undefined,
    })
  );
};

export const config: Config = {
  path: "/api/*",
};
