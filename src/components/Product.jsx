import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'

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

const Product = (props) => {
    return (
        <Container>
            <Circle />
            <Image src={props.item.img} />
            <Info>
                <Icon>
                    <ShoppingCartOutlined />
                </Icon>
                <Icon>
                    <SearchOutlined />
                </Icon>
                <Icon>
                    <FavoriteBorderOutlined />
                </Icon>
            </Info>
        </Container>
    )
}

export default Product