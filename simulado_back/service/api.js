import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const getApiUrl = (resource) => `${BASE_URL}/${resource}`;

//função genérica para retornar todos os dados
const getAll = async (resource) => {
    try{
        const response = await axios.get(getApiUrl(resource));
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar ${resource}:`, error);
        throw error;
    }
};

export const getAlocacoesByArea = async (area) => {
    try {
        const response = await axios.get(getApiUrl(area));
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar alocações por área:", error);
        throw error;
    }
};


export const getCelulares = () => getAll('celulares');