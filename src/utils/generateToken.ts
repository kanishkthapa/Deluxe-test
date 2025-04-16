import { SignJWT } from "jose";

export async function generateToken() {
  const urlParams = new URLSearchParams(window.location.search);
  const transactionId = urlParams.get("id") || "default-transaction";

  const secret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET);
  const jwt = await new SignJWT({
    accessToken: import.meta.env.VITE_ACCESS_TOKEN,
    amount: 26.05,
    transactionReference: transactionId,
    recurring: {
      frequency: "daily",
      start_date: new Date().toISOString().split("T")[0],
      end_date: new Date(new Date().setDate(new Date().getDate() + 5))
        .toISOString()
        .split("T")[0],
      description: "Auto Renewal for the Quote",
      managementUrl: "https://test.com",
      billingAgreement: "test",
      intervals: 5,
    },
  })
    .setProtectedHeader({ alg: "HS256" })
    .sign(secret);

  return jwt;
}
