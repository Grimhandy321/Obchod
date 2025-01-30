import {useAxiosClient} from "../../lib/axios-client";
import { useQuery } from "@tanstack/react-query";

export namespace useHomeQuery
{
    export interface Props {
        user:any
    }
    export interface Result
    {
        name?: string,
        email?: string,
        createdDate?: string,
    }
}
export const useHomeQuery = ({ user }: useHomeQuery.Props) =>
{
    const axiosClient = useAxiosClient();
    return useQuery({
        queryKey: ["api/SecureWebsite/home/", user],
        enabled: !!user,
        queryFn: async (): Promise<useHomeQuery.Result> =>
        {
            const { data } = await axiosClient.get("api/SecureWebsite/home/" + user, {
                withCredentials: true
            });
            return data;
        }
    });
} 