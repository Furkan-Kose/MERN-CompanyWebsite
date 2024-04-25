import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiURL } from "../constants";


export const getContactInfo = async () => {
    const response = await axios.get(`${apiURL}api/contact`);
    return response.data
}

export const useContactInfo = () => {
    return useQuery({ queryKey: ["contact"], queryFn: getContactInfo });
}

export const updateContactInfo = async (contactInfo: any) => {
    const token = sessionStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
        const response = await axios.put(`${apiURL}api/contact`, contactInfo, { headers });
        return response.data;
    } catch (error) {
        console.error('İletişim bilgileri güncellenirken bir hata oluştu:', error);
        throw error;
    }
}

export const useUpdateContactInfo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateContactInfo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contact"]});
        }
    })
}

