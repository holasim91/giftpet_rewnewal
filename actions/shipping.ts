'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import type { ActionResult, ShippingAddress } from '@/types';

export async function getShippingAddresses(): Promise<ShippingAddress[]> {
  const session = await auth();
  if (!session?.user?.id) return [];

  try {
    return await prisma.shippingAddress.findMany({
      where: { userId: session.user.id },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'asc' }],
    });
  } catch {
    return [];
  }
}

export async function addShippingAddress(
  data: Omit<ShippingAddress, 'id' | 'userId' | 'isDefault' | 'createdAt'>,
): Promise<ActionResult<ShippingAddress>> {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: '로그인이 필요합니다.' };

  try {
    const count = await prisma.shippingAddress.count({
      where: { userId: session.user.id },
    });

    if (count >= 3) {
      return { success: false, error: '배송지는 최대 3개까지 등록 가능합니다.' };
    }

    const isFirstAddress = count === 0;
    const address = await prisma.shippingAddress.create({
      data: { ...data, userId: session.user.id, isDefault: isFirstAddress },
    });

    revalidatePath('/mypage');
    return { success: true, data: address };
  } catch {
    return { success: false, error: '배송지 추가 중 오류가 발생했습니다.' };
  }
}

export async function updateShippingAddress(
  id: string,
  data: Partial<Omit<ShippingAddress, 'id' | 'userId' | 'isDefault' | 'createdAt'>>,
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: '로그인이 필요합니다.' };

  try {
    await prisma.shippingAddress.updateMany({
      where: { id, userId: session.user.id },
      data,
    });

    revalidatePath('/mypage');
    return { success: true };
  } catch {
    return { success: false, error: '배송지 수정 중 오류가 발생했습니다.' };
  }
}

export async function deleteShippingAddress(id: string): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: '로그인이 필요합니다.' };

  try {
    const target = await prisma.shippingAddress.findFirst({
      where: { id, userId: session.user.id },
    });
    if (!target) return { success: false, error: '배송지를 찾을 수 없습니다.' };

    await prisma.shippingAddress.delete({ where: { id } });

    if (target.isDefault) {
      const next = await prisma.shippingAddress.findFirst({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'asc' },
      });
      if (next) {
        await prisma.shippingAddress.update({
          where: { id: next.id },
          data: { isDefault: true },
        });
      }
    }

    revalidatePath('/mypage');
    return { success: true };
  } catch {
    return { success: false, error: '배송지 삭제 중 오류가 발생했습니다.' };
  }
}

export async function setDefaultAddress(id: string): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: '로그인이 필요합니다.' };

  try {
    await prisma.$transaction([
      prisma.shippingAddress.updateMany({
        where: { userId: session.user.id },
        data: { isDefault: false },
      }),
      prisma.shippingAddress.updateMany({
        where: { id, userId: session.user.id },
        data: { isDefault: true },
      }),
    ]);

    revalidatePath('/mypage');
    return { success: true };
  } catch {
    return { success: false, error: '기본 배송지 변경 중 오류가 발생했습니다.' };
  }
}
