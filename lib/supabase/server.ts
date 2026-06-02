import { createServerClient } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

// ── 서버 컴포넌트 / Server Action용 클라이언트 ──────────────────
// 쿠키를 읽고 쓸 수 있어 인증 세션을 유지한다.
// Server Component에서는 set이 불가능하므로 try/catch로 무시.
// middleware.ts의 프록시가 실제 토큰 갱신을 담당한다.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Server Component에서의 쿠키 쓰기는 middleware가 처리
          }
        },
      },
    },
  );
}

// ── 관리자(Admin) 클라이언트 — 서버 전용 ────────────────────────
// Secret Key는 RLS를 완전히 우회하므로 Server Actions / Route Handlers 전용.
// 브라우저 코드('use client')에 절대 포함하지 말 것 — 자동으로 HTTP 401 반환.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
