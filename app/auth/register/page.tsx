'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerUser } from '@/actions/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!agreed) {
      setError('이용약관에 동의해주세요.');
      return;
    }

    startTransition(async () => {
      const result = await registerUser(email, password, name);
      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/auth/login');
      }
    });
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-margin-mobile py-10">
      <div className="w-full max-w-sm bg-surface-container-lowest rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] p-8">
        {/* 로고 */}
        <Link href="/" className="block text-center mb-8">
          <span className="text-headline-md text-primary font-bold tracking-tight">
            GIFT PET
          </span>
        </Link>

        <h1 className="text-headline-sm text-on-surface mb-6 text-center">
          회원가입
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-label-md text-on-surface">
              이름
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              placeholder="이름을 입력하세요"
              className="bg-surface-container rounded-lg px-4 py-3 text-body-md text-on-surface placeholder:text-tertiary outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-label-md text-on-surface">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="example@email.com"
              className="bg-surface-container rounded-lg px-4 py-3 text-body-md text-on-surface placeholder:text-tertiary outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-label-md text-on-surface"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="8자 이상 입력하세요"
              className="bg-surface-container rounded-lg px-4 py-3 text-body-md text-on-surface placeholder:text-tertiary outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {/* 약관 동의 */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 rounded border-outline-variant accent-primary-container"
            />
            <span className="text-label-md text-on-surface-variant">
              <Link
                href="#"
                className="text-primary hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                이용약관
              </Link>
              {' 및 '}
              <Link
                href="#"
                className="text-primary hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                개인정보처리방침
              </Link>
              에 동의합니다
            </span>
          </label>

          {error && (
            <p className="text-label-sm text-error">{error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="mt-2 w-full bg-primary-container text-on-primary text-label-md rounded-full py-3 transition-opacity disabled:opacity-50"
          >
            {isPending ? '처리 중...' : '회원가입'}
          </button>
        </form>

        <p className="mt-6 text-center text-label-md text-on-surface-variant">
          이미 계정이 있으신가요?{' '}
          <Link href="/auth/login" className="text-primary hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
