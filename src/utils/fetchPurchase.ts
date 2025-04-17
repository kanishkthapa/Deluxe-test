import axios from "axios";

const urlParams = new URLSearchParams(window.location.search);
const transactionId = urlParams.get("id") || "default-transaction";

console.log("transactionId", transactionId);

const config = {
  method: "get",
  maxBodyLength: Infinity,
  url: `${process.env.POLICY_API_URL}/purchases/${transactionId}`,
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
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
