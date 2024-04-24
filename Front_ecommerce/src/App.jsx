import './App.css'
import DeleteOrder from './components/DeleteOrder';
import DeleteProduct from './components/DeleteProduct';
import OneOrder from './components/OneOrder';
import OneProduct from './components/OneProduct';
import OrderList from './components/OrderList';
import PatchProduct from './components/PatchProduct';
import ProductList from './components/ProductList';
import SendOrder from './components/SendOrder';
import SendProduct from './components/SendProduct';

function App() {

  return (
      <div>
        <OneProduct/>
        <ProductList/>
        <SendProduct/>
        <DeleteProduct/>
        <PatchProduct/>
        <hr className="custom-line" /> 
        <OneOrder/>
        <OrderList/>
        <SendOrder/>
        <DeleteOrder/>

      </div>
  )
}

export default App;