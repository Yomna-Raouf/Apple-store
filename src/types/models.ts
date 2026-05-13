export type BasketItem = {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
};

/**
 * Subset of Firebase Auth user fields we rely on (works with compat `User`).
 */
export type AuthUser =
  | {
      uid: string;
      email: string | null;
    }
  | null;

export type OrderDocument = {
  basket?: BasketItem[];
  amount: number;
  created: number;
};

export type OrderListEntry = {
  id: string;
  data: OrderDocument;
};

export type AppState = {
  basket: BasketItem[];
  user: AuthUser;
};

export type AppAction =
  | { type: 'ADD_TO_BASKET'; item: BasketItem }
  | { type: 'EMPTY_BASKET' }
  | { type: 'REMOVE_FROM_BASKET'; id: string }
  | { type: 'SET_USER'; user: AuthUser };
