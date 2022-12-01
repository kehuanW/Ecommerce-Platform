import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
import React, { useState } from 'react'
import styled from 'styled-components';

const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    position: relative;
    // overflow: hidden;
`

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top:50%;
    left: ${props => props.direction === "left" && "10px"};
    right: ${props => props.direction === "right" && "10px"};
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    z-index:2
`

const Wrapper = styled.div`
    height: 100%;
    display: flex;
`
const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #${props => props.bg};
    // transform: translateX(-100%)
`
const ImageContainer = styled.div`
    height: 100%;
    flex: 1;
`

const Image = styled.img`
    height: 80%;
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
`

const Title = styled.h1`
    font-size: 70px;
`

const Desc = styled.p`
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
`

const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
`

const Slider = () => {

    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick = (direction) => { };

    return (
        <div>
            <Container>
                <Arrow direction="left" onClick={() => handleClick('left')}>
                    <ArrowLeftOutlined />
                </Arrow>
                <Wrapper>
                    <Slide bg="FBEDAE">
                        <ImageContainer>
                            <Image src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80" />
                        </ImageContainer>
                        <InfoContainer>
                            <Title>SUMMER SEL</Title>
                            <Desc>DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.</Desc>
                            <Button>SHOW NOW</Button>
                        </InfoContainer>
                    </Slide>
                    <Slide bg="E2FBAE">
                        <ImageContainer>
                            <Image src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80" />
                        </ImageContainer>
                        <InfoContainer>
                            <Title>SUMMER SEL</Title>
                            <Desc>DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.</Desc>
                            <Button>SHOW NOW</Button>
                        </InfoContainer>
                    </Slide>
                    <Slide bg="AEFBED">
                        <ImageContainer>
                            <Image src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80" />
                        </ImageContainer>
                        <InfoContainer>
                            <Title>SUMMER SEL</Title>
                            <Desc>DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.</Desc>
                            <Button>SHOW NOW</Button>
                        </InfoContainer>
                    </Slide>
                </Wrapper>
                <Arrow direction="right" onClick={() => handleClick('right')} >
                    <ArrowRightOutlined />
                </Arrow>
            </Container>
        </div >
    )
}

export default Slider;