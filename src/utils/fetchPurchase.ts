/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from "axios";

// Create a proxy client that handles CORS issues
const createProxyClient = () => {
  const proxyURL = (url: string) => {
    // Use cors-anywhere or similar service as a fallback
    // Only use this if direct requests fail
    return `https://corsproxy.io/?${encodeURIComponent(url)}`;
  };

  return {
    async request(config: unknown) {
      try {
        // First try a direct request
        return await axios.request(config as AxiosRequestConfig);
      } catch (error: any) {
        // If it's a CORS error, try using the proxy
        if (error.message.includes("CORS") || error.code === "ERR_NETWORK") {
          const proxyConfig = { ...(config as AxiosRequestConfig) };

          // Replace the URL with the proxied version
          proxyConfig.url = proxyURL(proxyConfig.url as string);

          // Remove any baseURL since we're now using absolute URLs
          delete proxyConfig.baseURL;

          return axios.request(proxyConfig);
        }

        // For other errors, just re-throw
        throw error;
      }
    },
  };
};

async function fetchPurchase(): Promise<string | undefined> {
  const urlParams = new URLSearchParams(window.location.search);
  const transactionId = urlParams.get("id") || "default-transaction";

  const apiUrl =
    import.meta.env.VITE_POLICY_API_URL ||
    "https://subtle-caring-walleye.ngrok-free.app";
  const apiKey =
    import.meta.env.VITE_API_KEY ||
    "pk_live_$2a$10$KEAlp9JsgAD6zlWWFNIYDuPMR/tVJTNwxNutBvpKM7vKXZh16TsdG";

  const client = createProxyClient();

  try {
    const response = await client.request({
      method: "get",
      url: `${apiUrl}/purchases/${transactionId}`,
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    console.log("response from fetchPurchase", JSON.stringify(response.data));
    return response.data?.payment_gateway?.embedded_payment_config?.jwt;
  } catch (error) {
    console.error("Error fetching purchase:", error);
    return undefined;
  }
}

export default fetchPurchase;
