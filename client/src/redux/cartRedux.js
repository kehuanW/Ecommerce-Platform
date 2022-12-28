import { createSlice } from "@reduxjs/toolkit";
// import toast, { Toaster } from 'react-hot-toast';

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartId: "",
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        fetchCart: (state, action) => {
            // const { cart } = action.payload;
            const { _id, products } = action.payload;
            state.cartId = _id;
            state.products = products;
            state.quantity = products.length;
        },

        calCartTotal: (state, action) => {
            state.total = action.payload.total;
        },

        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.amount;

            // console.log("state.products", state.products);
            // console.log("state.products", state.total);
            // console.log("payload", action.payload);
        },

        clearCart(state, action) {
            state.cartId = "";
            state.products = [];
            state.quantity = 0;
            state.total = 0;
            // toast.success("Cart cleared");
        },
    },
});

export const { fetchCart, calCartTotal, addProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;