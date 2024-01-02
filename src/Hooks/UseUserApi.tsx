import axios from 'axios';
import { ApiConfig } from '../Types/ApiConfig';

const api = axios.create();


export const useUserApi = (config: ApiConfig) => ({
    signin: async (UserName: string, Password: string) => {
        const response = await api.post('/api/user/signin', { UserName, Password }, config);
        return response.data;
    },

});