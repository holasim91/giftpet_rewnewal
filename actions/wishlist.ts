'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import type { ActionResult, WishlistItemWithProduct } from '@/types';

export async function getWishlist(): Promise<WishlistItemWithProduct[]> {
  const session = await auth();
  if (!session?.user?.id) return [];

  return prisma.wishlist.findMany({
    where: { userId: session.user.id },
    select: {
      id: true,
      product: true, // ProductGrid에 그대로 넘길 수 있도록 전체 Product
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getWishlistCount(): Promise<number> {
  const session = await auth();
  if (!session?.user?.id) return 0;
  return prisma.wishlist.count({ where: { userId: session.user.id } });
}

// 유저가 찜한 상품 ID 전체를 한 번에 조회 (WishlistProvider 초기값용)
export async function getWishlistedProductIds(): Promise<string[]> {
  const session = await auth();
  if (!session?.user?.id) return [];

  const rows = await prisma.wishlist.findMany({
    where: { userId: session.user.id },
    select: { productId: true },
  });
  return rows.map((r) => r.productId);
}

// 있으면 삭제, 없으면 추가하는 토글. data로 추가/삭제 여부를 반환한다.
export async function toggleWishlist(
  productId: string,
): Promise<ActionResult<{ wishlisted: boolean }>> {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: '로그인이 필요합니다.' };

  const existing = await prisma.wishlist.findUnique({
    where: { userId_productId: { userId: session.user.id, productId } },
  });

  if (existing) {
    await prisma.wishlist.delete({ where: { id: existing.id } });
    revalidatePath('/wishlist');
    return { success: true, data: { wishlisted: false } };
  }

  await prisma.wishlist.create({
    data: { userId: session.user.id, productId },
  });
  revalidatePath('/wishlist');
  return { success: true, data: { wishlisted: true } };
}
