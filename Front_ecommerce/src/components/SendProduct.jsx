import { useState } from 'react';
import axios from 'axios';

const url = 'http://localhost:3000/produtos';

const SendProduct = () => {
  const [data, setData] = useState({
    nome: '',
    preco: '',
    descricao: '',
    file: null
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setData({ ...data, file: e.target.files[0] });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('nome', data.nome);
      formData.append('preco', data.preco);
      formData.append('descricao', data.descricao);
      formData.append('file', data.file); 

      await axios.post(url, formData, { 
        headers: {
          'Content-Type': 'multipart/form-data' 
        }
      });

      setMessage('Produto inserido com sucesso.');
      setData({ nome: '', preco: '', descricao: '', file: null }); 
    } catch (error) {
      console.error('Erro ao inserir produto:', error);
      setMessage('Erro ao inserir produto. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <h2>Adicionar Novo Produto</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data"> 
        <div>
          <label>Nome:</label>
          <input type="text" name="nome" value={data.nome} onChange={handleChange} required />
        </div>
        <div>
          <label>Preço:</label>
          <input type="number" name="preco" value={data.preco} onChange={handleChange} required />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea name="descricao" value={data.descricao} onChange={handleChange} />
        </div>
        <div> 
          <label>Imagem:</label>
          <input type="file" name="file" onChange={handleChange} />
        </div>
        <button type="submit">Adicionar Produto</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SendProduct;
