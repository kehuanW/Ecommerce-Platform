import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        logOut: (state) => {
            state.currentUser = null;
            state.isFetching = false;
            state.error = false;
        },
        updateProfile: (state, action) => {
            state.currentUser.nickname = action.payload.nickname;
            state.currentUser.email = action.payload.email;
            // console.log("redux");
        }
    }

},);

export const { loginStart, loginSuccess, loginFailure, logOut, updateProfile } = userSlice.actions;
export default userSlice.reducer;