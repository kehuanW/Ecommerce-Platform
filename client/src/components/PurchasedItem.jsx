import React from 'react';
import styled from 'styled-components';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import { useState } from 'react';

const Container = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    margin: 8px
`

const Wapper = styled.div`
    width: 600px;
    border:rgb(112, 112, 109)  solid;
    border-radius: 10px;
    backgroud-color: yellow;
    padding: 8px;
    border-width: thin;
`;

const ProductionInfo = styled.div`
    display:flex;
    flex-direction: column;
`;

const Body = styled.div`
    display:flex;
`;

const Left = styled.div`
    flex:1;
    display:
`;

const Right = styled.div`
    flex:4;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ProductImage = styled.div``;

const OrderStatus = styled.div``;

const ProductSpec = styled.div`
    display: flex;
`;

const ProductPay = styled.div`
    display: flex;
`;

const ProductTotal = styled.div``;

const ProductDetail = styled.div`
    margin-right:20px
`;

const OrderInfo = styled.div`
    margin-top: 10px;
    display: ${props => props.fold}
`;
const TextInfo = styled.div``;

const Address = styled.div`
    margin-top: 8px;
`;

const AddressInfoTitle = styled.div``

const AddressInfo = styled.div``;

const ExpandBtn = styled.div`
    width:100%;
    color: gray;
    display:flex;
    justify-content:center;
    cursor: pointer;
    display: ${props => { if (props.fold === "block") return "none" }};
`

const CollapseBtn = styled.div`
    width:100%;
    color: gray;
    display:flex;
    justify-content:center;
    cursor: pointer;
`

const PurchasedItem = (props) => {
    const [fold, setFold] = useState("none");
    const item = props.item;
    console.log("$$$$$$$$$$$$$$$", item)
    // const { products, quantity, address, status, createdAt, _id } = props.savedOrder
    // const saveOrder = props.savedOrder;
    // const savedOrder = {
    //     userId: '639011c32650e0a84c8bb231',
    //     products: [
    //         {
    //             color: 'green',
    //             size: 'l',
    //             quantity: 2,
    //             // _id: new ObjectId("63ae3c5f446e4e39502e0070")
    //         },
    //         {
    //             color: 'White',
    //             size: 'XS',
    //             quantity: 1,
    //             // _id: new ObjectId("63ae3c5f446e4e39502e0071")
    //         }
    //     ],
    //     quantity: 2,
    //     address: {
    //         city: 'Adelaide',
    //         country: 'AU',
    //         line1: '201/304 Waymouth Street',
    //         line2: null,
    //         postal_code: '5000',
    //         state: 'SA'
    //     },
    //     status: 'pending',
    //     // _id: new ObjectId("63ae3c5f446e4e39502e006f"),
    //     createdAt: "2022-12-30T01:18:23.933Z",
    //     updatedAt: "2022-12-30T01:18:23.933Z"
    // }


    return (
        <Container>
            <Wapper>
                <PurchasedItem item={item} />
                <ProductionInfo>
                    <Body>
                        <Left>
                            <ProductImage>Image</ProductImage>
                        </Left>
                        <Right>

                            <ProductDetail>ProductId: {item._id}</ProductDetail>
                            <ProductSpec>
                                <ProductDetail>Color: {item.color}</ProductDetail>
                                <ProductDetail>Size: {item.size}</ProductDetail>
                            </ProductSpec>
                            <ProductPay>
                                <ProductDetail>Amount: {item.quantity}</ProductDetail>
                                <ProductTotal>Total: $10</ProductTotal>
                            </ProductPay>
                        </Right>
                    </Body>
                    <ExpandBtn onClick={() => setFold("block")} fold={fold}>
                        <ExpandMoreOutlinedIcon />
                    </ExpandBtn>
                </ProductionInfo>

                <OrderInfo fold={fold}>
                    <OrderStatus>Status: {item.status}</OrderStatus>
                    <TextInfo>Order Id: {item._id}</TextInfo>
                    <TextInfo>Created At</TextInfo>
                    <Address>
                        <AddressInfoTitle>ADDRESS</AddressInfoTitle>
                        <AddressInfo>City</AddressInfo>
                        <AddressInfo>State</AddressInfo>
                        <AddressInfo>Country</AddressInfo>
                        <AddressInfo>Postcode</AddressInfo>
                    </Address>
                    <CollapseBtn onClick={() => setFold("none")}>
                        <ExpandLessOutlinedIcon />
                    </CollapseBtn>
                </OrderInfo>
            </Wapper>
        </Container>
    )
}

export default PurchasedItem;