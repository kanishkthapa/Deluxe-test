import { SignJWT, jwtVerify } from 'jose';


export async function generateToken() {
    const secret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET);
    const jwt = await new SignJWT(
        {
            "accessToken": import.meta.env.VITE_ACCESS_TOKEN,
            "amount": 26.05,
            "customer": {
                "firstName": "James",
                "lastName": "Bond",
                "billingAddress": {
                    "address": "20 street address",
                    "city": "Dallas",
                    "state": "TX",
                    "zipCode": "50054",
                    "countryCode": "USA"
                }
            }
        })
        .setProtectedHeader({ alg: 'HS256' })
        .sign(secret);

    return jwt
}
