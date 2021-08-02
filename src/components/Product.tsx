import React from "react"
import { Link } from "react-router-dom"
import AuthContext from "../context/auth";

interface Props {
  uri: string;
  nome: string;
  urlFoto: string;
  quantidade: number;
  codigo: string;
  url: string;
  cor: string;
  marca: string;
  preco: number;
}

import ShopContext from "../context/shop-context";

const Product = ({nome, uri, urlFoto, url, codigo, quantidade, cor, marca, preco}: Props) => {
  const { signed } = React.useContext(AuthContext);   

  return (
    <ShopContext.Consumer>
      {context=> (
        <React.Fragment>
<div>
    
    <img src={urlFoto} alt=" random imgee" className="w-full object-cover object-center rounded-lg shadow-md" style={{height: '450px', 
    objectFit: 'cover'}} />    
    
 <div className="relative px-4 -mt-16  ">
   <div className="bg-white p-6 rounded-lg shadow-lg">
    <div className="flex items-baseline">
      <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
        {marca}
      </span>
      <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
    {quantidade} {quantidade > 1 ? 'disponiveis' : 'disponível'}
    </div>
  </div>  
    
    <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate"><a href={url}>{nome}</a></h4>
 
  <div className="mt-1 " style={{fontSize: '20px', fontWeight: 'bold', color: 'green'}}>
    R${preco.toFixed(2)}
  </div>
  {signed ? (<div className="mt-4">
  <button className="bg-red-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => context.addProductToCart({nome, uri, urlFoto, url, codigo, quantidade, cor, marca, preco})}
                    >
                      Adicionar ao carrinho
                    </button>
  </div>
 ) : (
 <div className="mt-4">
  <Link style={{display: 'block'}} className="bg-blue-500 w-full text-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to="/login">Faça login para comprar</Link>
</div>
 )}
  </div>
  
</div>
</div>
</React.Fragment>
)}</ShopContext.Consumer>)
}

export default Product;