import { useEffect } from 'react'

export function Deluxe({ jwt }) {
    useEffect(() => {
        //@ts-ignore
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
        <div id="embeddedpayments"></div>
    )
}

