import { useState } from 'react';
import axios from 'axios';

const OneProduct = () => {
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState('');

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/produtos/${productId}`);
      setProduct(response.data[0]); 
      setMessage('');
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      setMessage(`Produto com ID #${productId} não encontrado`);
      setProduct(null);
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="ID do Produto"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <button onClick={fetchProduct}>Buscar Produto</button>
      
      {message && <p>{message}</p>}

      {product && (
        <div>
          <h2>{product.nome}</h2>
          <p>Id do produto: #{product.id}</p>
          <p>Descrição: {product.descricao}</p>
          <p>Preço: R$ {product.preco}</p>
          {/* Falta a imagem */}
        </div>
      )}
    </div>
  );
};

export default OneProduct;
