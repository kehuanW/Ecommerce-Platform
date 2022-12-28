import { loginFailure, loginSuccess, loginStart } from './userRedux';
import { publicRequest, userRequestNew } from '../requestMethods';
import { calCartTotal, fetchCart, createCart } from './cartRedux';
import { store } from './store';

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        // console.log(res.data)
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
        console.log("Login Failure", err);
    }
}

export const getUserCart = async (dispatch, currentUser) => {
    try {
        console.log("$$$$$##@@@@@", currentUser, currentUser._id);
        const res = await userRequestNew(process.env.REACT_APP_CLIENT_DOMAIN, currentUser)
            .get(`/carts/find/${currentUser._id}`);
        // console.log("apiCalls", res.data);
        if (res.data) {
            dispatch(fetchCart(res.data));

            let total = 0;
            res.data.products.forEach((item) => {
                total += item.price * item.amount;
            })
            dispatch(calCartTotal({ total: total }));
        }

    } catch (err) {
        console.log("Cart Loading Failure", err);
    }
}


export const addToCart = async (dispatch, data) => {

    const { currentUser, products } = data;
    console.log("---------", data)

    const newCart = { "userId": currentUser._id, "products": products }
    if (!store.getState().cart.cartId) {
        userRequestNew(process.env.REACT_APP_CLIENT_DOMAIN, currentUser)
            .post(`/carts`, newCart)
            .then(res => dispatch(fetchCart(res.data)))
            .catch(err => console.log("create new cart failure", err))
    }
    // try {
    //     console.log("$$$$$##@@@@@", currentUser, currentUser._id);
    //     const res = await userRequestNew(process.env.REACT_APP_CLIENT_DOMAIN, currentUser).get(`/carts/find/${currentUser._id}`);
    //     console.log("apiCalls", res.data);
    //     if (res.data) {
    //         dispatch(fetchCart(res.data));

    //         let total = 0;
    //         res.data.products.forEach((item) => {
    //             total += item.price * item.amount;
    //         })
    //         dispatch(calCartTotal({ total: total }));
    //     }

    // } catch (err) {
    //     console.log("Cart Loading Failure", err);
    // }
}