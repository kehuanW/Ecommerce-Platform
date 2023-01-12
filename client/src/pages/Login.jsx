import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { useNavigate, Link } from 'react-router-dom';
import { tablet, mobile } from '../responsive';
import { login, getUserCart } from '../redux/apiCalls';
import { useEffect } from 'react';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(225,225,225,0.5),
        rgba(225,225,225,0.5)
    ),
    url("https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")
    no-repeat center;
    background-size: cover;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;
    border-radius: 15px;
    ${tablet({ width: "50%" })};
    ${mobile({ width: "75%" })};
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 30px;
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    flex:1;
    min-width: 40%;
    margin: 10px;
    padding: 10px;
`;

const Button = styled.button`
    width: 40%;
    border: none; 
    background-color: teal;
    padding: 15px 20px;
    color: white;
    cursor: pointer;
    margin: auto; // button center
    margin-bottom: 10px;
`;

const Text = styled.div`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
    const { addToast } = useToasts();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector(state => state.user);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(dispatch, { username, password });
            addToast("Login Successfully", {
                appearance: 'success',
                autoDismiss: true,
            });
            navigate("/");
        } catch (err) {
            addToast(err, {
                appearance: 'error',
                autoDismiss: true,
            })
        }
    };

    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input
                        placeholder="username"
                        onChange={e => setUsername(e.target.value)} />
                    <Input
                        type="password"
                        placeholder="password"
                        onChange={e => setPassword(e.target.value)} />
                    <Button onClick={handleLogin} disabled={isFetching}>
                        LOGIN
                    </Button>
                    {error && <Error>Something went wrong...</Error>}
                    {/* <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link> */}
                    <Link to="/register">
                        <Text>CREATE A NEW ACCOUNT</Text>
                    </Link>
                    <Link to="/">
                        <Text>BROWER FIRST</Text>
                    </Link>
                </Form>
            </Wrapper>
        </Container>
    )
};

export default Login;