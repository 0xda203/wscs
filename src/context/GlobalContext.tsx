import React, { useState, useReducer } from "react";

import ShopContext from "./shop-context";
import { shopReducer, ADD_PRODUCT, REMOVE_PRODUCT } from "./reducers";

const GlobalState = (props:any) => {
  const products:any[] = [

  ];
  // const [cart, setCart] = useState([]);
  const [cartState, dispatch] = useReducer(shopReducer, { cart: [] });

  const addProductToCart = (product:any) => {
    console.log(product);
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: ADD_PRODUCT, product: product });
    }, 700);
  };

  const removeProductFromCart = (productId:any) => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: REMOVE_PRODUCT, productId: productId });
    }, 700);
  };

  return (
    <ShopContext.Provider
      value={{
        products: (products as any),
        cart: cartState.cart,
        addProductToCart: addProductToCart,
        removeProductFromCart: removeProductFromCart
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

export default GlobalState;
