import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import { Add, Remove } from '@material-ui/icons';
import { tablet, mobile } from '../responsive';
import { useSelector } from 'react-redux';
import { userRequest } from '../requestMethods';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div``

const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px" })};
`

const Title = styled.h1`
    font-weight: 600;
    text-align: center;
`

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    ${mobile({ flexDirection: "column" })};
`

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;

    border: ${props => props.type === "filled" && "none"};
    background-color: ${props => props.type === "filled" ? "black" : "transparent"};
    color: ${props => props.type === "filled" && "white"};

    ${mobile({ width: "100%", marginTop: "5px" })};
`

const TopTexts = styled.div`
    ${tablet({ display: "none" })};
`;

const TopText = styled.span`
    text-decoration: underline;
    margin: 0px 10px;
    cursor: pointer;
`;

const Buttom = styled.div`
    display: flex;
    ${tablet({ flexDirection: "column" })}
`;

const Info = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${tablet({ flexDirection: "column" })};
`;

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;

const Image = styled.img`
    width: 200px;
`;

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span`
${mobile({ wordWrap: "break-word" })};
`;

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center
`;

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${tablet({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${tablet({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`;

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`;

const SummaryTitle = styled.h1`
    font-weight: 300;
`;
const SummaryItem = styled.div`
    margin: 15px 0px;
    display: flex;
    justify-content: space-between;
    font-size: ${props => props.type === "total" && "24px"};
    font-weight: ${props => props.type === "total" && 600};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const SummaryButton = styled.button`
    background-color: black;
    color: white;
    padding: 10px;
    width: 100%;
`;


const Cart = () => {

    // const KEY = process.env.REACT_APP_STRIPE_SECRET_KEY_MY
    // const navigate = useNavigate();

    const { cart, user } = useSelector(state => state);

    const handleCheckout = async () => {
        // console.log("handleCheckout");
        // console.log(cart);
        try {
            const res = await userRequest.post("/checkout/payment", { cart, user });

            if (res.data.url) window.location.href = res.data.url;
        }
        catch {
            console.log("error")
        };
    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <TopButton>CONTINUE SHOPPING</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bag (2)</TopText>
                        <TopText>Your Wishlist (0)</TopText>
                    </TopTexts>
                    <TopButton type="filled">CHECKOUT NOW</TopButton>
                </Top>
                <Buttom>
                    <Info>
                        {cart.products.length === 0
                            ? "Your shopping cart is empty"
                            : cart.products.map(item => (
                                <>
                                    <Product key={item._id}>
                                        <ProductDetail>
                                            <Image src={item.img} />
                                            <Details>
                                                <ProductName><b>Product:</b>{item.title}</ProductName>
                                                <ProductId><b>ID:</b> {item._id}</ProductId>
                                                <ProductColor color={item.color} />
                                                <ProductSize><b>Size: </b>{item.size ? item.size : "None"}</ProductSize>
                                            </Details>
                                        </ProductDetail>
                                        <PriceDetail>
                                            <ProductAmountContainer>
                                                <Add />
                                                <ProductAmount>{item.amount}</ProductAmount>
                                                <Remove />
                                            </ProductAmountContainer>
                                            <ProductPrice>$ {item.price * item.amount}</ProductPrice>
                                        </PriceDetail>
                                    </Product>
                                    <Hr />
                                </>
                            ))}

                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMERY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$ 10</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -10</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryButton onClick={handleCheckout}>
                            CHECKOUT NOW
                        </SummaryButton>
                    </Summary>
                </Buttom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart