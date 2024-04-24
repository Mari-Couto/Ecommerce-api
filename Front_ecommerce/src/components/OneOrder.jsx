import React, { useState } from 'react';
import axios from 'axios';

const OneOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [message, setMessage] = useState('');

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/pedidos/${orderId}`);
      const orderData = response.data[0];
      let imageUrl = null;
      if (orderData.file) {
        imageUrl = `http://localhost:3000/produtos/imagem/${orderData.produto_id}`;
      }
      setOrder({ ...orderData, imageUrl });
      setMessage('');
    } catch (error) {
      console.error('Erro ao buscar pedido:', error);
      setMessage(`Pedido com ID #${orderId} não encontrado`);
      setOrder(null);
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="ID do Pedido"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <button onClick={fetchOrder}>Buscar Pedido</button>
      
      {message && <p>{message}</p>}

      {order && (
        <div>
          <h2>{order.produto_nome}</h2>
          <p>Id do pedido: #{order.idpedido}</p>
          <p>Quantidade: {order.quantidade}</p>
          <p>Valor unitário: {order.preco_unitario}</p>
          <p>Descrição: {order.produto_descricao}</p>
          <p>Data do pedido: {order.data_pedido}</p>
          <p>Id do produto: #{order.produto_id}</p>
          {order.imageUrl && <img src={order.imageUrl} alt={order.produto_nome} className="order-image" />}
        </div>
      )}
    </div>
  );
};

export default OneOrder;
