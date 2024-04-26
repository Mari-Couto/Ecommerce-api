import ProductList from '../components/ProductList'
import OneProduct from '../components/OneProduct'
import SendProduct from '../components/SendProduct'
import DeleteProduct from '../components/DeleteProduct'
import PatchProduct from '../components/PatchProduct'
import { Link } from 'react-router-dom';

const Products = () => {
  return (
    <div>
         <Link to="/">
          <button className="button">Voltar</button>
        </Link>
     <h1 className="centralizar">Produtos</h1>
     <OneProduct/>
      <ProductList/>
      <SendProduct/>
      <DeleteProduct/>
      <PatchProduct/>
    </div>
  )
}

export default Products
