'use server';

import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';
import { prisma } from '@/lib/prisma';
import type { ActionResult } from '@/types';

export async function loginUser(
  email: string,
  password: string,
): Promise<ActionResult> {
  try {
    await signIn('credentials', { email, password, redirectTo: '/shop' });
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: '이메일 또는 비밀번호가 올바르지 않습니다.' };
    }
    // NEXT_REDIRECT는 throw가 정상 동작 — 그대로 re-throw
    throw error;
  }
  return { success: true };
}

export async function logoutUser() {
  await signOut({ redirectTo: '/' });
}

export async function registerUser(
  email: string,
  password: string,
  name: string,
): Promise<ActionResult> {
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { success: false, error: '이미 사용 중인 이메일입니다.' };
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    return { success: true };
  } catch {
    return { success: false, error: '오류가 발생했습니다.' };
  }
}
