import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { updateCart } from '../redux/apiCalls';
import { checkOutWholeCart } from "../redux/cartRedux";
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';

const Success = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(checkOutWholeCart());
        updateCart();
    }, [dispatch]);

    const Container = styled.div``;

    const Content = styled.div`
        height: 55vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `;

    const Text = styled.p`
        margin-bottom: 20px;
        font-size: 1.5rem;
    `;

    const Button = styled.button`
        padding: 10px;
        margin-top: 20px;
        font-size: 1rem;
        background-color: white;
    `

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Content>
                <Text>Your order placed successfully!</Text>
                <Button onClick={() => navigate('/')}>Go to Homepage</Button>
            </Content>
            <Footer />
        </Container>
    )
}

export default Success;