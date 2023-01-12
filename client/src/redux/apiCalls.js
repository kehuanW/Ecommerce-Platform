import { loginFailure, loginSuccess, loginStart } from './userRedux';
import { publicRequest, userRequestNew } from '../requestMethods';
import { calCartTotal, fetchCart } from './cartRedux';
import { store } from './store';

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        // console.log(res.data)
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
        throw "Login Failure. Please try again";
        // console.log("Login Failure", err);
    }
}

export const getUserCart = async (dispatch, currentUser) => {
    try {
        // console.log("$$$$$##@@@@@", currentUser, currentUser._id);
        const res = await userRequestNew(currentUser)
            .get(`/carts/find/${currentUser._id}`);
        // console.log("apiCalls", res.data);
        if (res.data) {
            dispatch(fetchCart(res.data));
            // let total = 0;
            // res.data.products.forEach((item) => {
            //     total += item.price * item.amount;
            // })
            // dispatch(calCartTotal({ total: total }));
            dispatch(calCartTotal());
        }

    } catch (err) {
        console.log("Cart Loading Failure", err);
    }
}


export const createCart = async (dispatch, data) => {

    const { currentUser, products } = data;
    // console.log("---------", data)

    const newCart = { "userId": currentUser._id, "products": products }
    userRequestNew(currentUser)
        .post(`/carts`, newCart)
        .then(res => dispatch(fetchCart(res.data)))
        .catch(err => console.log("create new cart in DB failure", err))
}

export const updateCart = async () => {
    const { currentUser } = store.getState().user;
    const { cartId, products } = store.getState().cart;
    userRequestNew(currentUser)
        .put(`/carts/${currentUser._id}/${cartId}`, { "products": products })
        .catch(err => console.log("cart update in DB failure", err));
}