'use client';

import { type CartItemWithProduct } from '@/actions/cart';
import type { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import EmptyCart from '@/components/cart/EmptyCart';
import FilledCart from '@/components/cart/FilledCart';

interface Props {
  initialItems: CartItemWithProduct[];
  suggestions: Product[];
}

export default function CartClient({ initialItems, suggestions }: Props) {
  const cart = useCart(initialItems);

  if (cart.optimisticItems.length === 0) {
    return <EmptyCart suggestions={suggestions} />;
  }

  return <FilledCart {...cart} suggestions={suggestions} />;
}
