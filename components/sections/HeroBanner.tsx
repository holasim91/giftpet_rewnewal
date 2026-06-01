import Image from 'next/image';

export default function HeroBanner() {
  return (
    <>
      {/* Desktop hero */}
      <section className="hidden md:flex w-full rounded-2xl overflow-hidden shadow-sm relative h-[400px] items-center bg-surface-container-low">
        <Image
          src="/images/placeholder.svg"
          alt="Hero Banner"
          fill
          unoptimized
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="relative z-10 p-12 bg-white/70 backdrop-blur-sm rounded-xl ml-12 max-w-lg">
          <h2 className="text-headline-lg text-on-surface mb-4">
            Unbox Happiness for Your Pet
          </h2>
          <p className="text-body-lg text-on-surface-variant mb-6">
            Discover our curated selection of premium toys, treats, and care products.
          </p>
          <button
            type="button"
            className="bg-primary-container text-white px-8 py-3 rounded-full text-label-md hover:opacity-90 transition-opacity shadow-sm"
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Mobile hero */}
      <section className="md:hidden relative w-full aspect-[4/3] bg-surface-container overflow-hidden">
        <Image
          src="/images/placeholder.svg"
          alt="Hero Banner"
          fill
          unoptimized
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-margin-mobile pb-8">
          <h2 className="text-headline-lg-mobile text-on-primary mb-2">
            Unboxing Happiness
          </h2>
          <p className="text-body-md text-surface-bright mb-6 max-w-sm">
            Discover premium, healthy treats and cozy essentials for your furry friends.
          </p>
          <button
            type="button"
            className="bg-primary-container text-on-primary text-label-md py-3 px-6 rounded-lg w-full max-w-[200px] shadow-sm active:scale-95 transition-transform duration-150"
          >
            Shop Now
          </button>
        </div>
      </section>
    </>
  );
}
