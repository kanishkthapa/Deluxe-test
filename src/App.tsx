import { Deluxe } from "./components/Deluxe";
import "./App.css";
import { useEffect, useState } from "react";
import fetchPurchase from "./utils/fetchPurchase";

export function App() {
  const [jwt, setJwt] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetchPurchase()
      .then((purchaseJwt: string) => {
        console.log("setting purchase jwt", purchaseJwt);
        setJwt(purchaseJwt);
      })
      .catch((err: unknown) => {
        console.error("Error fetching purchase:", err);
        setError(err instanceof Error ? err.message : String(err));
      });
  }, []);

  if (error) {
    return (
      <div style={{ padding: 16, color: "crimson" }}>
        <strong>Could not load the payment form</strong>
        <p>{error}</p>
      </div>
    );
  }

  if (!jwt) {
    return <div style={{ padding: 16 }}>Loading payment form…</div>;
  }

  return <Deluxe jwt={jwt} />;
}

export default App;
