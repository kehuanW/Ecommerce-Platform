import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { tablet, mobile, laptop } from '../responsive';

const Navbar = styled.div`
    width: 140px;
    // height: 600px;
    // background-color: rgb(240, 243, 247);
    background-color: white;
    display: flex;
    flex-direction:column;
    // justify-content: center;
    align-items: center;
    border-radius: 20px;
    // border-right: 2px solid rgb(240, 243, 247);
    ${laptop({ flexDirection: "row", marginBottom: "10px", width: "225px" })};  
`;

const Text = styled.div`
    font-size: 1.1rem;
    // margin: 1rem 0;
    padding: 1rem;
    // margin-top: 3rem;
    // margin: 2rem 0;
    // width:100%;
    &:hover {text-decoration: underline;}
`

const UserNavbar = () => {
    return (
        <Navbar>
            <Link to='/dashboard'
                style={{ "textDecoration": "none" }}
                activeStyle={{ "text-decoration": "underline" }}
            >
                <Text>Dashboard</Text>
            </Link>
            <Link to='/account' style={{ "textDecoration": "none" }}>
                <Text>Account</Text>
            </Link>
        </Navbar>
    )
}

export default UserNavbar;