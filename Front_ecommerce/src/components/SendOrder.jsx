import { useState } from "react";
import axios from 'axios';

const url = 'http://localhost:3000/pedidos';

const SendOrder = () => {
    const [data, setData] = useState({
        produto_id: '',
        quantidade: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(url, data);

            setMessage('Pedido realizado com sucesso.');
            setData({ produto_id: '', quantidade: '' }); 
        } catch (error) {
            console.error('Erro ao realizar pedido:', error);
            setMessage('Erro ao realizar pedido. Por favor, tente novamente.');
        }
    }

    return (
        <div>
            <h1>Faça seu pedido</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID do Produto:</label>
                    <input type="text" name="produto_id" value={data.produto_id} onChange={handleChange} required />
                </div>
                <div>
                    <label>Quantidade:</label>
                    <input type="text" name="quantidade" value={data.quantidade} onChange={handleChange} required />
                </div>
                <button type="submit">Enviar Pedido</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default SendOrder;
