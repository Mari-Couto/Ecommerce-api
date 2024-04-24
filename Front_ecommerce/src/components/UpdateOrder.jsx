import React, { useState } from "react";
import axios from 'axios';

const UpdateOrder = () => {
    const [idPedido, setIdPedido] = useState('');
    const [novaQuantidade, setNovaQuantidade] = useState('');
    const [message, setMessage] = useState('');

    const handleUpdate = async () => {
        try {
            await axios.patch(`http://localhost:3000/pedidos/${idPedido}`, {
                quantidade: novaQuantidade
            });

            setMessage('Quantidade do pedido atualizada com sucesso.');
            setIdPedido('');
            setNovaQuantidade('');
        } catch (error) {
            console.error('Erro ao atualizar quantidade do pedido:', error);
            setMessage('Erro ao atualizar quantidade do pedido. Por favor, tente novamente.');
        }
    };

    return (
        <div>
            <h1>Atualizar Pedido</h1>
            <div>
                <label>ID do Pedido:</label>
                <input type="text" value={idPedido} onChange={(e) => setIdPedido(e.target.value)} />
            </div>
            <div>
                <label>Nova Quantidade:</label>
                <input type="text" value={novaQuantidade} onChange={(e) => setNovaQuantidade(e.target.value)} />
            </div>
            <button onClick={handleUpdate}>Atualizar Quantidade</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateOrder;
