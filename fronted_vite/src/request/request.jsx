import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

export const loginRequest = axios.create({
    baseURL:`${apiUrl}/api/login`,
    timeout: 30000,
})
export const logoutRequest = axios.create({
    baseURL:`${apiUrl}/api/logout`,
    timeout: 30000,
})

export const registerRequest = axios.create({
    baseURL:`${apiUrl}/api/register`,
    timeout: 30000,
})

export const appoinmentsRequest = axios.create({
    baseURL:`${apiUrl}/api/appointments`,
    timeout: 30000,
})



