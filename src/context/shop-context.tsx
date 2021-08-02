import React from "react";

export default React.createContext({
  products: [

  ],
  cart: [],
  addProductToCart: (product:any) => {},
  removeProductFromCart: (productId:any) => {}
});
