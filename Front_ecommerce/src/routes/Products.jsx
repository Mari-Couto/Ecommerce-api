import React from 'react'
import ProductList from '../components/ProductList'
import OneProduct from '../components/OneProduct'
import SendProduct from '../components/SendProduct'
import DeleteProduct from '../components/DeleteProduct'
import PatchProduct from '../components/PatchProduct'

const Products = () => {
  return (
    <div>
     <h1>Produtos</h1>
     <OneProduct/>
      <ProductList/>
      <SendProduct/>
      <DeleteProduct/>
      <PatchProduct/>
    </div>
  )
}

export default Products
