import { SignJWT } from "jose";

export async function generateToken() {
  const urlParams = new URLSearchParams(window.location.search);
  const transactionId = urlParams.get("id") || "default-transaction";

  const secret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET);
  const jwt = await new SignJWT({
    accessToken: import.meta.env.VITE_ACCESS_TOKEN,
    amount: 26.05,
    transactionReference: transactionId,
  })
    .setProtectedHeader({ alg: "HS256" })
    .sign(secret);

  return jwt;
}
