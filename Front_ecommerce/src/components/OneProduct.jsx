import { useState } from 'react';
import axios from 'axios';

const OneProduct = () => {
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState('');

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/produtos/${productId}`);
      const productData = response.data[0];
      let imageUrl = null;
      if (productData.file) {
        imageUrl = `http://localhost:3000/produtos/imagem/${productData.id}`;
      }
      setProduct({ ...productData, imageUrl });
      setMessage('');
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      setMessage(`Produto com ID #${productId} não encontrado`);
      setProduct(null);
    }
  };

  return (
    <div className="search-container">
      <h1>Busque seu produto</h1>
    <input className='search'
        type="number"
        placeholder="ID do Produto"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
    />
    <button className='button' onClick={fetchProduct}>Buscar Produto</button>

    {message && <p className="error-message">{message}</p>}

    {product && (
        <div className="details">
            <h2>{product.nome}</h2>
            <p>Id do produto: #{product.id}</p>
            <p>Preço: R$ {product.preco}</p>
            <p>Descrição: {product.descricao}</p>
            {product.imageUrl && <img src={product.imageUrl} alt={product.nome} className="product-image" />}
        </div>
    )}
</div>
);
};


export default OneProduct;
