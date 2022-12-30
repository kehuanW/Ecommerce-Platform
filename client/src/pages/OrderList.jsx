import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import Order from '../components/Order';
import { userRequestNew } from '../requestMethods'
import axios from 'axios';

const Container = styled.div``;

const OrderList = () => {
    // const saveOrder = props.savedOrder;
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const { addToast } = useToasts();
    const [savedOrders, setSavedOrders] = useState([]);

    useEffect(async () => {
        async function fetchData() {
            if (user.currentUser) {
                const res = await userRequestNew(process.env.REACT_APP_CLIENT_DOMAIN, user.currentUser)
                    .get(`/orders/find/${user.currentUser._id}`);
                setSavedOrders(res.data);
            } else {
                navigate('/');
                addToast("Please log in first.", {
                    appearance: 'warning',
                    autoDismiss: true,
                });
            }
        }
        fetchData();
    }, [user.currentUser])

    return (
        <Container>
            <Navbar />
            <Announcement />
            {
                savedOrders.map((savedOrder, ind) => <Order key={ind} savedOrder={savedOrder} />)
            }

        </Container>
    )
}

export default OrderList;