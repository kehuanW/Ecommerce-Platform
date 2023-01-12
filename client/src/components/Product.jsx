import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Add, Remove } from '@material-ui/icons';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';
import Modal from 'react-modal';
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import { createCart, updateCart } from '../redux/apiCalls';

const Info = styled.div`
    opacity:0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content:center;
    transition: all 1s ease;
    cursor: pointer;
`

const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;

    &: hover ${Info} {
        opacity: 1;
    }
    
`

const Circle = styled.div`
    position: absolute;
    height: 200px;
    width: 200px;
    border-radius: 50%;
    background-color: white;    
`
const Image = styled.img`
    height: 70%;
    z-index:2;
`


const Icon = styled.div`
    margin:10px;
    padding: 10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    &: hover {
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`

const ModalContainer = styled.div`
    height: 100%,
    width: 100%;
    display: flex;
    align-items: center;
    justify-content:center;
`;

const Left = styled.div`
    height: 80vh;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalImage = styled.img`
    width:100%;
`;

const Right = styled.div`
    height: 80vh;
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
`;

const ModalIcon = styled.div`
    position: absolute; 
    right: 0;
    top: 0;
    cursor: pointer;
`;

const ModalProductDetail = styled.div`
    display: flex;
    flex-direction: column;
    // align-items: center;
    justify-content:center;
    padding: 50px 30px;
`

const ModalTitle = styled.h2`
    margin-bottom: 30px;
    font-size: 2em;
`;

const ModalDesc = styled.p`
    margin-bottom: 30px;
`;

const ModalPrice = styled.p`
    margin-bottom: 30px;
    font-size: 1.3em;
`;

const ModalFilters = styled.div``;

const ModalFilterTitle = styled.span`
    font-size: 1.2em;
`

const ModalSelect = styled.select`
    margin: 0px 40px 30px 5px;
    font-size: 1em;
    padding: 3px;
`;

const ModalOption = styled.option``;

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid black;
    display:flex;
    align-items: center;
    justify-content: center;
    margin: 2px;
`;

const ModalCartButton = styled.button`
    background-color: white;
    font-size: 1.2em;
    width: 200px;
    margin-top: 30px;
    padding: 10px;
    cursor: pointer;
`;

const customStyles = {
    content: {
        width: '80vw',
        height: '80vh',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
    overlay: { zIndex: 10 }
};

const Product = (props) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [amount, setAmount] = useState(1);
    const dispatch = useDispatch();
    const { addToast } = useToasts();
    const user = useSelector(state => state.user);
    const cart = useSelector(state => state.cart);

    // console.log(props.item);
    const handleLike = () => {
        const info = "Thank you for your like. This feature is still under development. Please add to cart directly."
        addToast(info, {
            appearance: 'info',
            autoDismiss: true,
        });
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleAmount = (type) => {
        if (type === "dec") {
            amount > 1 && setAmount(amount - 1);
        } else {
            setAmount(amount + 1);
        }
    }

    // const handleClick = () => {
    //     if (color !== "" && size !== "") {
    //         dispatch(addProduct({ ...props.item, amount, color, size }));
    //         addToast("Successfully added", {
    //             appearance: 'success',
    //             autoDismiss: true,
    //         })
    //     } else {
    //         const warning = "Please select color and size for the product."
    //         addToast(warning, {
    //             appearance: 'warning',
    //             autoDismiss: true,
    //         })
    //     }
    // };

    const handleClick = () => {
        if (color !== "" && size !== "") {

            dispatch(addProduct({ ...props.item, amount, color, size }));
            addToast("Successfully added", {
                appearance: 'success',
                autoDismiss: true,
            });
            // sync cart info in redux with that in DB
            if (!cart.cartId) {
                createCart(dispatch, {
                    "currentUser": user.currentUser,
                    "products": [{ ...props.item, amount, color, size }]
                })
            } else {
                updateCart();
            }

        } else {
            const warning = "Please select color and size for the product."
            addToast(warning, {
                appearance: 'warning',
                autoDismiss: true,
            })
        }
    };

    return (
        <Container>
            <Circle />
            <Image src={props.item.img} />
            <Info>
                <Icon>
                    <ShoppingCartOutlined onClick={openModal} />
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        ariaHideApp={false}
                        contentLabel="Example Modal"
                    >
                        <ModalContainer>
                            <Left>
                                <ModalImage src={props.item.img} />
                            </Left>
                            <Right>
                                <ModalIcon>
                                    <CloseOutlinedIcon onClick={closeModal} />
                                </ModalIcon>
                                <ModalProductDetail>
                                    <ModalTitle>{props.item.title[0].toUpperCase() + props.item.title.slice(1)}</ModalTitle>
                                    <ModalDesc>{props.item.desc}</ModalDesc>
                                    <ModalPrice>$ {props.item.price}</ModalPrice>
                                    <ModalFilters>
                                        <ModalFilterTitle>Color: </ModalFilterTitle>
                                        <ModalSelect onChange={(e) => { setColor(e.target.value) }}>
                                            <ModalOption value="">Choose</ModalOption>
                                            {props.item.color.map(c => <ModalOption key={c} value={c}>{c[0].toUpperCase() + c.slice(1)}</ModalOption>)}
                                        </ModalSelect>
                                        <ModalFilterTitle>Size: </ModalFilterTitle>
                                        <ModalSelect onChange={(e) => { setSize(e.target.value) }}>
                                            <ModalOption value="">Choose</ModalOption>
                                            {props.item.size.map(s => <ModalOption key={s} value={s}>{s.toUpperCase()}</ModalOption>)}
                                        </ModalSelect>
                                    </ModalFilters>
                                    <AmountContainer>
                                        {/* At onClick you should not call the function, instead set a function reference.  */}
                                        <Remove onClick={() => handleAmount("dec")} style={{ cursor: "pointer" }} />
                                        <Amount>{amount}</Amount>
                                        <Add onClick={() => handleAmount("inc")} style={{ cursor: "pointer" }} />
                                    </AmountContainer>
                                    <ModalCartButton onClick={handleClick}>ADD TO CART</ModalCartButton>
                                </ModalProductDetail>
                            </Right>
                        </ModalContainer>
                        {/* <div>I am a modal</div> */}
                    </Modal>
                </Icon>
                <Icon>
                    <Link to={`/product/${props.item._id}`}>
                        <SearchOutlined />
                    </Link>
                </Icon>
                <Icon>
                    <FavoriteBorderOutlined onClick={handleLike} />
                </Icon>
            </Info>
        </Container>
    )
}

export default Product