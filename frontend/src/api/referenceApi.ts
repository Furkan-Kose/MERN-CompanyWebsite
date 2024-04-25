import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiURL } from "../constants";


export const getReferences = async () => {
    const response = await axios.get(`${apiURL}api/references`);
    return response.data;
}

export const useReferences = () => {
    return useQuery({queryKey: ["references"], queryFn: getReferences});
}

export const getReference = async (referenceId: string) => {
    const response = await axios.get(`${apiURL}api/references/${referenceId}`);
    return response.data;
}

export const useReference = (referenceId: string) => {
    return useQuery({queryKey: ["reference", referenceId], queryFn: () => getReference(referenceId)});
}

export const addReference = async (data: any) => {
  try {
    const token = sessionStorage.getItem('token'); 
  
    console.log(token);

    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.post(`${apiURL}api/references`, data, { headers: {
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

export const useAddReference = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addReference,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["references"]});
    }
  })
}
  

export const updateReference = async (referenceId: string, data: any) => {
    const token = sessionStorage.getItem('token'); 
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      const response = await axios.put(`${apiURL}api/references/${referenceId}`, data, {headers: {
        'Content-Type': 'multipart/form-data',
        ...headers
      }});
      return response.data;
    } catch (error) {
      console.error('Referans güncellenirken bir hata oluştu:', error);
      throw error;
    }
}


export const deleteReference = async (referenceId: string) => {
  const token = sessionStorage.getItem('token');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  try {
      const response = await axios.delete(`${apiURL}api/references/${referenceId}`, { headers });
      return response.data;
  } catch (error) {
      console.error('Referans silinirken bir hata oluştu:', error);
      throw error;
  }
}

export const useDeleteReference = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteReference,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["references"]});
    }
  })
}





