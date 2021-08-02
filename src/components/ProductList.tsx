import React, { useEffect, useState } from "react";
import Product from "./Product";
import { getProducts } from "./services/api";
import { Link } from "react-router-dom"
interface Props {
  max?: number;
}

export default function ProductList({max = 0}: Props) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      let products = await getProducts(max);
      console.log(products);
      setProducts(products);
    }
    fetchProducts()
  }, [])
 
  
    return (
      
        <div style={{marginTop: '40px'}}>
          {/* {max == 0 && (
            <div className="inline-flex">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
              
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
              Next
            </button>
          </div>
          )} */}
          <p style={{textAlign: 'center'}}><span style={{fontWeight: 'bold', fontSize: '2em', textAlign: 'center'}}>
               {max != 0 ? 'Principais ' : ''}Produtos</span>
               {max != 0 ? 
          (<Link to={'/products'} style={{float: 'right', fontWeight: 'lighter', fontSize: '1em', marginRight: '20px'}} className="bg-red-400 text-gray-50 rounded-md px-2">ver todos</Link>)
           : ''}</p>

              <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
    
          {products.map((product: any) => {
            return <Product key={product.codigo} url={product.url} uri={product.uri} nome={product.nome} preco={product.preco} marca={product.marca} cor={product.cor} quantidade={product.quantidade} codigo={product.codigo} urlFoto={product.urlFoto} />
          })}
    
</div>
        </div>
    );

}