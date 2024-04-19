import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await axios.get('http://localhost:3000/produtos');
                setProducts(res.data);
            } catch (error) {
                console.error('Erro ao obter os produtos:', error);
            }
        }
        fetchProducts();
    }, []);

  return (
    <div>
      <h1>Lista de produtos</h1>
      <ul>
        {products.map(product =>(
            <li key={product.id}>
                <h2>{product.nome}</h2>
                <p>Preço: R${product.preco}</p>
                <p>Descrição: {product.descricao}</p>
                {product.fileLink && <img src={product.fileLink} alt={product.nome} />}
          
            </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList;
