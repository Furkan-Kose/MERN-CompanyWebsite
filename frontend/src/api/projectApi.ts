import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiURL } from "../constants";


export const getProjects = async () => {
  const response = await axios.get(`${apiURL}api/projects`);
  return response.data;
};

export const useProjects = () => {
  return useQuery({queryKey: ["projects"], queryFn: getProjects});
}


export const getProject = async (projectSlug: string) => {
  const response = await axios.get(`${apiURL}api/projects/${projectSlug}`);
  return response.data;
};

export const useProject = (projectSlug: string) => {
  return useQuery({
    queryKey: ["project", projectSlug],
    queryFn: () => getProject(projectSlug),
  });
};


export const addProject = async (data: any) => {
  try {
    const token = sessionStorage.getItem('token'); 
  
    console.log(token);

    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.post(`${apiURL}api/projects`, data, { headers: {
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

export const useAddProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProject,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["projects"]});
    }
  })
}
  

export const updateProject = async (projectSlug: string, data: any) => {
  const token = sessionStorage.getItem('token');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  try {
    const response = await axios.put(`${apiURL}api/projects/${projectSlug}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...headers,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Proje güncellenirken bir hata oluştu:', error);
    throw error;
  }
};


export const deleteProject = async (projectSlug: string) => {
  const token = sessionStorage.getItem('token');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  try {
    const response = await axios.delete(`${apiURL}api/projects/${projectSlug}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error('Proje silinirken bir hata oluştu:', error);
    throw error;
  }
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["projects"]});
    }
  })
}





