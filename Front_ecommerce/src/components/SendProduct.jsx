import { useEffect, useState } from 'react';
import axios from 'axios';

const url = 'http://localhost:3000/produtos';

const SendProduct = () => {
  const [data, setData] = useState({
    nome: '',
    preco: '',
    descricao: ''
  });
  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await axios.post(url, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setMessage('Produto inserido com sucesso.');
      setData({ nome: '', preco: '', descricao: '' });
    } catch (error) {
      console.error('Erro ao inserir produto:', error);
      setMessage('Erro ao inserir produto. Por favor, tente novamente.');
    }
  };


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        const newData = Object.keys(data).reduce((acc, key) => {
          acc[key] = res.data[key] !== undefined ? res.data[key] : '';
          return acc;
        }, {});
        setData(newData);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchData();
  }, [url]);
  
  
  return (
    <div>
      <h2>Adicionar Novo Produto</h2>
      <form onSubmit={handleSubmit}>
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
          <textarea name="descricao" value={data.descricao} onChange={handleChange}  />
        </div>
        <button type="submit">Adicionar Produto</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SendProduct;
