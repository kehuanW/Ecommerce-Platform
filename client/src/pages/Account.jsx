import React from 'react';
import styled from 'styled-components';
import UserNavbar from '../components/UserNavbar';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Container = styled.div``

const Wapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    padding:50px 100px;
`;

const Left = styled.div``;

const Right = styled.div`
    padding: 50px;
`;

const Detail = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const InfoLine = styled.div`
    display: flex;
`;
const Attribute = styled.span`
    font-size: 1.2rem
`;
const UserInfo = styled.input`
    margin-top: 10px;
    margin-bottom: 20px;
    height: 25px;
    width: 100%;
    padding: 5px;
    font-size: 1rem;
`;
// const Change = styled.div`
//     flex:1;
// `;
const Button = styled.button`
    padding:10px;
    font-size: 1rem;
    background-color: transparent
`;



const Account = () => {
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wapper>
                <Left>
                    <UserNavbar />
                </Left>
                <Right>
                    <Detail>
                        {/* <InfoLine> */}
                        <Attribute>Nickname: </Attribute>
                        <UserInfo></UserInfo>
                        {/* <Change>change</Change> */}
                        {/* </InfoLine> */}
                        {/* <InfoLine> */}
                        <Attribute>Email</Attribute>
                        <UserInfo></UserInfo>
                        {/* <Change>change</Change> */}
                        {/* </InfoLine> */}
                        {/* <InfoLine> */}
                        <Attribute>Username</Attribute>
                        <UserInfo></UserInfo>
                        {/* <Change>change</Change> */}
                        {/* </InfoLine> */}
                        {/* <InfoLine> */}
                        <Attribute>Password</Attribute>
                        <UserInfo></UserInfo>
                        {/* <Change>change</Change> */}
                        {/* </InfoLine> */}
                        <Button>Submit</Button>
                    </Detail>
                </Right>

            </Wapper>
            <Footer />
        </Container>
    )
}

export default Account;