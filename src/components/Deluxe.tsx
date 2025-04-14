/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

interface DeluxeProps {
  jwt: string;
}

export function Deluxe({ jwt }: DeluxeProps) {
  useEffect(() => {
    //@ts-expect-error EmbeddedPayments is loaded from external script
    EmbeddedPayments.init(jwt, {
      countryCode: "US",
      currencyCode: "USD",
      paymentMethods: ["ach", "cc"],
      merchantCapabilities: ["supports3DS"],
      allowedCardAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
      supportedNetworks: ["visa", "masterCard", "amex", "discover"],
      googlePayEnv: "TEST",
    }).then((instance: any) => {
      instance
        .setEventHandlers({
          onTxnSuccess: (gateway: string, data: unknown) => {
            console.log(
              `${gateway} Transaction Succeeded: ${JSON.stringify(data)}`
            );
          },
          onTxnFailed: (gateway: string, data: unknown) => {
            console.log(
              `${gateway} Transaction Failed: ${JSON.stringify(data)}`
            );
          },
          onValidationError: (_gateway: string, errors: unknown) => {
            console.log(`Validation Error: ${JSON.stringify(errors)}`);
          },
          onCancel: (gateway: string) => {
            console.log(`${gateway} transaction cancelled`);
          },
        })
        .render({
          containerId: "embeddedpayments",
        });
    });
  }, [jwt]);

  return <div id="embeddedpayments"></div>;
}
