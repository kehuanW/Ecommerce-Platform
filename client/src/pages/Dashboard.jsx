import React from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { tablet, mobile, laptop } from '../responsive';

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

const Title = styled.h1``;

const Info = styled.div`
    margin: 30px 0;
`;

const Detail = styled.p``;

const MyLink = styled.p``;

const Dashboard = () => {
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wapper>
                <Left>
                    <UserNavbar />
                </Left>
                <Right>
                    <Title>Hi XXX!</Title>
                    <Info>
                        <Detail>You have completed XX orders on TODAY!</Detail>
                        <Link to="/orders">
                            <MyLink>View my orders</MyLink>
                        </Link>
                    </Info>
                    <Info>
                        <Detail>You have XX items in your shopping cart!</Detail>
                        <Link to="/cart">
                            <MyLink>View my cart</MyLink>
                        </Link>
                    </Info>
                </Right>
            </Wapper>
            <Footer />
        </Container>
    )
}

export default Dashboard;