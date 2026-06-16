import type { Metadata } from 'next';
import ShopListContent from '@/components/ui/ShopListContent';
import { getProducts } from '@/actions/product';
import type { SortOption } from '@/types';

export const metadata: Metadata = {
  title: '고양이 용품 | GIFT PET',
  description: '고양이를 위한 생활 용품',
};

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CatSuppliesPage({ searchParams }: Props) {
  const { sort } = await searchParams;
  const products = await getProducts({ animalCategory: 'cat', productCategory: 'supplies', sort: sort as SortOption });
  return <ShopListContent title="고양이 용품" products={products} />;
}
