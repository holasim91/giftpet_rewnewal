import Image from 'next/image';
import CircularItem from '@/components/ui/CircularItem';
import type { CircularRecommendation } from '@/types';

const DUMMY_RECS: CircularRecommendation[] = [
  {
    id: '1',
    label: 'Digestive Health Probiotics',
    imageUrl: '/images/placeholder.svg',
    bgColor: 'bg-primary-fixed',
  },
  {
    id: '2',
    label: 'Calming Hemp Oil',
    imageUrl: '/images/placeholder.svg',
    bgColor: 'bg-primary-container',
  },
  {
    id: '3',
    label: 'Joint Support Chews',
    imageUrl: '/images/placeholder.svg',
    bgColor: 'bg-primary-fixed-dim',
  },
  {
    id: '4',
    label: 'Skin & Coat Supplement',
    imageUrl: '/images/placeholder.svg',
    bgColor: 'bg-outline-variant',
  },
];

export default function MdRecommendation() {
  return (
    <>
      {/* Desktop */}
      <section className="hidden md:block bg-surface-container-lowest py-8 rounded-2xl">
        <h2 className="text-headline-md text-on-surface mb-8 text-center">
          MD&apos;s Recommendation
        </h2>
        <div className="flex justify-center items-center space-x-12 px-4">
          <button
            type="button"
            aria-label="Previous"
            className="w-10 h-10 rounded-full border border-surface-container-high flex items-center justify-center hover:border-primary-container hover:text-primary-container transition-colors"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          {DUMMY_RECS.map((item) => (
            <CircularItem key={item.id} item={item} />
          ))}
          <button
            type="button"
            aria-label="Next"
            className="w-10 h-10 rounded-full border border-surface-container-high flex items-center justify-center hover:border-primary-container hover:text-primary-container transition-colors"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </section>

      {/* Mobile */}
      <section className="md:hidden py-8 bg-surface-container-lowest">
        <div className="px-margin-mobile mb-4">
          <h3 className="text-headline-sm text-on-surface">MD&apos;s Recommendation</h3>
          <p className="text-body-md text-[14px] text-on-surface-variant mt-1">
            Handpicked favorites for this season.
          </p>
        </div>
        <div className="pl-margin-mobile flex space-x-6 overflow-x-auto no-scrollbar pb-4 pr-margin-mobile">
          {DUMMY_RECS.map((item) => (
            <div key={item.id} className="flex flex-col items-center flex-shrink-0 w-24">
              <div className="w-20 h-20 rounded-full bg-surface-container overflow-hidden mb-3 shadow-sm border border-outline-variant/30">
                <Image
                  src={item.imageUrl}
                  alt={item.label}
                  width={80}
                  height={80}
                  unoptimized
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-label-md text-on-surface text-center leading-tight">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
