import Script from 'next/script';
import Header from '@/components/layout/Header';
import MobileHeader from '@/components/layout/MobileHeader';
import Footer from '@/components/layout/Footer';
import WishlistProvider from '@/components/wishlist/WishlistProvider';
import { getWishlistedProductIds } from '@/actions/wishlist';
import { auth } from '@/auth';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const [wishlistedIds, session] = await Promise.all([getWishlistedProductIds(), auth()]);

  return (
    <WishlistProvider initialIds={wishlistedIds} isLoggedIn={!!session}>
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
