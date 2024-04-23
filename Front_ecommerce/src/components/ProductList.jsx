import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await axios.get('http://localhost:3000/produtos');
                const productsWithImages = await Promise.all(res.data.map(async product => {
                    try {
                        let imageUrl = null;
                        if (product.file) {
                            imageUrl = `http://localhost:3000/produtos/imagem/${product.id}`;
                        }

                        return {
                            ...product,
                            imageUrl: imageUrl
                        };
                    } catch (error) {
                        console.error('Erro ao obter imagem do produto:', error);
                        return product;
                    }
                }));
                setProducts(productsWithImages);
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
                {products.map(product => (
                    <li key={product.id}>
                        <h2>{product.nome}</h2>
                        <p>Id do produto: #{product.id}</p>
                        <p>Preço: R${product.preco}</p>
                        <p>Descrição: {product.descricao}</p>
                        {product.imageUrl && <img src={product.imageUrl} alt={product.nome} />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
