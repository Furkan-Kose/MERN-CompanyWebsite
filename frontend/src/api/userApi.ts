import axios from "axios";
import { apiURL } from "../constants";


export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${apiURL}api/login`, {username, password});
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}



