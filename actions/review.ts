'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { uploadReviewImage, deleteReviewImage } from '@/lib/image';
import { revalidatePath } from 'next/cache';
import type { ActionResult, ReviewForDisplay, ReviewedKey } from '@/types';

export async function getReviews(productId: string): Promise<ReviewForDisplay[]> {
  const session = await auth();
  const myUserId = session?.user?.id ?? null;

  try {
    const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        userId: true,
        rating: true,
        content: true,
        imageUrls: true,
        createdAt: true,
        user: { select: { name: true } },
      },
    });

    return reviews.map((r) => ({
      id: r.id,
      rating: r.rating,
      content: r.content,
      imageUrls: r.imageUrls,
      createdAt: r.createdAt.toISOString(),
      authorName: r.user.name ?? '익명',
      isMyReview: r.userId === myUserId,
    }));
  } catch {
    return [];
  }
}

export async function createReview(
  productId: string,
  orderId: string,
  rating: number,
  content: string,
  imageUrls: string[],
): Promise<ActionResult<{ reviewId: string }>> {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: '로그인이 필요합니다.' };

  if (rating < 1 || rating > 5) return { success: false, error: '별점은 1~5 사이여야 합니다.' };
  if (content.trim().length < 10) return { success: false, error: '리뷰는 최소 10자 이상 작성해주세요.' };
  if (imageUrls.length > 3) return { success: false, error: '이미지는 최대 3개까지 업로드할 수 있습니다.' };

  try {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: session.user.id,
        status: 'DELIVERED',
      },
      include: { items: { where: { productId }, select: { id: true } } },
    });

    if (!order) return { success: false, error: '리뷰를 작성할 수 없는 주문입니다.' };
    if (order.items.length === 0) return { success: false, error: '해당 주문에 포함된 상품이 아닙니다.' };

    const review = await prisma.review.create({
      data: {
        userId: session.user.id,
        productId,
        orderId,
        rating,
        content: content.trim(),
        imageUrls,
      },
      select: { id: true },
    });

    revalidatePath(`/shop/product/${productId}`);
    revalidatePath('/mypage');
    return { success: true, data: { reviewId: review.id } };
  } catch (e) {
    if (e instanceof Error && e.message.includes('Unique constraint')) {
      return { success: false, error: '이미 리뷰를 작성한 상품입니다.' };
    }
    return { success: false, error: '리뷰 작성 중 오류가 발생했습니다.' };
  }
}

export async function deleteReview(reviewId: string): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: '로그인이 필요합니다.' };

  try {
    const review = await prisma.review.findFirst({
      where: { id: reviewId, userId: session.user.id },
    });
    if (!review) return { success: false, error: '리뷰를 찾을 수 없습니다.' };

    await prisma.review.delete({ where: { id: reviewId } });

    await Promise.allSettled(review.imageUrls.map((url) => deleteReviewImage(url)));

    revalidatePath(`/shop/product/${review.productId}`);
    revalidatePath('/mypage');
    return { success: true };
  } catch {
    return { success: false, error: '리뷰 삭제 중 오류가 발생했습니다.' };
  }
}

export async function getMyReviewableProducts(): Promise<
  { orderId: string; productId: string; productName: string; imageUrl: string; orderedAt: string }[]
> {
  const session = await auth();
  if (!session?.user?.id) return [];

  try {
    const myReviewedKeys = await prisma.review.findMany({
      where: { userId: session.user.id },
      select: { orderId: true, productId: true },
    });
    const reviewedSet = new Set(myReviewedKeys.map((r) => `${r.orderId}:${r.productId}`));

    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
        status: 'DELIVERED',
      },
      select: {
        id: true,
        createdAt: true,
        items: {
          select: {
            productId: true,
            productName: true,
            product: { select: { imageUrl: true } },
          },
        },
      },
    });

    return orders.flatMap((order) =>
      order.items
        .filter((item) => !reviewedSet.has(`${order.id}:${item.productId}`))
        .map((item) => ({
          orderId: order.id,
          productId: item.productId,
          productName: item.productName,
          imageUrl: item.product.imageUrl,
          orderedAt: order.createdAt.toISOString(),
        })),
    );
  } catch {
    return [];
  }
}

export type MyReviewDetail = {
  id: string;
  rating: number;
  content: string;
  imageUrls: string[];
  createdAt: string;
};

export async function getMyReview(reviewId: string): Promise<MyReviewDetail | null> {
  const session = await auth();
  if (!session?.user?.id) return null;

  try {
    const review = await prisma.review.findFirst({
      where: { id: reviewId, userId: session.user.id },
      select: { id: true, rating: true, content: true, imageUrls: true, createdAt: true },
    });
    if (!review) return null;
    return { ...review, createdAt: review.createdAt.toISOString() };
  } catch {
    return null;
  }
}

export async function getMyReviewedKeys(): Promise<ReviewedKey[]> {
  const session = await auth();
  if (!session?.user?.id) return [];

  try {
    const rows = await prisma.review.findMany({
      where: { userId: session.user.id },
      select: { id: true, orderId: true, productId: true },
    });
    return rows.map((r) => ({ reviewId: r.id, orderId: r.orderId, productId: r.productId }));
  } catch {
    return [];
  }
}

export async function uploadReviewImageAction(formData: FormData): Promise<ActionResult<{ url: string }>> {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: '로그인이 필요합니다.' };

  try {
    const file = formData.get('file') as File | null;
    if (!file) return { success: false, error: '파일이 없습니다.' };

    const url = await uploadReviewImage(file, session.user.id);
    return { success: true, data: { url } };
  } catch (e) {
    const message = e instanceof Error ? e.message : '이미지 업로드 중 오류가 발생했습니다.';
    return { success: false, error: message };
  }
}

export async function deleteReviewImageAction(url: string): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: '로그인이 필요합니다.' };

  try {
    await deleteReviewImage(url);
    return { success: true };
  } catch {
    return { success: false, error: '이미지 삭제 중 오류가 발생했습니다.' };
  }
}
