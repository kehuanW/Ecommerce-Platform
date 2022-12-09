import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTAwZDE2NGMyMzM4MWE2M2Y1YTE2MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MDU0Mzg5NCwiZXhwIjoxNjcwODAzMDk0fQ.oYGjUPg9W-TjjIhapsFg9TUKAL89DHhGtHZ4vV-BnOY"

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` },
});