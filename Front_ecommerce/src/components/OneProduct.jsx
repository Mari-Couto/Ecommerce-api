import { useState } from 'react';
import axios from 'axios';

const OneProduct = () => {
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/produtos/${productId}`);
        setProduct(response.data[0]); 
      } catch (error) {
      console.error('Erro ao buscar produto:', error);
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
      {product && (
        <div>
          <h2>{product.nome}</h2>
          <p>Id do produto: #{product.id}</p>
          <p>Descrição: {product.descricao}</p>
          <p>Preço: R$ {product.preco}</p>
        </div>
      )}
    </div>
  );
};

export default OneProduct;
