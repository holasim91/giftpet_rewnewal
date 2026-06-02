'use client';

import { createBrowserClient } from '@supabase/ssr';

// 브라우저(클라이언트 컴포넌트)에서 사용하는 Supabase 클라이언트.
// Publishable Key는 공개 노출 허용 — Supabase RLS로 접근 범위를 제한한다.
// 함수 형태로 export하여 각 컴포넌트에서 독립적인 인스턴스를 생성한다.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
