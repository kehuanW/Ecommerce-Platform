import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useSelector } from 'react-redux';

import UserNavbar from '../components/UserNavbar';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { tablet, mobile, laptop } from '../responsive';
import { userRequestNew } from '../requestMethods'
import { useState } from 'react';

const Container = styled.div`
    max-width: 100vw;
`

const Wapper = styled.div`
    // width: 100vw;
    display: flex;
    padding:50px 15%;
    background-color: rgb(240, 243, 247);
    ${laptop({ flexDirection: "column" })};
`;

const Left = styled.div`
    margin-right: 20px;
`;

const Right = styled.div`
    padding: 50px;
    background-color: white;
    border-radius: 20px;
    width: 50vw
`;

const Title = styled.h1`
    margin-bottom: 20px;
`;

const Info = styled.div`
    margin: 30px 0;
`;

const Detail = styled.p``;

const MyLink = styled.p``;

const Dashboard = () => {
    const { user, cart } = useSelector(state => state);
    const { addToast } = useToasts();
    const navigate = useNavigate();
    // console.log("###", cart)
    // console.log("###", currentUser)
    const [itemNum, setItemNum] = useState(0);

    useEffect(async () => {
        if (!user.currentUser) {
            addToast("Please login first", {
                appearance: 'warning',
                autoDismiss: true,
            })
            navigate("/login")
        } else {
            try {
                const res = await userRequestNew(user.currentUser)
                    .get(`/orders/find/${user.currentUser._id}`);

                let items = 0;
                for (let o = 0; o < res.data.length; o++) {
                    items += res.data[o].products.length
                }
                setItemNum(items);
            } catch (err) {
                console.log(err);
            }
        }
    }, [user.currentUser])

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wapper>
                <Left>
                    <UserNavbar />
                </Left>
                <Right>
                    {user.currentUser
                        ?
                        <div>
                            <Title>Hi {user.currentUser.nickname}!</Title>
                            <Info>
                                <Detail>You purchased {itemNum} items on TODAY!</Detail>
                                <Link to="/orders">
                                    <MyLink>View my orders</MyLink>
                                </Link>
                            </Info>
                            <Info>
                                <Detail>{`You have ${cart.products.length} items in your shopping cart!`}</Detail>
                                <Link to="/cart">
                                    <MyLink>View my cart</MyLink>
                                </Link>
                            </Info>
                        </div>
                        :
                        <div>
                            <Title>Join TODAY today!</Title>
                            <Link to="/register">
                                <MyLink>Register</MyLink>
                            </Link>
                            <Link to="/login">
                                <MyLink>Login</MyLink>
                            </Link>
                        </div>
                    }
                </Right>
            </Wapper>
            <Footer />
        </Container>
    )
}

export default Dashboard;