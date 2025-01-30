import axios from "axios";

export const useAxiosClient = () =>
{
    return axios.create({
        withCredentials: true,
        baseURL        : "https://localhost:7102"
    });
}