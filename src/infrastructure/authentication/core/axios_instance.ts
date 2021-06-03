import axios from 'axios';

export const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: 'http://161.35.140.236:9005',
});
