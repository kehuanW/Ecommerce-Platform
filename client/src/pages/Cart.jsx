import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import { Add, Remove } from '@material-ui/icons';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { tablet, mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { userRequestNew } from '../requestMethods';
import { useToasts } from 'react-toast-notifications';
import { useNavigate, Link } from 'react-router-dom';
import { increaseAmount, decreaseAmount, removeProduct, calCartTotal } from '../redux/cartRedux';
import { updateCart } from '../redux/apiCalls';

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

const EmptyCart = styled.p`
    text-align: center;
    padding: 50px
`

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
    border-style: solid;
    border-color: gray;
    border-width: 1px;
    background-color: ${props => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
    flex: 0.5;
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center
`;

const DeleteContainer = styled.div`
    flex: 0.3;
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    cursor: pointer;
`

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
    cursor: pointer;
`;


const Cart = () => {

    // const KEY = process.env.REACT_APP_STRIPE_SECRET_KEY_MY
    // const navigate = useNavigate();

    const { cart, user } = useSelector(state => state);
    // console.log("$$$$$$$$$$", cart);
    const { addToast } = useToasts();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.currentUser) {
            addToast("Please login first", {
                appearance: 'warning',
                autoDismiss: true,
            })
            navigate("/login")
        }
    }, [user.currentUser])

    const handleWishList = () => {
        const info = "Thank you for your like. This feature is still under development."
        addToast(info, {
            appearance: 'info',
            autoDismiss: true,
        });
    }

    const handleCheckout = async () => {
        // console.log("handleCheckout");
        // console.log(cart);
        try {
            // const res = await userRequest.post("/checkout/payment", { cart, user });
            const res = await userRequestNew(user.currentUser)
                .post("/checkout/payment", { cart, user });

            if (res.data.url) window.location.href = res.data.url;
        }
        catch {
            console.log("error")
        };
    }

    const handleRemoveProduct = async (ind) => {
        dispatch(removeProduct({ "ind": ind, "removedProduct": cart.products[ind] }));
        addToast("Removed Successfully", {
            appearance: 'success',
            autoDismiss: true,
        });
        updateCart();
    }

    const handleIncreaseAmount = (ind) => {
        dispatch(increaseAmount({ "ind": ind }));
        dispatch(calCartTotal());
        updateCart();
    }

    const handleDecreaseAmount = (ind) => {
        //amount >= 1
        if (cart.products[ind].amount >= 2) {
            dispatch(decreaseAmount({ "ind": ind }));
            dispatch(calCartTotal());
            updateCart();
        }
    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <Link to="/">
                        <TopButton>CONTINUE SHOPPING</TopButton>
                    </Link>
                    <TopTexts>
                        <TopText onClick={handleWishList}>Your Wishlist (0)</TopText>
                    </TopTexts>
                    <TopButton type="filled" onClick={handleCheckout}>CHECKOUT NOW</TopButton>
                </Top>
                <Buttom>
                    <Info>
                        {cart.products.length === 0
                            ? <EmptyCart>Your shopping cart is empty~</EmptyCart>
                            : cart.products.map((item, ind) => (
                                <div key={ind}>
                                    <Product >
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
                                                <Add onClick={() => handleIncreaseAmount(ind)} style={{ cursor: "pointer" }} />
                                                <ProductAmount>{item.amount}</ProductAmount>
                                                <Remove onClick={() => handleDecreaseAmount(ind)} style={{ cursor: "pointer" }} />
                                            </ProductAmountContainer>
                                            <ProductPrice>$ {item.price * item.amount}</ProductPrice>
                                        </PriceDetail>
                                        <DeleteContainer>
                                            <DeleteOutlineOutlinedIcon onClick={() => handleRemoveProduct(ind)} />
                                        </DeleteContainer>
                                    </Product>
                                    <Hr />
                                </div>
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