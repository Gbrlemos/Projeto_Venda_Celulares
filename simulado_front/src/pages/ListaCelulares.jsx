import React, { useState, useEffect } from 'react';
import { getCelulares } from '../service/api';

const ListaCelulares = () => {
    const [celulares, setCelulares] = useState([]);

    useEffect(() => {
        const fetchCelulares = async () => {
            try{
                const data = await getCelulares();
                setCelulares(data);
                console.log("Celulares recebidos:", data);
            } catch (error) {
                console.error("Erro ao buscar celulares: ", error);
            }
        };
        fetchCelulares();
    }, []);



    return (
        <div>
            <h1>Lista completa de Celulares</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Modelo</th>
                        <th>Preço</th>
                    </tr>
                </thead>
                <tbody>
                    {celulares.length > 0 ? (
                        celulares.map((celulares) => (
                            <tr key={celulares.id_celular}>
                                <td>{celulares.id_celular}</td>
                                <td>{celulares.modelo_celular}</td>
                                <td>{celulares.preco_celular}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">Nenhum celular encontrado</td>
                        </tr>
                    
                    )}
                </tbody>
            </table>
        </div>
    );
} 

export default ListaCelulares;