'use server';

import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function loginUser(
  email: string,
  password: string,
): Promise<{ error?: string }> {
  try {
    await signIn('credentials', { email, password, redirectTo: '/shop' });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: '이메일 또는 비밀번호가 올바르지 않습니다.' };
    }
    // NEXT_REDIRECT는 throw가 정상 동작 — 그대로 re-throw
    throw error;
  }
  return {};
}

export async function logoutUser() {
  await signOut({ redirectTo: '/' });
}

export async function registerUser(
  email: string,
  password: string,
  name: string,
): Promise<{ error?: string }> {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: '이미 사용 중인 이메일입니다.' };
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });

  return {};
}
