import axios from 'axios';
import { showNotification, showErrorNotification } from '../../components/notifications/notifications';

export const useAxiosClient = () => {
    const client = axios.create({
        baseURL: 'https://localhost:7102',
    });

    client.interceptors.response.use(
        (response) => {
            showNotification({
                title: 'Success',
                message: response.data?.message || 'Request was successful!',
            });
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
