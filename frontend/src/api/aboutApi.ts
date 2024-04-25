import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiURL } from "../constants";

export const getAboutInfo = async () => {
    const response = await axios.get(`${apiURL}api/about`);
    return response.data
}

export const useAboutInfo = () => {
    return useQuery({ queryKey: ["about"], queryFn: getAboutInfo });
}

export const updateAboutInfo = async (aboutInfo: any) => {
    const token = sessionStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    console.log(token)

    console.log(aboutInfo)

    try {
        const response = await axios.put(`${apiURL}api/about`, aboutInfo, { headers });
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Hakkımızda bilgileri güncellenirken bir hata oluştu:', error);
        console.log(error)
        throw error;
    }
}

export const useUpdateAboutInfo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateAboutInfo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["about"]});
        }
    })
}
