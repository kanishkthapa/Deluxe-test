import { Deluxe } from "./components/Deluxe";
import "./App.css";
import { generateToken } from "./utils/generateToken";
import { useEffect, useState } from "react";
import fetchPurchase from "./utils/fetchPurchase";

export function App() {
  const [jwt, setJwt] = useState<string | undefined>(undefined);
  useEffect(() => {
    // call the fetch purchase API to get the jwt
    fetchPurchase().then((jwt: string | undefined) => {
      if (jwt) {
        setJwt(jwt);
      } else {
        generateToken().then(setJwt);
      }
    });
  }, []);

  return (
    <div>
      <div>hey hey</div>
      {jwt && <Deluxe jwt={jwt} />}
    </div>
  );
}

export default App;
