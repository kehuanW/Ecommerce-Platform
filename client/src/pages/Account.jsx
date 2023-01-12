import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import UserNavbar from '../components/UserNavbar';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { tablet, mobile, laptop } from '../responsive';
import { userRequestNew } from '../requestMethods'
import { updateProfile } from '../redux/userRedux';
import { logOut } from '../redux/userRedux';
import { clearCartInfo } from '../redux/cartRedux';

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
    width: 50vw;
`;

const DetailTitle = styled.h1`
    margin: 20px;
`;

const Hr = styled.hr`
    margin: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    cursor: pointer;
    &:hover {background-color: rgb(235, 237, 240) }
    &:active {background-color: rgb(218, 220, 224)}
`;

const MyLink = styled.p`
    margin-left: 20px;
`;


const Account = () => {
    const { user } = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { addToast } = useToasts();

    const [nickname, setNickname] = useState(user.currentUser ? user.currentUser.nickname : "");
    const [email, setEmail] = useState(user.currentUser ? user.currentUser.email : "");
    const [originalPassword, setOriginalPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        if (!user.currentUser) {
            addToast("Please login first", {
                appearance: 'warning',
                autoDismiss: true,
            })
            navigate("/login")
        }
    }, [user.currentUser])

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        // console.log({ ...user.currentUser, "nickname": nickname })
        try {
            const res = await userRequestNew(user.currentUser)
                .put(`/users/profile/${user.currentUser._id}`, { ...user.currentUser, "nickname": nickname, "email": email });
            // console.log(res.data)
            dispatch(updateProfile(res.data));
            addToast("Changed Successfully", {
                appearance: 'success',
                autoDismiss: true,
            });
        } catch (err) {
            // console.log(err);
            addToast("Something wrong. Please try again!", {
                appearance: 'error',
                autoDismiss: true,
            })
        }
    }

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        userRequestNew(user.currentUser)
            .put(`/users/pw/${user.currentUser._id}`, { ...user.currentUser, "originalPassword": originalPassword, "newPassword": newPassword })
            .then(res => {
                addToast("Changed successfully! Please login again.", {
                    appearance: 'success',
                    autoDismiss: true,
                });
                dispatch(logOut());
                dispatch(clearCartInfo());
                navigate('/login');
            })
            .catch(res => {
                // if (res) {
                console.log("$%%%%%", res);
                if (res.response.status === 401) {
                    addToast("Your original password is wrong!", {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                } else {
                    addToast("Something wrong. Please try again!", {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                }
                // }
            });
    }

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
                        {user.currentUser ?
                            <div>
                                <Form>
                                    <DetailTitle>Update Profile</DetailTitle>
                                    <InfoLine>
                                        <Attribute>Nickname</Attribute>
                                        <UserInfo defaultValue={nickname} onChange={e => { setNickname(e.target.value); console.log(nickname) }} required />
                                        {/* <Change>change</Change> */}
                                    </InfoLine>
                                    <InfoLine>
                                        <Attribute>Email</Attribute>
                                        <UserInfo defaultValue={email} type="email" onChange={e => setEmail(e.target.value)} required />
                                        {/* <Change>change</Change> */}
                                    </InfoLine>
                                    {/* <InfoLine> */}
                                    {/* <Attribute>Username</Attribute> */}
                                    {/* <UserInfo value={user.currentUser.username} disabled /> */}
                                    {/* <Change>change</Change> */}
                                    {/* </InfoLine> */}
                                    <Button onClick={handleUpdateProfile}>Submit</Button>
                                </Form>

                                <Hr />

                                <Form>
                                    <DetailTitle>Update Password</DetailTitle>
                                    <InfoLine>
                                        <Attribute >Orginal Password</Attribute>
                                        <UserInfo type="password" onChange={e => setOriginalPassword(e.target.value)} required />
                                        {/* <Change>change</Change> */}
                                    </InfoLine>
                                    <InfoLine>
                                        <Attribute >New Password</Attribute>
                                        <UserInfo type="password" onChange={e => setNewPassword(e.target.value)} required />
                                        {/* <Change>change</Change> */}
                                    </InfoLine>
                                    <Button onClick={handleUpdatePassword}>Submit</Button>
                                </Form>
                            </div>
                            :
                            <div>
                                <DetailTitle>Join TODAY today!</DetailTitle>
                                <Link to="/register">
                                    <MyLink>Register</MyLink>
                                </Link>
                                <Link to="/login">
                                    <MyLink>Login</MyLink>
                                </Link>
                            </div>}
                    </Detail>
                </Right>

            </Wapper>
            <Footer />
        </Container >
    )
}

export default Account;