import DeleteOrder from "../components/DeleteOrder"
import OneOrder from "../components/OneOrder"
import OrderList from "../components/OrderList"
import SendOrder from "../components/SendOrder"
import UpdateOrder from "../components/UpdateOrder"
import { Link } from 'react-router-dom';

const Orders = () => {
  return (
    <div>
      <Link to="/">
          <button className="button">Voltar</button>
        </Link>
     <h1 className="centralizar">Pedidos</h1>
     <OneOrder/>
     <OrderList/> 
     <SendOrder/>
     <DeleteOrder/>
     <UpdateOrder/>

    </div>
  )
}

export default Orders
