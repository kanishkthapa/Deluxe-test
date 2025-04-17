import axios from "axios";

async function fetchPurchase(): Promise<string | undefined> {
  const urlParams = new URLSearchParams(window.location.search);
  const transactionId = urlParams.get("id") || "default-transaction";

  console.log("transactionId", transactionId);
  console.log("VITE_POLICY_API_URL", import.meta.env.VITE_POLICY_API_URL);
  console.log("VITE_API_KEY", import.meta.env.VITE_API_KEY);

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_POLICY_API_URL}/purchases/${transactionId}`,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
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
