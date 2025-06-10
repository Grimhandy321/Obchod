import { useQuery } from "@tanstack/react-query";
import { useAxiosClient } from "../lib/api/axios-client"
import { Order} from "../lib/types";



export const useOrderQuery = () => {
    const client = useAxiosClient();


    return useQuery({
        queryKey: ['/api/Order'],
        enabled: true,
        queryFn: async (): Promise<Order[]> => {
            const { data } = await client.get<Order[]>("/api/order");
            return data;
        }
    });

}