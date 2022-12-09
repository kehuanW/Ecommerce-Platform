import React from 'react';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import { Badge } from '@material-ui/core'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from "react-router-dom";


import { tablet, mobile } from '../responsive'

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
    const quantity = cart.quantity;
    // console.log("cart", cart);

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder="Search" />
                        <Search style={{ color: "gray", fontSize: 16 }} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Logo>LAMA.</Logo>
                </Center>
                <Right>
                    <MenuItem>REGISTER</MenuItem>
                    <MenuItem>SIGN IN</MenuItem>
                    <Link to="/cart">
                        <MenuItem>
                            <Badge badgeContent={quantity} color="primary" overlap="rectangular">
                                <ShoppingCartOutlined />
                            </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container >
    )
}

export default Navbar