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
            //calculate stateTotal by calCartTotal
        },

        calCartTotal: (state, action) => {
            // console.log(state.products)
            let total = 0;
            state.products.forEach((item) => {
                total += item.price * item.amount;
            })
            // state.total = action.payload.total;
            state.total = total;
        },

        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.amount;

            // console.log("state.products", state.products);
            // console.log("state.products", state.total);
            // console.log("payload", action.payload);
        },

        increaseAmount: (state, action) => {
            const { ind } = action.payload;
            state.products[ind].amount += 1;
            //calculate stateTotal by calCartTotal
        },

        decreaseAmount: (state, action) => {
            const { ind } = action.payload;
            state.products[ind].amount -= 1;
            //calculate stateTotal by calCartTotal
        },

        removeProduct: (state, action) => {
            const { ind, removedProduct } = action.payload;
            state.quantity -= 1;
            state.products.splice(ind, 1);
            state.total -= removedProduct.price * removedProduct.amount;
        },

        clearCartInfo(state, action) { //对应logout
            state.cartId = "";
            state.products = [];
            state.quantity = 0;
            state.total = 0;
            // toast.success("Cart cleared");
        },

        checkOutWholeCart(state, action) {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        }
    },
});

export const { fetchCart, calCartTotal, addProduct, clearCartInfo, checkOutWholeCart, removeProduct, increaseAmount, decreaseAmount } = cartSlice.actions;
export default cartSlice.reducer;