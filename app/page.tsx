import Header from '@/components/layout/Header';
import MobileHeader from '@/components/layout/MobileHeader';
import Footer from '@/components/layout/Footer';
import HeroBanner from '@/components/sections/HeroBanner';
import CategoryPills from '@/components/sections/CategoryPills';
import NewArrivals from '@/components/sections/NewArrivals';
import MdRecommendation from '@/components/sections/MdRecommendation';

export default function HomePage() {
  return (
    <>
      <Header />
      <MobileHeader />
      <main className="flex-1 w-full md:max-w-container md:mx-auto md:px-margin-desktop md:py-8 md:space-y-16">
        <HeroBanner />
        <CategoryPills />
        <NewArrivals />
        <MdRecommendation />
      </main>
      <Footer />
    </>
  );
}
