import { useReducer } from 'react';
import { StateContext } from '@/store/stateContext';

export function StateProvider({ reducer, initialState, children }) {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
}
