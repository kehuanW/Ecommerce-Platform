import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useToasts } from 'react-toast-notifications'
import { useNavigate } from "react-router-dom";
import { tablet, mobile } from '../responsive';
import { BASE_URL } from '../requestMethods';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(225,225,225,0.5),
        rgba(225,225,225,0.5)
    ),
    url("https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")
    no-repeat center/100%;
    background-size: cover;

    display: flex;
    align-items: center;
    justify-content: center;
`

const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;
    ${tablet({ width: "50%" })};
    ${mobile({ width: "75%" })};
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 30px;
    text-align: center;
`

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`

const Input = styled.input`
    flex:1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`

const Button = styled.button`
    width: 40%;
    border: none; 
    background-color: teal;
    padding: 15px 20px;
    color: white;
    cursor: pointer;
    margin: auto; // button
`

const Register = () => {
    const navigate = useNavigate();
    const { addToast } = useToasts();

    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: "",
    })

    const [isCreated, setIsCreated] = useState(false);

    useEffect(() => {
        if (isCreated === true) {
            const timer = setTimeout(() => {
                // console.log("timer");
                navigate("/login")
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isCreated]);

    const handleCreate = async (event) => {
        event.preventDefault();
        try {
            const usernameList = await axios.get(BASE_URL + "auth/usernames");
            // console.log(usernameList.data);
            // console.log(newUser.username);
            // console.log(newUser)
            if (!usernameList.data.includes(newUser.username)) {
                const res = await axios.post(BASE_URL + "auth/register", newUser);
                // console.log(res.status);
                if (res.status === 201) {
                    addToast("The account is created successfully. Redirect you to Login Page...", {
                        appearance: 'success',
                        autoDismiss: true,
                    });
                    setIsCreated(true);
                }
            } else {
                alert("The username has been taken. Please choose another one.")
            }
        } catch (err) {
            addToast("Someting wrong. Please try again", {
                appearance: 'error',
                autoDismiss: true,
            })
        }
    }

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder="Username" onChange={e => setNewUser({ ...newUser, username: e.target.value })} />
                    <Input placeholder="Email" type="email" onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
                    <Input placeholder="Password" type="password" onChange={e => setNewUser({ ...newUser, password: e.target.value })} />
                    <Agreement>
                        By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    {/* <Input type="submit" value="Send Request" /> */}
                    <Button onClick={handleCreate}>CREATE</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register