import axios from "axios";

const urlParams = new URLSearchParams(window.location.search);
const transactionId = urlParams.get("id") || "default-transaction";

console.log("transactionId", transactionId);
console.log("POLICY_API_URL", import.meta.env.POLICY_API_URL);
console.log("API_KEY", import.meta.env.API_KEY);

const config = {
  method: "get",
  maxBodyLength: Infinity,
  url: `${import.meta.env.POLICY_API_URL}/purchases/${transactionId}`,
  headers: {
    Authorization: `Bearer ${import.meta.env.API_KEY}`,
  },
};

async function fetchPurchase(): Promise<string | undefined> {
  try {
    const response = await axios.request(config);
    console.log("response from fetchPurchase", JSON.stringify(response.data));
    return response.data?.payment_gateway?.embedded_payment_config?.jwt;
  } catch (error) {
    console.log(error);
  }
}

export default fetchPurchase;
