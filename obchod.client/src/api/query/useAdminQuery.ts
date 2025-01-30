import { useAxiosClient } from "../../lib/axios-client";
import { useQuery } from "@tanstack/react-query";

export namespace useAdminQuery {
    export interface Result {
        trustedPartners: string[]
    }
}
export const useAdminQuery = () => {
    const axiosClient = useAxiosClient();
    return useQuery({
        queryKey: ["api/SecureWebsite/admin"],
        enabled: true,
        queryFn: async (): Promise<useAdminQuery.Result> => {
            const { data } = await axiosClient.get("api/SecureWebsite/admin/", {
                withCredentials: true
            });
            return data;
        }
    });
} 