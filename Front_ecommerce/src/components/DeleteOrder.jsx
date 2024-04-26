import React, { useState } from "react";
import axios from 'axios';

const DeleteOrder = () => {
    const [idPedido, setIdPedido] = useState('');
    const [message, setMessage] = useState('');

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/pedidos/${idPedido}`);

            setMessage('Pedido excluído com sucesso.');
            setIdPedido('');
        } catch (error) {
            console.error('Erro ao excluir pedido:', error);
            setMessage('Erro ao excluir pedido. Por favor, tente novamente.');
        }
    };

    return (
        <div className="form-container">
            <h1>Excluir Pedido</h1>
            <label>ID do Pedido:</label>
            <input type="text" value={idPedido} onChange={(e) => setIdPedido(e.target.value)} />
            <button onClick={handleDelete}>Excluir Pedido</button>
            {message && <p className="sucess-message">{message}</p>}
        </div>
    );
};

export default DeleteOrder;
