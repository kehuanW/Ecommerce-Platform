import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { userRequest } from '../requestMethods';
import { clearCart } from "../redux/cartRedux";

const Success = () => {
    const dispatch = useDispatch();
    // const cart = useSelector((state) => state.cart);
    // const location = useLocation();
    //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
    // const data = location.state.stripeData;
    // const cart = location.state.cart;
    // const currentUser = useSelector((state) => state.user.currentUser);
    // const [orderId, setOrderId] = useState(null);
    useEffect(() => dispatch(clearCart()), [dispatch]);

    // useEffect(() => {
    //     const createOrder = async () => {
    //         try {
    //             const res = await userRequest.post("/orders", {
    //                 userId: currentUser._id,
    //                 products: cart.products.map((item) => ({
    //                     productId: item._id,
    //                     quantity: item._quantity,
    //                 })),
    //                 amount: cart.total,
    //                 address: data.billing_details.address,
    //             });
    //             setOrderId(res.data._id);
    //         } catch { }
    //     };
    //     data && createOrder();
    // }, [cart, data, currentUser]);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            Success
            <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
        </div>
    )
}

export default Success;