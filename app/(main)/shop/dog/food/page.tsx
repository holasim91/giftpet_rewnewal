import type { Metadata } from 'next';
import ShopListContent from '@/components/ui/ShopListContent';
import { getProducts } from '@/actions/product';
import type { SortOption } from '@/types';

export const metadata: Metadata = {
  title: '강아지 사료 | GIFT PET',
  description: '강아지를 위한 프리미엄 사료',
};

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DogFoodPage({ searchParams }: Props) {
  const { sort } = await searchParams;
  const products = await getProducts({ animalCategory: 'dog', productCategory: 'food', sort: sort as SortOption });
  return <ShopListContent title="강아지 사료" products={products} />;
}
