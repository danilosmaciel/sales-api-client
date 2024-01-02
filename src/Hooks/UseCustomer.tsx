import axios from 'axios';
import { Customer } from '../Types/Customer';
import { customerToJson } from '../Utils/ToJson';
import { ApiConfig } from '../Types/ApiConfig';

const api = axios.create();


export const useCustomerApi = (config: ApiConfig) => ({
  
    create: async (customer: Customer) => {
        const response = await api.post('/api/customer', customerToJson(customer), config);
        return response.data;
    },

    get: async (page: number, limit: number, filter: string | null) => {
        const response = await api.get(`/api/customer?page=${page}&limit=${limit}${filter ? `&filter=${filter}` : ""}`, config);
        return response.data;
    }, 
    
    getById: async (id: number) => {
        const response = await api.get(`/api/customer/by-id/${id}`, config);
        return response.data;
    },

    update: async (id: number, customer: Customer) => {
        const response = await api.put(`/api/customer/${id}`, customerToJson(customer), config);
        return response.status == 204;
    },

    delete: async (id: number) => {
        const response = await api.delete(`/api/customer/${id}`, config);
        return response.status == 204;
    }
});