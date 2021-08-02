import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
// import { connect } from 'react-redux';

import ShopContext from "../context/shop-context";
import { makeRequest } from './services/api';

import AuthContext from "../context/auth"


const CartPage = (prop:any) => {
  const context = useContext(ShopContext);
  const authContext = useContext(AuthContext);

  const [total, setTotal] = React.useState(0);


  useEffect(() => {
    if (context.cart.length == 0) {
      setTotal(0);
    } else {
      console.log(context.cart);
      var value = 0.0;
      for(let i = 0; i < context.cart.length; i++) {
        var item = context.cart[i] as any;
        value += 1*item.preco.toFixed(2);
      }
      setTotal(value);
    }
  }, [context.cart]);

  const handleChange = (event: any, quantidade: any, product: any) => {
    if (event.target.value == quantidade + 1) {
      context.addProductToCart(product);
    } else {
      context.removeProductFromCart(product.codigo);
    }
  }

  const buy = async () => {
    var uris = context.cart.map((item: any) => "com:" + item.uri.split('#')[1]).join(', ');
    const result = await makeRequest(uris, new Date().toLocaleString(), total.toFixed(2), authContext.user.codigo);
    alert("Compra realizada com sucesso");
    console.log(result);
  }

  return (
    <React.Fragment >
      <div className="p-20">
    <div className="flex flex-col w-full p-20 text-gray-800 bg-white shadow-lg pin-r pin-y">
    {context.cart.length > 0 ? (

  <div className="flex-1">
    <table className="w-full text-sm lg:text-base" cellSpacing="0">
      <thead>
        <tr className="h-12 uppercase">
          <th className="hidden md:table-cell"></th>
          <th className="text-left">Produto</th>
          <th className="lg:text-right text-left pl-5 lg:pl-0"><span className="lg:hidden" title="Quantity">Qtd</span> <span className="hidden lg:inline">Quantidade</span></th>
          <th className="hidden text-right md:table-cell">Valor unitário</th>
          <th className="text-right">Preço total</th>
        </tr>
      </thead>
      <tbody>
        {context.cart && (
          context.cart.map((item:any) => {
            return (<tr>
              <td className="hidden pb-4 md:table-cell">
                <a href="#"><img src={item.urlFoto} className="w-20 rounded" alt="Thumbnail"/></a>
              </td>
              <td>
                <a href="#">
                <p className="mb-2 ">{item.nome}</p>
               
                  <button onClick={context.removeProductFromCart.bind(
                    this,
                    item.codigo
                  )} className="text-gray-700 "><small>(Remover item)</small></button>
               </a>
              </td>
              <td className="justify-center md:justify-end md:flex mt-6">
                <div className="w-20 h-10">
                  <div className="relative flex flex-row w-full h-8">
                  <span className="text-sm lg:text-base font-medium">
                    <span>
                    <span className="text-sm lg:text-base font-medium">1</span>
                    </span>
                    {/* <input type="number" onChange={(event) => handleChange(event, item.quantity, item)} value={item.quantity} className="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black"/> */}
                    </span>
                  </div>
                </div>
              </td>
              <td className="hidden text-right md:table-cell"><span className="text-sm lg:text-base font-medium">R${item.preco.toFixed(2)}</span></td>
              <td className="text-right"><span className="text-sm lg:text-base font-medium">{(item.preco*1).toLocaleString('pt-BR', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })}</span></td>
            </tr>
            )
          })
        ) }
        </tbody>
    </table>
    <hr className="pb-6 mt-6"/>
    <div className="my-4 mt-6 ">
      <div className="lg:px-2 ">
        <div className="p-4 bg-gray-100 rounded-full">
          <h1 className="ml-2 font-bold uppercase">Detalhes do pedido...</h1>
        </div>
        <div className="p-4">
          <div className="flex justify-between pt-4 border-b">
            <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
              Total
            </div>
            <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
              {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })}
            </div>
          </div>
          <button onClick={buy} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Finalizar compra</button>
        </div>
      </div>
    </div>
  </div>  ): (<div><div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <p className="text-center">
  <strong className="font-bold">Oops! </strong> 
  <span className="block sm:inline">Nenhum item adicionado ao carrinho ainda. Experimente adicionar <Link to="/products">um</Link>.</span>
  </p>
</div></div>)}
</div>
    
    </div>
    </React.Fragment>
  );
};


export default CartPage;
