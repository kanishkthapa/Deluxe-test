/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";


async function fetchPurchase(): Promise<string | undefined> {
  const urlParams = new URLSearchParams(window.location.search);
  const transactionId = urlParams.get("id") || "default-transaction";

  //   const apiUrl =
  //     import.meta.env.VITE_POLICY_API_URL ||
  //     "https://subtle-caring-walleye.ngrok-free.app";
  const apiKey =
    import.meta.env.VITE_API_KEY ||
    "pk_live_$2a$10$KEAlp9JsgAD6zlWWFNIYDuPMR/tVJTNwxNutBvpKM7vKXZh16TsdG";

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `/api/purchases/${transactionId}`,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "ngrok-skip-browser-warning": "true",
    },
  };

  try {
    const response = await axios.request(config);
    console.log("response from fetchPurchase", JSON.stringify(response.data));
    return response.data?.payment_gateway?.embedded_payment_config?.jwt;
  } catch (error) {
    console.error("Error fetching purchase:", error);
    return undefined;
  }
}

export default fetchPurchase;
