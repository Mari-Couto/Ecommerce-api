import './App.css'
import DeleteProduct from './components/DeleteProduct';
import OneProduct from './components/OneProduct';
import PatchProduct from './components/PatchProduct';
import ProductList from './components/ProductList';
import SendProduct from './components/SendProduct';

function App() {

  return (
      <div>
        <OneProduct/>
        <ProductList/>
        <SendProduct/>
        <DeleteProduct/>
        <PatchProduct/>
      </div>
  )
}

export default App;
