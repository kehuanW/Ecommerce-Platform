import React from 'react';
import styled from 'styled-components';
import UserNavbar from '../components/UserNavbar';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    padding:0px 100px;
`;
const Left = styled.div`
    
`;
const Right = styled.div``;

const Dashboard = () => {
    return (
        <Container>
            <Left>
                <UserNavbar />
            </Left>
            <Right>
                <div>Dashboard</div>
            </Right>
        </Container>
    )
}

export default Dashboard;