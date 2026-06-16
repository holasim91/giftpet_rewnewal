import type { Metadata } from 'next';
import ShopListContent from '@/components/ui/ShopListContent';
import { getProducts } from '@/actions/product';
import type { SortOption } from '@/types';

export const metadata: Metadata = {
  title: '고양이 | GIFT PET',
  description: '고양이를 위한 프리미엄 간식, 용품',
};

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CatShopPage({ searchParams }: Props) {
  const { sort } = await searchParams;
  const products = await getProducts({ animalCategory: 'cat', sort: sort as SortOption });
  return <ShopListContent title="고양이" products={products} />;
}
