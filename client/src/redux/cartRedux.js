import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.amount;
            // console.log("state.products", state.products);
            // console.log("state.products", state.total);
            console.log("payload", action.payload);
        },
    },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;