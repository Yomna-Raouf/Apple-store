import { useEffect, useState } from 'react';

import { useStateValue } from '@/hooks/useStateValue';
import { db } from '@/lib/firebase';
import type { OrderDocument, OrderListEntry } from '@/types/models';
import Order from './Order';
import './Orders.css';

export default function Orders() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState<OrderListEntry[]>([]);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return undefined;
    }
    const unsubscribe = db
      .collection('users')
      .doc(user.uid)
      .collection('orders')
      .orderBy('created', 'desc')
      .onSnapshot((snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data() as OrderDocument,
          })),
        );
      });
    return () => unsubscribe();
  }, [user]);

  return (
    <div className='orders'>
      <h1>Your Orders</h1>

      <div className='orders__order'>
        {orders?.map((order, index) => (
          <Order key={order.id ?? index} order={order} />
        ))}
      </div>
    </div>
  );
}
