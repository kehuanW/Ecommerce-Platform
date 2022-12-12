import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Add, Remove } from '@material-ui/icons';
import { useLocation } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { tablet, mobile } from '../responsive';
import { publicRequest } from '../requestMethods';
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div``
const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${tablet({ flexDirection: "column", padding: "30px" })};
    ${mobile({ padding: "20px" })};
`

const ImageContainer = styled.div`
    flex: 1;
`

const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${tablet({ padding: "0px 10px" })};
`

const Title = styled.h1`
    font-weight: 200;
`

const Desc = styled.p`
    margin: 20px 0px
`

const Price = styled.span`
    font-weight: 100;
    font-size: 40px
`

const FilterContainer = styled.div`
    width: 60%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    ${tablet({ width: "100%" })};
`
const Filter = styled.div`
    display: flex;
    align-items: center;
`
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin: 0px 5px;
    cursor: pointer;
`

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;    
`

const FilterSizeOption = styled.option``

const AddContainer = styled.div`
    width: 60%;
    display: flex;
    justify-content: space-between;
    ${tablet({ width: "100%" })};
`

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display:flex;
    align-items: center;
    justify-content: center;
    margin: 2px;
`

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover {
        background-color: #f8f4f4;
    }
`

const Product = () => {

    const location = useLocation();
    const itemId = location.pathname.split('/')[2]
    const [product, setProduct] = useState({});
    const [amount, setAmount] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch();

    const handleAmount = (type) => {
        if (type === "dec") {
            //注意这里是amount>1,amount最小=2时，可以decrease.页面上amount最小是1
            amount > 1 && setAmount(amount - 1);
        } else {
            setAmount(amount + 1);
        }
    }

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get(`products/find/${itemId}`);
                setProduct(res.data);
            } catch (err) { }
        }
        getProduct();
    }, [itemId]);

    const handleClick = () => {
        dispatch(
            addProduct({ ...product, amount, color, size })
        );
    };

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImageContainer>
                    <Image src={product.img} />
                </ImageContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>${product.price}</Price>
                    <FilterContainer>
                        <Filter >
                            <FilterTitle>Color</FilterTitle>
                            {product.color?.map((c) => <FilterColor key={c} color={c} onClick={() => setColor(c)} />)}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e) => { setSize(e.target.value) }}>
                                {product.size?.map((s) => <FilterSizeOption key={s} >{s.toUpperCase()}</FilterSizeOption>)}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            {/* At onClick you should not call the function, instead set a function reference.  */}
                            <Remove onClick={() => handleAmount("dec")} />
                            <Amount>{amount}</Amount>
                            <Add onClick={() => handleAmount("inc")} />
                        </AmountContainer>
                        <Button onClick={handleClick}>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container >
    )
}

export default Product