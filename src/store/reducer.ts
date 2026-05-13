import type { Reducer } from 'react';

import type { AppAction, AppState, BasketItem } from '@/types/models';

export const initialState: AppState = {
  basket: [],
  user: null,
};

export const getBasketTotal = (basket: BasketItem[]): number =>
  basket.reduce((amount, item) => item.price + amount, 0);

const reducer: Reducer<AppState, AppAction> = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case 'EMPTY_BASKET':
      return {
        ...state,
        basket: [],
      };
    case 'REMOVE_FROM_BASKET': {
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id,
      );
      const newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.id}) as it's not in the Basket`,
        );
      }
      return { ...state, basket: newBasket };
    }
    case 'SET_USER':
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export default reducer;
