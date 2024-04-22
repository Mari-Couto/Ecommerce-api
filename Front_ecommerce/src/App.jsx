import './App.css'
import DeleteProduct from './components/DeleteProduct';
import OneProduct from './components/OneProduct';
import ProductList from './components/ProductList';
import SendProduct from './components/SendProduct';

function App() {

  return (
      <div>
        <OneProduct/>
        <ProductList/>
        <SendProduct/>
        <DeleteProduct/>
      </div>
  )
}

export default App;
