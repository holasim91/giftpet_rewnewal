import type { Metadata } from 'next';
import ShopListContent from '@/components/ui/ShopListContent';
import { getProducts } from '@/actions/product';
import type { SortOption } from '@/types';

export const metadata: Metadata = {
  title: '영양제 | GIFT PET',
  description: '강아지·고양이를 위한 건강 영양제',
};

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SupplementsShopPage({ searchParams }: Props) {
  const { sort } = await searchParams;
  const products = await getProducts({ productCategory: 'supplements', sort: sort as SortOption });
  return <ShopListContent title="영양제" products={products} />;
}
