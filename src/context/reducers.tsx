export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";

const addProductToCart = (product:any, state:any) => {
  console.log(product);
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    item => item.codigo === product.codigo
  );

  if (updatedItemIndex < 0) {
    updatedCart.push({ ...product, quantity: 1 });
  } else {
    const updatedItem = {
      ...updatedCart[updatedItemIndex]
    };
    updatedItem.quantity++;
    updatedCart[updatedItemIndex] = updatedItem;
  }
  return { ...state, cart: updatedCart };
};

const removeProductFromCart = (productId:any, state:any) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(item => item.codigo === productId);

  const updatedItem = {
    ...updatedCart[updatedItemIndex]
  };
  updatedItem.quantity--;
  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }
  return { ...state, cart: updatedCart };
};

export const shopReducer = (state:any, action:any) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addProductToCart(action.product, state);
    case REMOVE_PRODUCT:
      return removeProductFromCart(action.productId, state);
    default:
      return state;
  }
};
