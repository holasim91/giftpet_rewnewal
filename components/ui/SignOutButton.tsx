'use client';

import { logoutUser } from '@/actions/auth';

interface SignOutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function SignOutButton({ className, children }: SignOutButtonProps) {
  return (
    <form action={logoutUser}>
      <button type="submit" className={className}>
        {children ?? '로그아웃'}
      </button>
    </form>
  );
}
