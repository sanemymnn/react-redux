// state yönetimi burada yapılır.

import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function cartReducer(state = initialState.cart, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      var addedItem = state.find(
        (c) => c.product.id === action.payload.product.id
      ); // check if it is the product is already added to cart
      if (addedItem) {
        //if the product is already in the cart, just increase the quantity of the product.

        var newState = state.map((cartItem) => {
          if (cartItem.product.id === action.payload.product.id) {
            return Object.assign({}, addedItem, {
              quantity: addedItem.quantity + 1,
            });
          }
          return cartItem;
        });
        return newState;
      } else {
        return [...state, { ...action.payload }];
      }

    case actionTypes.REMOVE_FROM_CART:
      const newState2 = state.filter(
        (cartItem) => cartItem.product.id !== action.payload.id
      );
      return newState2;
    default:
      return state;
  }
}
