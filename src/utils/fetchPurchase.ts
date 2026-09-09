import axios from "axios";

async function fetchPurchase(): Promise<string> {
  const urlParams = new URLSearchParams(window.location.search);
  const purchaseId = urlParams.get("id");

  if (!purchaseId) {
    throw new Error(
      "No purchase id in the URL. Open this page as ?id=<purchase_id>."
    );
  }

  const apiKey =
    import.meta.env.VITE_API_KEY ||
    "pk_live_$2a$10$KEAlp9JsgAD6zlWWFNIYDuPMR/tVJTNwxNutBvpKM7vKXZh16TsdG";

  // Same-origin /api avoids browser CORS. Proxied at runtime via POLICY_API_URL
  // (Netlify edge function or vite dev server) — ngrok or staging, no redeploy to switch.
  const purchaseUrl = `/api/purchases/${purchaseId}`;

  const response = await axios.get(purchaseUrl, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      // Forwarded server-side by the proxy when the target is ngrok.
      "ngrok-skip-browser-warning": "true",
    },
  });

  const purchase = response.data;
  console.log("response from fetchPurchase", JSON.stringify(purchase));

  if (typeof purchase !== "object" || purchase === null) {
    throw new Error(
      `Expected JSON from ${purchaseUrl} but got ${typeof purchase}. ` +
        "Check VITE_POLICY_API_URL is set in Netlify and redeploy, or vite proxy locally."
    );
  }

  if (purchase.error) {
    throw new Error(`policy-api returned an error: ${purchase.error}`);
  }

  const jwt = purchase.payment_gateway?.embedded_payment_config?.jwt;

  if (!jwt) {
    throw new Error(
      `Purchase ${purchaseId} has no payment_gateway.embedded_payment_config.jwt. ` +
        "Check that its insurer product uses the deluxe payment gateway."
    );
  }

  return jwt;
}

export default fetchPurchase;
