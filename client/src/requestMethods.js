import axios from "axios";

export const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTAwZDE2NGMyMzM4MWE2M2Y1YTE2MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MDg0NTE3NywiZXhwIjoxNjcxMTA0Mzc3fQ.bBU6xndUWyHwqp82elWm__bppicsva-ivZOck7ld6lU"

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` },
});


export const userRequestNew = function (CLIENT_DOMAIN, currentUser) {
    return axios.create({
        baseURL: CLIENT_DOMAIN,
        headers: { 'token': 'Bearer ' + currentUser.accessToken },
    });
}