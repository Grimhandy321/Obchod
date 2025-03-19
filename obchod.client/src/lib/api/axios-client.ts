import axios from "axios";

export const useAxiosClient = () =>
{
    return axios.create({

        baseURL        : "https://localhost:7102"
    });
}