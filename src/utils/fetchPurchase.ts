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

  // "/api" is proxied to policy-api by netlify.toml (deploy) and vite.config.ts (dev).
  const response = await axios.get(`/api/purchases/${purchaseId}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "ngrok-skip-browser-warning": "true",
    },
  });

  const purchase = response.data;
  console.log("response from fetchPurchase", JSON.stringify(purchase));

  if (typeof purchase !== "object" || purchase === null) {
    throw new Error(
      `Expected JSON from /api/purchases/${purchaseId} but got ${typeof purchase}. ` +
        "The /api proxy to policy-api is probably not applied."
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
