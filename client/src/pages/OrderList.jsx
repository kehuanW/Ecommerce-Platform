import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import Orders from '../components/Orders';
import { userRequestNew } from '../requestMethods'
import axios from 'axios';

const Container = styled.div``;

const OrderList = () => {
    // const saveOrder = props.savedOrder;
    // const user = useSelector(state => state.user);
    // const navigate = useNavigate();
    // const { addToast } = useToasts();
    // const [savedOrders, setSavedOrders] = useState([]);

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Orders />
        </Container>
    )
}

export default OrderList;