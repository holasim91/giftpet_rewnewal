import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import MobileHeader from '@/components/layout/MobileHeader';
import Footer from '@/components/layout/Footer';
import CartClient from './CartClient';
import { getCart } from '@/actions/cart';
import { getMdPickProducts } from '@/actions/product';

export const metadata: Metadata = {
  title: '장바구니 | GIFT PET',
};

export default async function CartPage() {
  const [cartItems, suggestions] = await Promise.all([getCart(), getMdPickProducts()]);

  return (
    <>
      <Header />
      <MobileHeader />
      <CartClient initialItems={cartItems} suggestions={suggestions} />
      <Footer />
    </>
  );
}
