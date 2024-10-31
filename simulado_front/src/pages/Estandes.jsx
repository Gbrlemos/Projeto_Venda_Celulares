import React, { useState } from 'react';
import { getAlocacoesByArea, updateCelularQuantity } from '../service/api';

const ListaEstandes = () => {
    const [celulares, setCelulares] = useState([]);
    const [celularSelecionado, setCelularSelecionado] = useState(null);
    const [quantidade, setQuantidade] = useState(1);
    const [total, setTotal] = useState(0);

    const handleAreaClick = async (area) => {
        try {
            const celularesDaArea = await getAlocacoesByArea(area);
            setCelulares(celularesDaArea);
        } catch (error) {
            console.error("Erro ao buscar celulares:", error);
        }
    };

    const handleCelularClick = (celular) => {
        setCelularSelecionado(celular);
        setQuantidade(1);
        setTotal(celular.preco_celular); // Pode ser que celular.preco_celular seja string, faça a conversão para number.
    };

    const handleQuantidadeChange = (e) => {
        const newQuantidade = parseInt(e.target.value, 10) || 1; // Certifique-se de que é um número
        setQuantidade(newQuantidade);
        setTotal((celularSelecionado ? celularSelecionado.preco_celular : 0) * newQuantidade);
    };

    const handleCompra = async () => {
        if (celularSelecionado && celularSelecionado.id_celular) {
            try {
                await updateCelularQuantity(celularSelecionado.id_celular, quantidade);
                alert('Compra realizada com sucesso!');
                setCelularSelecionado(null); // Reseta o celular selecionado
                setQuantidade(1); // Reseta a quantidade
                setTotal(0); // Reseta o total
            } catch (error) {
                console.error("Erro ao atualizar a quantidade:", error);
                alert('Erro ao realizar a compra.');
            }
        } else {
            alert('Selecione um celular válido para compra.');
        }
    };
    

    return (
        <div>
            <div>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(area => (
                    <button key={area} onClick={() => handleAreaClick(area)}>
                        Área {area}
                    </button>
                ))}
            </div>
            <div>
                <h2>Celulares na Área Selecionada</h2>
                {celulares.length > 0 ? (
                    <ul>
                        {celulares.map((celular) => (
                            <li key={celular.id_celular} onClick={() => handleCelularClick(celular)}>
                                Modelo: {celular.modelo_celular} - Preço: {celular.preco_celular} - Quantidade: {celular.quantidade}
                                {celularSelecionado && celularSelecionado.id_celular === celular.id_celular && (
                                    <div>
                                        <input 
                                            type="number" 
                                            value={quantidade} 
                                            onChange={handleQuantidadeChange} 
                                            min="1" 
                                        />
                                        <span>Total: R$ {total.toFixed(2)}</span>
                                        <button onClick={handleCompra}>Comprar</button>
                                    </div>
                                )}
                            </li>
                        ))}

                    </ul>
                ) : (
                    <p>Nenhum celular encontrado para essa área.</p>
                )}
            </div>
        </div>
    );
};

export default ListaEstandes;
