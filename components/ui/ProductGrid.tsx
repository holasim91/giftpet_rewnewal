import type { Product } from '@/types';
import ProductCardBase from '@/components/ui/ProductCardBase';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-gutter">
      {products.map((product) => (
        <ProductCardBase key={product.id} product={product} showQuickAdd />
      ))}
    </div>
  );
}
