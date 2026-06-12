import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';

export default function SuggestionsSection({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="mt-16 md:mt-24 px-margin-mobile md:px-margin-desktop max-w-container mx-auto">
      <h3 className="text-headline-md font-bold mb-6 md:mb-8">함께 구매하면 좋은 상품</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/shop/product/${product.id}`} className="group">
            <div className="aspect-square bg-surface-container rounded-2xl overflow-hidden mb-3 md:mb-4 relative">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                unoptimized
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {product.isBest && (
                <span className="absolute top-2 left-2 bg-[#4E7CAE] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  BEST
                </span>
              )}
            </div>
            <h4 className="text-body-md font-semibold mb-1 line-clamp-1">{product.name}</h4>
            <p className="text-headline-sm font-bold">
              {(product.discountPrice ?? product.price).toLocaleString()}원
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
