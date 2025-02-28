import { useState , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  useEffect(() => {

    const jwt ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NUb2tlbiI6IjYyMjRDNEM3LUE5MjUtNDAyRi1BMTY3LUQ0MkFDMzk1RDVDNCIsImFtb3VudCI6MjYuMDUsImN1c3RvbWVyIjp7ImZpcnN0TmFtZSI6IkphbWVzIiwibGFzdE5hbWUiOiJCb25kIiwiYmlsbGluZ0FkZHJlc3MiOnsiYWRkcmVzcyI6IjIwIHN0cmVldCBhZGRyZXNzIiwiY2l0eSI6IkRhbGxhcyIsInN0YXRlIjoiVFgiLCJ6aXBDb2RlIjoiNTAwNTQiLCJjb3VudHJ5Q29kZSI6IlVTQSJ9fX0.LuZ9WRYK4RLAcHwiHzhG7T-vnlsmWXaNF3ZlEq7-LCU"

    EmbeddedPayments.init(jwt, {
    countryCode: "US",
    currencyCode: "USD",
    paymentMethods: ["ach", "cc"],
    merchantCapabilities: ["supports3DS"],
    allowedCardAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
    supportedNetworks: ["visa", "masterCard", "amex", "discover"],
    googlePayEnv: "TEST",
}).then((instance) => {
    instance
        .setEventHandlers({
            onTxnSuccess: (gateway, data) => {
                console.log(`${gateway} Transaction Succeeded: ${JSON.stringify(data)}`);
            },
            onTxnFailed: (gateway, data) => {
                console.log(`${gateway} Transaction Failed: ${JSON.stringify(data)}`);
            },
            onValidationError: (gateway, errors) => {
                console.log(`Validation Error: ${JSON.stringify(errors)}`);
            },
            onCancel: (gateway) => {
                console.log(`${gateway} transaction cancelled`);
            }
        })
        .render({
            containerId: "embeddedpayments"
        });
});
  }, [])
  

  return (
    <>
      <div>Hey</div>
      <div id="embeddedpayments"></div>

    </>
  )
}

export default App
