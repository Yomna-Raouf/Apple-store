import type { Reducer } from 'react';

import type { AppAction, AppState, BasketItem } from '@/types/models';

export const initialState: AppState = {
  basket: [],
  user: null,
};

export const getBasketTotal = (basket: BasketItem[]): number =>
  basket.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const getBasketItemCount = (basket: BasketItem[]): number =>
  basket.reduce((n, item) => n + item.quantity, 0);

const newLineId = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `line-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const reducer: Reducer<AppState, AppAction> = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_BASKET': {
      const { item } = action;
      const existingIndex = state.basket.findIndex((b) => b.id === item.id);
      if (existingIndex >= 0) {
        const cur = state.basket[existingIndex]!;
        return {
          ...state,
          basket: state.basket.toSpliced(existingIndex, 1, {
            ...cur,
            quantity: cur.quantity + 1,
          }),
        };
      }
      const row: BasketItem = {
        ...item,
        lineId: newLineId(),
        quantity: 1,
      };
      return { ...state, basket: [...state.basket, row] };
    }
    case 'EMPTY_BASKET':
      return {
        ...state,
        basket: [],
      };
    case 'REMOVE_FROM_BASKET': {
      const next = state.basket.filter((b) => b.lineId !== action.lineId);
      if (next.length === state.basket.length) {
        console.warn(
          `REMOVE_FROM_BASKET: no line with lineId ${action.lineId}`,
        );
        return state;
      }
      return { ...state, basket: next };
    }
    case 'ADJUST_BASKET_QTY': {
      const { lineId, delta } = action;
      if (!Number.isFinite(delta) || delta === 0) {
        return state;
      }
      const i = state.basket.findIndex((b) => b.lineId === lineId);
      if (i < 0) {
        return state;
      }
      const cur = state.basket[i]!;
      const nextQty = cur.quantity + delta;
      if (nextQty < 1) {
        return {
          ...state,
          basket: state.basket.toSpliced(i, 1),
        };
      }
      return {
        ...state,
        basket: state.basket.toSpliced(i, 1, { ...cur, quantity: nextQty }),
      };
    }
    case 'SET_USER':
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export default reducer;
