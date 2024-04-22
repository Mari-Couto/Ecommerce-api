import { useState } from 'react';
import axios from 'axios';

const DeleteProduct = () => {
  const [productId, setProductId] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setProductId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(`http://localhost:3000/produtos/${productId}`);
      setMessage(response.data.message);
      setProductId(''); 
    } catch (error) {
      setMessage('Erro ao excluir produto. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <h2>Excluir Produto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID do Produto:</label>
          <input type="text" value={productId} onChange={handleChange} required />
        </div>
        <button type="submit">Excluir Produto</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteProduct;
