import type { Metadata } from 'next';
import ShopListContent from '@/components/ui/ShopListContent';
import { getProducts } from '@/actions/product';
import type { SortOption } from '@/types';

export const metadata: Metadata = {
  title: '강아지 간식 | GIFT PET',
  description: '강아지를 위한 건강 간식',
};

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DogTreatsPage({ searchParams }: Props) {
  const { sort } = await searchParams;
  const products = await getProducts({ animalCategory: 'dog', productCategory: 'treats', sort: sort as SortOption });
  return <ShopListContent title="강아지 간식" products={products} />;
}
