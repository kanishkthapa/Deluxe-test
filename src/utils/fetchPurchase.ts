// import axios from "axios";


async function fetchPurchase(): Promise<string | undefined> {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const transactionId = urlParams.get("id") || "default-transaction";

    console.log("transactionId", transactionId);
    console.log("VITE_POLICY_API_URL", import.meta.env.VITE_POLICY_API_URL);
    console.log("VITE_API_KEY", import.meta.env.VITE_API_KEY);
    const response = await fetch(
      `${import.meta.env.VITE_POLICY_API_URL}/purchases/${transactionId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("response from fetchPurchase", JSON.stringify(data));
    return data?.payment_gateway?.embedded_payment_config?.jwt;
  } catch (error) {
    console.error("Error fetching purchase:", error);
    return undefined;
  }
}

export default fetchPurchase;
