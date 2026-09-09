import axios from "axios";

function getPurchaseApiUrl(purchaseId: string): string {
  const policyApiUrl = import.meta.env.VITE_POLICY_API_URL?.replace(/\/$/, "");

  if (policyApiUrl) {
    // Production/staging: call policy-api directly (set in Netlify env at build time).
    return `${policyApiUrl}/purchases/${purchaseId}`;
  }

  // Local dev: vite.config.ts proxies /api/* to VITE_POLICY_API_URL or ngrok.
  return `/api/purchases/${purchaseId}`;
}

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

  const purchaseUrl = getPurchaseApiUrl(purchaseId);
  const response = await axios.get(purchaseUrl, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "ngrok-skip-browser-warning": "true",
    },
  });

  const purchase = response.data;
  console.log("response from fetchPurchase", JSON.stringify(purchase));

  if (typeof purchase !== "object" || purchase === null) {
    throw new Error(
      `Expected JSON from ${purchaseUrl} but got ${typeof purchase}. ` +
        "Check VITE_POLICY_API_URL (Netlify) or the /api dev proxy (local)."
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
