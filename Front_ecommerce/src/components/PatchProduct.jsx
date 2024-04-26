import { useState } from 'react';
import axios from 'axios';

const PatchProduct = () => {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'productId') {
      setProductId(value);
    } else if (name === 'productName') {
      setProductName(value);
    } else if (name === 'productPrice') {
      setProductPrice(value);
    } else if (name === 'productDescription') {
      setProductDescription(value);
    } else if (name === 'file') {
      setProductImage(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('nome', productName);
      formData.append('preco', productPrice);
      formData.append('descricao', productDescription);
      formData.append('file', productImage); 
  
      const response = await axios.patch(`http://localhost:3000/produtos/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' 
        }
      });
  
      setMessage(response.data.message);
      setProductId('');
      setProductName('');
      setProductPrice('');
      setProductDescription('');
      setProductImage(''); 
    } catch (error) {
      setMessage('Erro ao atualizar produto. Por favor, tente novamente.');
    }
  };

  return (
    <div className="form-container">
      <h2>Alterar Produto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID do Produto:</label>
          <input type="text" name="productId" value={productId} onChange={handleChange} required />
        </div>
        <div>
          <label>Novo Nome:</label>
          <input type="text" name="productName" value={productName} onChange={handleChange} />
        </div>
        <div>
          <label>Novo Preço:</label>
          <input type="number" name="productPrice" value={productPrice} onChange={handleChange} />
        </div>
        <div>
          <label>Nova Descrição:</label>
          <textarea name="productDescription" value={productDescription} onChange={handleChange} />
        </div>
        <div> 
          <label>Imagem:</label>
          <input type="file" name="file" onChange={handleChange} />
        </div>
        <button type="submit">Atualizar Produto</button>
      </form>
      {message && <p className="sucess-message">{message}</p>}
    </div>
  );
};

export default PatchProduct;
