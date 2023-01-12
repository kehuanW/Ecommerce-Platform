import axios from "axios";

export const BASE_URL = process.env.REACT_APP_CLIENT_DOMAIN;
// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTAwZDE2NGMyMzM4MWE2M2Y1YTE2MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MDg0NTE3NywiZXhwIjoxNjcxMTA0Mzc3fQ.bBU6xndUWyHwqp82elWm__bppicsva-ivZOck7ld6lU"

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

// export const userRequest = axios.create({
//     baseURL: BASE_URL,
//     header: { token: `Bearer ${TOKEN}` },
// });

export const userRequestNew = function (currentUser) {
    return axios.create({
        baseURL: BASE_URL,
        headers: { 'token': 'Bearer ' + currentUser.accessToken },
    });
}