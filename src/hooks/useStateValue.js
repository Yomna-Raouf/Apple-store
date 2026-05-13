import { useContext } from 'react';
import { StateContext } from '@/store/stateContext';

export function useStateValue() {
  return useContext(StateContext);
}
