import React from 'react';
import styled from 'styled-components';

const Order = (props) => {
    // const saveOrder = props.savedOrder;
    const savedOrder = {
        userId: '639011c32650e0a84c8bb231',
        products: [
            {
                color: 'green',
                size: 'l',
                quantity: 2,
                // _id: new ObjectId("63ae3c5f446e4e39502e0070")
            },
            {
                color: 'White',
                size: 'XS',
                quantity: 1,
                // _id: new ObjectId("63ae3c5f446e4e39502e0071")
            }
        ],
        quantity: 2,
        address: {
            city: 'Adelaide',
            country: 'AU',
            line1: '201/304 Waymouth Street',
            line2: null,
            postal_code: '5000',
            state: 'SA'
        },
        status: 'pending',
        // _id: new ObjectId("63ae3c5f446e4e39502e006f"),
        createdAt: "2022-12-30T01:18:23.933Z",
        updatedAt: "2022-12-30T01:18:23.933Z"
    }


    return (
        <div>Orders</div>
    )
}

export default Order;