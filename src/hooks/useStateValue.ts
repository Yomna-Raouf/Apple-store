import { useContext } from 'react';
import type { Dispatch } from 'react';

import { StateContext } from '@/store/stateContext';
import type { AppAction, AppState } from '@/types/models';

export function useStateValue(): [AppState, Dispatch<AppAction>] {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useStateValue must be used within a StateProvider');
  }
  return context;
}
