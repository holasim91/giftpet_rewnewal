import type { Metadata } from 'next';
import ShopListContent from '@/components/ui/ShopListContent';
import { getProducts } from '@/actions/product';
import type { SortOption } from '@/types';

export const metadata: Metadata = {
  title: '모든 상품 | GIFT PET',
  description: '강아지, 고양이를 위한 프리미엄 사료, 간식, 용품, 영양제',
};

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ShopPage({ searchParams }: Props) {
  const { sort } = await searchParams;
  const products = await getProducts({ sort: sort as SortOption });
  return <ShopListContent title="모든 상품" products={products} />;
}
