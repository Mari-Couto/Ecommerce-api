import DeleteOrder from "../components/DeleteOrder"
import OneOrder from "../components/OneOrder"
import OrderList from "../components/OrderList"
import SendOrder from "../components/SendOrder"
import UpdateOrder from "../components/UpdateOrder"


const Orders = () => {
  return (
    <div>
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
