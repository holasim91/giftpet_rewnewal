'use server';

import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { auth, signOut } from '@/auth';
import { prisma } from '@/lib/prisma';
import type { ActionResult } from '@/types';

export async function updateUserName(name: string): Promise<ActionResult> {
  const session = await auth();
  if (!session) return { success: false, error: '로그인이 필요합니다.' };

  const trimmed = name.trim();
  if (!trimmed) return { success: false, error: '이름을 입력해주세요.' };

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name: trimmed },
  });

  revalidatePath('/mypage');
  return { success: true };
}

export async function updateUserPassword(
  currentPassword: string,
  newPassword: string,
  confirmPassword: string,
): Promise<ActionResult> {
  const session = await auth();
  if (!session) return { success: false, error: '로그인이 필요합니다.' };

  if (newPassword !== confirmPassword) {
    return { success: false, error: '새 비밀번호가 일치하지 않습니다.' };
  }
  if (newPassword.length < 8) {
    return { success: false, error: '새 비밀번호는 8자 이상이어야 합니다.' };
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) return { success: false, error: '사용자를 찾을 수 없습니다.' };

  const isValid = await bcrypt.compare(currentPassword, user.password);
  if (!isValid) return { success: false, error: '현재 비밀번호가 올바르지 않습니다.' };

  const hashed = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({
    where: { id: session.user.id },
    data: { password: hashed },
  });

  await signOut({ redirectTo: '/auth/login' });
  return { success: true };
}
