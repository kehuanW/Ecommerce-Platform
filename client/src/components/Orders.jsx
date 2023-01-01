import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { userRequestNew, publicRequest } from '../requestMethods'
import PurchasedItem from './PurchasedItem'

const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    margin: 8px
`

const EmptyOrder = styled.p`
    text-align: center;
    padding: 50px
`

const Title = styled.h1``

const Orders = (props) => {
    // const [fold, setFold] = useState("none");
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const { addToast } = useToasts();
    const [items, setItems] = useState([]);

    useEffect(async () => {
        if (user.currentUser) {
            const res = await userRequestNew(process.env.REACT_APP_CLIENT_DOMAIN, user.currentUser)
                .get(`/orders/find/${user.currentUser._id}`);
            let savedOrders = res.data;
            let items = [];
            for (let orderInd = 0; orderInd < savedOrders.length; orderInd++) {
                let { address, status, createdAt, _id } = savedOrders[orderInd];
                for (let prodInd = 0; prodInd < savedOrders[orderInd].products.length; prodInd++) {
                    console.log(savedOrders)
                    // const productInfoFromDBRes = await publicRequest.get(`/products/find/${savedOrders[orderInd].products[prodInd]._id}`);
                    // console.log("%%%%%%%%%%%%%", productInfoFromDBRes);
                    // const { price, img } = productInfoFromDBRes.data;
                    items.push({ ...savedOrders[orderInd].products[prodInd], address, status, createdAt, _id })
                    // items.push({ ...savedOrders[orderInd].products[prodInd], address, status, createdAt, _id, price, img })
                }
            }
            setItems(items);
        } else {
            navigate('/');
            addToast("Please log in first.", {
                appearance: 'warning',
                autoDismiss: true,
            });
        }
    }, [user])

    return (
        <Container>
            <Title>My Orders</Title>
            {items.length !== 0
                ? items.map((item) => <PurchasedItem item={item} />)
                : <EmptyOrder>You haven't placed an order yet~</EmptyOrder>}
        </Container>
    )
}

export default Orders;