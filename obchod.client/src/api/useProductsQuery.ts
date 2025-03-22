import { useQuery } from "@tanstack/react-query";
import { useAxiosClient } from "../lib/api/axios-client"
import { Product } from "../lib/types";



export const useProductsQuery = () =>
{
    const client = useAxiosClient();


    return useQuery({
        queryKey: ['/api/Product'],
        enabled: true,
        queryFn: async (): Promise<Product[]> => {
            const { data } = client.get<Product[]>("/api/Product");
            return data;
        }
    });
  
}