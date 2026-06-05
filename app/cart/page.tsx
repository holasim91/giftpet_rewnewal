import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import MobileHeader from '@/components/layout/MobileHeader';
import Footer from '@/components/layout/Footer';
import CartClient from './CartClient';
import { getCart } from '@/actions/cart';

export const metadata: Metadata = {
  title: '장바구니 | GIFT PET',
};

export default async function CartPage() {
  const cartItems = await getCart();

  return (
    <>
      <Header />
      <MobileHeader />
      <CartClient initialItems={cartItems} />
      <Footer />
    </>
  );
}
