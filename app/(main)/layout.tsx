import Header from '@/components/layout/Header';
import MobileHeader from '@/components/layout/MobileHeader';
import Footer from '@/components/layout/Footer';
import WishlistProvider from '@/components/wishlist/WishlistProvider';
import { getWishlistedProductIds } from '@/actions/wishlist';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const wishlistedIds = await getWishlistedProductIds();

  return (
    <WishlistProvider initialIds={wishlistedIds}>
      <Header />
      <MobileHeader />
      {children}
      <Footer />
    </WishlistProvider>
  );
}
