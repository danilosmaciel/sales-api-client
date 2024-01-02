import axios from 'axios';
import { NewDebt } from '../Types/NewDebt';
import { debtToJson } from '../Utils/ToJson';
import { ApiConfig } from '../Types/ApiConfig';

const api = axios.create();


export const useDebtsApi = (config: ApiConfig) => ({
    
    create: async (debt: NewDebt)=> {
        const response = await api.post('/api/debt', debtToJson(debt), config);
        return response.status != 201;
    },

    getByCustomerId: async (id: number) => {
        const response = await api.get(`/api/debt/by-customer/${id}`, config);
        return response.data;
    },

    markAsPaid: async (id: number) => {
        const response = await api.put(`/api/debt/mark-as-paid/${id}`, {}, config);
        return response.status == 204;
    },

    delete: async (id: string,) => {
        const response = await api.delete(`/api/debt/${id}`, config);
        return response.data;
    }
});

