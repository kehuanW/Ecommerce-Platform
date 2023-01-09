import React from 'react';
import styled from 'styled-components';
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
    // height: 100vh;
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

const Detail = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50vw;
`;

const InfoLine = styled.div`
    display: flex;
    flex-direction: column;
    width: 30vw;
`;
const Attribute = styled.span`
    font-size: 1.2rem
`;
const UserInfo = styled.input`
    margin-top: 10px;
    margin-bottom: 20px;
    height: 25px;
    // width: 100%;
    padding: 5px;
    font-size: 1rem;
`;
// const Change = styled.div`
//     flex:1;
// `;
const Button = styled.button`
    padding:10px;
    font-size: 1rem;
    background-color: transparent;
    width: 20%;
    min-width: 100px;
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
                        <InfoLine>
                            <Attribute>Nickname: </Attribute>
                            <UserInfo></UserInfo>
                            {/* <Change>change</Change> */}
                        </InfoLine>
                        <InfoLine>
                            <Attribute>Email</Attribute>
                            <UserInfo></UserInfo>
                            {/* <Change>change</Change> */}
                        </InfoLine>
                        <InfoLine>
                            <Attribute>Username</Attribute>
                            <UserInfo></UserInfo>
                            {/* <Change>change</Change> */}
                        </InfoLine>
                        <InfoLine>
                            <Attribute>Password</Attribute>
                            <UserInfo></UserInfo>
                            {/* <Change>change</Change> */}
                        </InfoLine>
                        <Button>Submit</Button>
                    </Detail>
                </Right>

            </Wapper>
            <Footer />
        </Container>
    )
}

export default Account;