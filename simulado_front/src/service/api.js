import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

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
        const response = await axios.get(getApiUrl(`alocacao/${area}`));
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar alocações por área:", error);
        throw error;
    }
};

export const updateCelularQuantity = async (id_celular, quantidade) => {
    try {
        const response = await axios.put(`${BASE_URL}/api/celular/${id_celular}`, { quantidade });
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar a quantidade do celular com ID ${id_celular}:`, error);
        throw error;
    }
};


export const getCelulares = () => getAll('celulares');