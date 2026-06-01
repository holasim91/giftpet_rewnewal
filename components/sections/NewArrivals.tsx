import ProductCard from '@/components/ui/ProductCard';
import type { Product } from '@/types';

const DUMMY_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Organic Salmon Cat Treats',
    price: 12990,
    imageUrl: '/images/placeholder.svg',
    badges: ['NEW', 'BEST'],
    category: 'Treats',
  },
  {
    id: '2',
    name: 'Premium Orthopedic Dog Bed - Grey',
    price: 89990,
    imageUrl: '/images/placeholder.svg',
    badges: ['NEW'],
    category: 'Beds',
  },
  {
    id: '3',
    name: 'Smart Pet Water Fountain',
    price: 45990,
    imageUrl: '/images/placeholder.svg',
    badges: ['NEW'],
    category: 'Accessories',
  },
  {
    id: '4',
    name: 'Durable Chew Toy Set - Large',
    price: 24990,
    imageUrl: '/images/placeholder.svg',
    badges: ['NEW'],
    category: 'Toys',
  },
  {
    id: '5',
    name: 'Natural Grain-Free Dog Food 5kg',
    price: 52000,
    imageUrl: '/images/placeholder.svg',
    badges: ['BEST'],
    category: 'Food',
  },
  {
    id: '6',
    name: 'Cat Tree Tower with Scratching Post',
    price: 78000,
    imageUrl: '/images/placeholder.svg',
    badges: [],
    category: 'Furniture',
  },
];

export default function NewArrivals() {
  return (
    <section className="py-6 md:py-0 bg-surface md:bg-transparent">

      {/* Section header */}
      <div className="flex justify-between items-center md:items-end mb-4 md:mb-6 px-margin-mobile md:px-0">
        <h2 className="text-headline-sm md:text-headline-md text-on-surface">New Arrivals</h2>

        {/* Desktop: prev/next carousel buttons */}
        <div className="hidden md:flex space-x-2">
          <button
            type="button"
            aria-label="Previous"
            className="w-10 h-10 rounded-full border border-surface-container-high flex items-center justify-center hover:border-primary-container hover:text-primary-container transition-colors"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            type="button"
            aria-label="Next"
            className="w-10 h-10 rounded-full border border-surface-container-high flex items-center justify-center hover:border-primary-container hover:text-primary-container transition-colors"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        {/* Mobile: View All link */}
        <a href="#" className="md:hidden text-label-sm text-primary hover:underline">
          View All
        </a>
      </div>

      {/* Desktop: horizontal scroll carousel */}
      <div className="hidden md:flex overflow-x-auto gap-6 pb-8 no-scrollbar snap-x snap-mandatory">
        {DUMMY_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {/* View More card */}
        <div className="min-w-[280px] w-[280px] snap-start group cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
          <div className="relative bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] p-4 transition-all duration-300">
            <div className="aspect-square bg-surface-container-low rounded-lg mb-4 overflow-hidden relative flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-tertiary">more_horiz</span>
            </div>
            <h3 className="text-body-md text-on-surface min-h-[48px] mb-2 font-medium text-center">
              View More New Arrivals
            </h3>
          </div>
        </div>
      </div>

      {/* Mobile: 2-column grid */}
      <div className="md:hidden grid grid-cols-2 gap-4 px-margin-mobile">
        {DUMMY_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </section>
  );
}
