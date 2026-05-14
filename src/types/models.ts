export type BasketItem = {
  /** Stable id for this basket row (add / +/- / remove target). */
  lineId: string;
  /** Catalog product id (same product merges quantity on add). */
  id: string;
  title: string;
  image: string;
  /** Unit price in dollars (not cents). */
  price: number;
  rating: number;
  quantity: number;
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
  | { type: 'ADD_TO_BASKET'; item: Omit<BasketItem, 'lineId' | 'quantity'> }
  | { type: 'EMPTY_BASKET' }
  | { type: 'REMOVE_FROM_BASKET'; lineId: string }
  | { type: 'ADJUST_BASKET_QTY'; lineId: string; delta: number }
  | { type: 'SET_USER'; user: AuthUser };
