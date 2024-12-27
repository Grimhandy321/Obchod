import {useAxiosClient} from "../axios-client";
import { useQuery } from "@tanstack/react-query";

export namespace useRegistrationQuery
{
    export interface Result
    {
        succeeded: boolean;
        errors?: Error[];
    }
    export interface Error {
        code: string;
        description: string;
    }
    export interface Props {
        values: any
    }
}
export const useRegistrationQuery = ({ values }: useRegistrationQuery.Props) =>
{
    const axiosClient = useAxiosClient();
    return useQuery({
        queryKey: ['/api/securewebsite/register', values],
        enabled: !!values,
        queryFn: async (): Promise<useRegistrationQuery.Result> =>
        {
            const { data } = await axiosClient.post('/api/securewebsite/register/' + values);
            return data;
        }
    });
} 