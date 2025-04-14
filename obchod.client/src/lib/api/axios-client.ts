import axios from 'axios';
import { showNotification, showErrorNotification } from '../../components/notifications/notifications';
import { authService } from '../misc/authService';

export const useAxiosClient = () => {
    const client = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        withCredentials: true,
    });


    client.interceptors.request.use(
        (config) => {
            const token = authService.getToken();
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    client.interceptors.response.use(
        (response) => {
            if (response.data?.message) {
                showNotification({
                    title: 'Success',
                    message: response.data?.message || 'Request was successful!',
                });
            }
            return response;
        },
        (error) => {
            showErrorNotification({
                title: 'Error',
                message: error.response?.data?.message || 'An error occurred.',
            });
            return Promise.reject(error);
        }
    );

    return client;
};
