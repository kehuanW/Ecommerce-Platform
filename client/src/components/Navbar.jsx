import React, { useEffect, useState } from 'react';
import { Search, ShoppingCartOutlined, FavoriteBorderOutlined } from '@material-ui/icons';
import { Badge } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { tablet, mobile } from '../responsive'
import { logOut } from '../redux/userRedux';
import { useToasts } from 'react-toast-notifications';
import { getUserCart } from '../redux/apiCalls';
import { clearCart } from '../redux/cartRedux';

const Container = styled.div`
    height: 60px;
    ${mobile({ height: "100px" })}
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    ${tablet({ height: "50px", padding: "10px 5px" })};
    ${mobile({ flexDirection: "column", alignItems: "start" })}
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${tablet({ display: "none" })}
`

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    ${tablet({ marginLeft: "8px" })};
`

const Input = styled.input`
    border: none;
    ${tablet({ width: "60px" })};
    ${mobile({ width: "80vw" })};
`

const Center = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

`

const Logo = styled.h1`
    font-weight: bold;
    ${tablet({ fontSize: "24px", margin: "auto" })};
    ${mobile({ marginLeft: "10px", marginTop: "5px" })};
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${tablet({ padding: "0 5px 0 0" })};
`

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${tablet({ fontSize: "12px", marginLeft: "10px" })}
`

const Navbar = () => {
    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.user);
    const quantity = cart.quantity;
    // console.log("cart", cart);
    const { addToast } = useToasts();
    const [searchContent, setSearchContent] = useState("");
    const dispatch = useDispatch();

    useEffect((() => {
        if (user.currentUser) {
            // console.log("%%%***", user.currentUser);
            getUserCart(dispatch, user.currentUser);
            // console.log(total);
        }
    }), [user.currentUser])

    const handleLogOut = () => {
        // console.log("logout")
        dispatch(logOut());
        dispatch(clearCart());

        addToast("You've logged out", {
            appearance: 'success',
            autoDismiss: true,
        })
    }

    const handleLanguage = () => {
        const info = "You are now on the English page. Pages in other languages are still under development."
        addToast(info, {
            appearance: 'info',
            autoDismiss: true,
        })
    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language onClick={handleLanguage}>EN</Language>
                    <SearchContainer>
                        <Input placeholder="Search" onInput={(e) => setSearchContent(e.target.value)} />
                        <Link to={`/products?search=${searchContent}`}>
                            <Search style={{ color: "gray", fontSize: 16 }} />
                        </Link>
                    </SearchContainer>
                </Left>
                <Center>
                    <Link to="/" style={{ "textDecoration": "none" }}>
                        <Logo>TODAY</Logo>
                    </Link>
                </Center>
                <Right>
                    {
                        user.currentUser
                            ? <>
                                <MenuItem onClick={handleLogOut}>LOG OUT</MenuItem>
                                {/* <Link to="/cart">
                                    <MenuItem>
                                        <Badge badgeContent={2} color="primary" overlap="rectangular">
                                            <FavoriteBorderOutlined />
                                        </Badge>
                                    </MenuItem>
                                </Link> */}
                                <Link to="/cart">
                                    <MenuItem>
                                        <Badge badgeContent={quantity} color="primary" overlap="rectangular">
                                            <ShoppingCartOutlined />
                                        </Badge>
                                    </MenuItem>
                                </Link>
                            </>
                            : <>
                                <Link to="/register" style={{ "textDecoration": "none" }}>
                                    <MenuItem>REGISTER</MenuItem>
                                </Link>
                                <Link to="/login" style={{ "textDecoration": "none" }}>
                                    <MenuItem>LOG IN</MenuItem>
                                </Link>
                            </>



                    }
                </Right>
            </Wrapper>
        </Container >
    )
}

export default Navbar