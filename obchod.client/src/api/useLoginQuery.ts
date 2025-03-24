import { useQuery } from "@tanstack/react-query";
import { useAxiosClient } from "../lib/api/axios-client"
import { Status } from "../lib/types";


export namespace useLoginQuery {
    export interface props {
        form: any
    }
    export interface result {
        token: string,
        status: Status,
        message: string | null
    }
}



export const useLoginQuery = ({ form }: useLoginQuery.props) => {
    const client = useAxiosClient();


    return useQuery({
        queryKey: ['api/User/login'],
        enabled: false,
        queryFn: async (): Promise<useLoginQuery.result> => {
            const { data } = client.post('api/User/login', form.values,
                {
                    headers: { 'Content-Type': 'application/json' }
                });
            return data;

        }

    });

}