import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.NODE_ENV === "development"?"http://localhost:3001":"https://postgresql-node.herokuapp.com/",
})
