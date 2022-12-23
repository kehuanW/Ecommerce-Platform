import { Send } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { mobile } from '../responsive';
import { publicRequest, userRequestNew } from '../requestMethods';
// import dotenv from 'dotenv';
// dotenv.config();

const Container = styled.div`
    height: 60vh;
    background-color: #fcf5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Title = styled.h1`
    font-size: 70px;
    margin-bottom: 20px;
    ${mobile({ fontSize: "3em" })};
`

const Description = styled.div`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;
    text-align: center;
`

const InputContainer = styled.form`
    background-color: white;
    width: 50%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
`

const Input = styled.input`
    border: none;
    flex: 9;
    padding-left: 15px;
`

const Button = styled.button`
    flex: 1;
    border: none;
    background-color: teal;
    color: white;
    cursor: pointer;
`

const Newsletter = () => {
    const user = useSelector((state) => state.user);
    console.log("newsletter", user);
    const { addToast } = useToasts();

    const handleSubmit = async (e) => {
        // console.log("submit form")
        e.preventDefault();

        const CLIENT_DOMAIN = process.env.REACT_APP_CLIENT_DOMAIN;
        if (user.currentUser) {
            const email = e.target[0].value;
            const date = new Date().toISOString().slice(0, 10);
            try {
                const req = {
                    "userId": user.currentUser._id,
                    "date": date,
                    "email": email
                }
                // console.log(req);
                console.log(process.env.CLIENT_DOMAIN);
                const DBres = await userRequestNew(CLIENT_DOMAIN, user.currentUser).post("/subscribe", req);
                // console.log("$$$$$$", DBres.status);
                if (DBres.status === 201) {
                    addToast("Subscription Success. Your email is accepted.", {
                        appearance: 'success',
                        autoDismiss: true,
                    });
                    await userRequestNew(CLIENT_DOMAIN, user.currentUser).post("/subscribe/sendsgmail", { "userEmail": email });
                    addToast("Thank you for subscribing. The lastest news has been sent to your mailbox.", {
                        appearance: 'success',
                        autoDismiss: true,
                    });
                    e.target[0].value = "";
                } else if (DBres.status === 503) {
                    addToast("Too much subscription for today. Please subscribe tomorrow.", {
                        appearance: 'warning',
                        autoDismiss: true,
                    });
                } else {
                    addToast("Subscription Failure. Please try again.", {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                }
            } catch (error) {
                addToast("Something wrong. Please try again.", {
                    appearance: 'error',
                    autoDismiss: true,
                });
            }
        } else {
            addToast("Please log in first.", {
                appearance: 'error',
                autoDismiss: true,
            });
        }

    }
    return (
        <Container>
            <Title>Newsletter</Title>
            <Description>Get timely updates from your favourite products</Description>
            <InputContainer onSubmit={handleSubmit}>
                <Input placeholder="Your email" type="email" />
                <Button>
                    <Send />
                </Button>
            </InputContainer>
        </Container>
    )
}

export default Newsletter;