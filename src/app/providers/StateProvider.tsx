import { useReducer, type ReactNode, type Reducer } from 'react';

import { StateContext } from '@/store/stateContext';
import type { AppAction, AppState } from '@/types/models';

type StateProviderProps = {
  reducer: Reducer<AppState, AppAction>;
  initialState: AppState;
  children: ReactNode;
};

export function StateProvider({
  reducer,
  initialState,
  children,
}: StateProviderProps) {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
}
