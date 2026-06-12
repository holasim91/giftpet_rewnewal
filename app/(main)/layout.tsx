import Script from 'next/script';
import Header from '@/components/layout/Header';
import MobileHeader from '@/components/layout/MobileHeader';
import Footer from '@/components/layout/Footer';
import WishlistProvider from '@/components/wishlist/WishlistProvider';
import { getWishlistedProductIds } from '@/actions/wishlist';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const wishlistedIds = await getWishlistedProductIds();

  return (
    <WishlistProvider initialIds={wishlistedIds}>
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="afterInteractive"
      />
      <Header />
      <MobileHeader />
      {children}
      <Footer />
    </WishlistProvider>
  );
}
