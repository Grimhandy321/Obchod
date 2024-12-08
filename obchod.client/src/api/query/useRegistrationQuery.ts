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
        formValues: any
    }
}
export const useRegistrationQuery = ({ formValues }: useRegistrationQuery.Props) =>
{
    const axiosClient = useAxiosClient();
    return useQuery({
        queryKey: ['/api/securewebsite/register', formValues],
        enabled: !!formValues,
        queryFn: async (): Promise<useRegistrationQuery.Result> =>
        {
            const { data } = await axiosClient.post('/api/securewebsite/register/' + formValues);
            return data;
        }
    });
} 