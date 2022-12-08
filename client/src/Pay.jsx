import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const KEY = "pk_test_51MCL3mDVg8SIBczqixTLrLaoqEqPPU2HNIAcIo6unBZEgo8XrKP8aohOhzEdGNz59BCYQoF7fNmmYmbdKNh1adOm00wr5tUlrD"

const Pay = () => {
    const [stripeToken, setStripeToken] = useState(null);

    const onToken = (token) => {
        console.log(token);
        setStripeToken(token);
    }

    useEffect(() => {
        async function makeRequest() {
            try {
                const res = await axios.post(
                    "http://localhost:5000/api/checkout/payment",
                    {
                        tokenId: stripeToken.id,
                        amount: 2000,
                    }
                );
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        return stripeToken && makeRequest;

    }, [stripeToken]);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <StripeCheckout
                name="Lama Ecommerce." // the pop-in header title
                image="https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                shippingAddress
                billingAddress
                description="Your total is $20" // the pop-in header subtitle
                amount={2000} //cents
                currency="AUD"
                stripeKey={KEY}
                token={onToken}
            >
                <button
                    style={{
                        border: "none",
                        width: 120,
                        borderRadius: 5,
                        padding: "20px",
                        backgroundColor: "black",
                        color: "white",
                        fontWeight: "600",
                        cursor: "pointer"
                    }}>
                    Pay Now
                </button>
            </StripeCheckout>
        </div>
    )
}

export default Pay;