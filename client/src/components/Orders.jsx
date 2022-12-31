import React from 'react';
import styled from 'styled-components';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { userRequestNew } from '../requestMethods'
import PurchasedItem from './PurchasedItem'

const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    margin: 8px
`

const Orders = (props) => {
    // const [fold, setFold] = useState("none");
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
    })

    //这里成为orders了！从这里开始改
    let items = [];
    for (let orderInd = 0; orderInd < savedOrders.length; orderInd++) {
        let { address, status, createdAt, _id } = savedOrders[orderInd];
        for (let prodInd = 0; prodInd < savedOrders[orderInd].products.length; prodInd++) {
            items.push({ ...savedOrders[orderInd].products[prodInd], address, status, createdAt, _id })
        }
    }
    // let items = []
    // for (let i = 0; i < products.length; i++) {
    //     items.push({ ...products[i], quantity, address, status, createdAt, _id })
    // }
    // let items = products.map((item) => ({ ...item, quantity, address, status, createdAt, _id }));
    console.log("++++++++++++++++", items)
    // const saveOrder = props.savedOrder;

    return (
        <Container>
            {items.map((item) => <PurchasedItem item={item} />)}
        </Container>
    )
}

export default Orders;