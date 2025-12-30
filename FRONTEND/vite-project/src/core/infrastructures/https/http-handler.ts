import axios from "axios";
import { getUserTokenFromLocalDb } from '../../../features/authentication/services/localstorage.infrastructure';

// TODO: use environment variables
export const BASE_URL = 'https://localhost:7216/api/'

const handler = axios.create({
    baseURL: BASE_URL
})

handler.interceptors.request.use(config => {
    const token = getUserTokenFromLocalDb()
    
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
})

export default handler