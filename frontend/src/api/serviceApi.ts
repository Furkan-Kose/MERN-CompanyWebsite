import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiURL } from "../constants";


export const getServices = async () => {
    const response = await axios.get(`${apiURL}api/services`);
    return response.data;
}

export const useServices = () => {
    return useQuery({queryKey: ["services"], queryFn: getServices});
}

export const getService = async (serviceSlug: string) => {
    const response = await axios.get(`${apiURL}api/services/${serviceSlug}`);
    return response.data;
}

export const useService = (serviceSlug: string) => {
    return useQuery({queryKey: ["service", serviceSlug], queryFn: () => getService(serviceSlug)});
}

export const addService = async (data: any) => {
  try {
    const token = sessionStorage.getItem('token'); 
  
    console.log(token);

    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.post(`${apiURL}api/services`, data, { headers: {
      'Content-Type': 'multipart/form-data',
      ...headers
    } });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  } 
}

export const useAddService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addService,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["services"]});
    }
  })
}
  

export const updateService = async (serviceSlug: string, data: any) => {
    const token = sessionStorage.getItem('token'); 
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      const response = await axios.put(`${apiURL}api/services/${serviceSlug}`, data, {headers: {
        'Content-Type': 'multipart/form-data',
        ...headers
      }});
      return response.data;
    } catch (error) {
      console.error('Faaliyet alanı güncellenirken bir hata oluştu:', error);
      throw error;
    }

}

export const deleteService = async (serviceSlug: string) => {
  const token = sessionStorage.getItem('token');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  try {
      const response = await axios.delete(`${apiURL}api/services/${serviceSlug}`, { headers });
      return response.data;
  } catch (error) {
      console.error('Faaliyet alanı silinirken bir hata oluştu:', error);
      throw error;
  }
}

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["services"]});
    }
  })
}





