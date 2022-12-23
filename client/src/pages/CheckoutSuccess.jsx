import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { clearCart } from "../redux/cartRedux";

const Success = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => dispatch(clearCart()), [dispatch]);


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
            <button style={{ padding: 10, marginTop: 20 }} onClick={() => navigate('/')}>Go to Homepage</button>
        </div>
    )
}

export default Success;