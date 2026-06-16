import { notFound } from 'next/navigation';
import { getProductById } from '@/actions/product';
import { getReviews } from '@/actions/review';
import ProductDetailClient from './ProductDetailClient';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const [product, reviews] = await Promise.all([getProductById(id), getReviews(id)]);

  if (!product) notFound();

  return <ProductDetailClient product={product} initialReviews={reviews} />;
}
