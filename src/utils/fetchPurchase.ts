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
    console.log(JSON.stringify(response.data));
    return response.data.jwt;
  } catch (error) {
    console.log(error);
  }
}

export default fetchPurchase;
