import { createContext } from 'react';
import type { Dispatch } from 'react';

import type { AppAction, AppState } from '@/types/models';

export const StateContext = createContext<
  [AppState, Dispatch<AppAction>] | null
>(null);
