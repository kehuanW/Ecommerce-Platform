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
    padding: 50px
`;

const Detail = styled.div`
display: flex;
flex-direction: column;
`;

const InfoLine = styled.div`
display: flex;
`;
const Attribute = styled.div``;
const UserInfo = styled.div``;
const Change = styled.div``;
const Button = styled.div``;



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
                        <InfoLine>
                            <Attribute>Nickname: </Attribute>
                            <UserInfo></UserInfo>
                            <Change>change</Change>
                        </InfoLine>
                        <InfoLine>
                            <Attribute>Email</Attribute>
                            <UserInfo></UserInfo>
                            <Change>change</Change>
                        </InfoLine>
                        <InfoLine>
                            <Attribute>Password</Attribute>
                            <UserInfo></UserInfo>
                            <Change>change</Change>
                        </InfoLine>
                    </Detail>
                    <Button>Submit</Button>
                </Right>

            </Wapper>
            <Footer />
        </Container>
    )
}

export default Account;