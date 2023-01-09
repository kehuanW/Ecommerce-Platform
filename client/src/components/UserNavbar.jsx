import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { tablet, mobile, laptop } from '../responsive';

const Navbar = styled.div`
    // width: 200px;
    // height: 600px;
    // background-color: rgb(240, 243, 247);
    background-color: white;
    display: flex;
    flex-direction:column;
    // justify-content: center;
    align-items: flex-end;
    border-radius: 20px;
    // border-right: 2px solid rgb(240, 243, 247);
    ${laptop({ flexDirection: "row", marginBottom: "10px" })};
`;

const Text = styled.p`
    font-size: 1.2rem;
    // margin-bottom: 2rem;
    // margin-top: 3rem;
    margin: 2rem 0;
    padding: 0px 2rem;
`

const UserNavbar = () => {
    return (
        <Navbar>
            <NavLink to='/dashboard' >
                <Text>Dashboard</Text>
            </NavLink>
            <NavLink to='/account' >
                <Text>Account</Text>
            </NavLink>
        </Navbar>
    )
}

export default UserNavbar;