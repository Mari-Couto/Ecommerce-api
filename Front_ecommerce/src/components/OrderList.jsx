import { useState, useEffect } from "react";
import axios from 'axios';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const res = await axios.get('http://localhost:3000/pedidos');
                const ordersWithImages = await Promise.all(res.data.map(async order => {
                    try {
                        let imageUrl = null;
                        if(order.file) {
                            imageUrl = `http://localhost:3000/produtos/imagem/${order.produto_id}`
                        }
                        return{
                            ...order, imageUrl: imageUrl
                        };
                    } catch (error) {
                        console.error('Erro ao obter imagem do pedido:', error);
                        return order;
                    }
                }));
                setOrders(ordersWithImages);
            } catch (error) {
                console.error('Erro ao obter os pedidos:', error);
            }
        }
        fetchOrders();
    }, []);


  return (
    <div>
      <h1>Lista de pedidos</h1>
      <ul>
        {orders.map(order => (
            <li key={order.idpedido}>
                <h2>{order.produto_nome}</h2>
                <p>Id do pedido: #{order.idpedido}</p>
                <p>Quantidade: {order.quantidade}</p>
                <p>Valor unitário: {order.preco_unitario}</p>
                <p>Descrição: {order.produto_descricao}</p>
                <p>Data do pedido: {order.data_pedido}</p>
                <p>Id do produto: #{order.produto_id}</p>
                {order.imageUrl && <img src={order.imageUrl} 
                alt={order.nome} className="product-image" />}
            </li>
        ))}
      </ul>
    </div>
  )
}

export default OrderList;
