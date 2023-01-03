import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Navbar = styled.div`
    width: 200px;
    height: 600px;
    background-color: rgb(240, 243, 247);
    display: flex;
    flex-direction:column;
    justify-content: center;
    border-radius: 20px;
`;

const UserNavbar = () => {
    return (
        <Navbar>
            <NavLink to='/dashboard' > Dashboard</NavLink>
            <NavLink to='/account' > Account</NavLink>
        </Navbar>
    )
}

export default UserNavbar;