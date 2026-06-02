import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'NEXT_PUBLIC_SUPABASE_URL 또는 NEXT_PUBLIC_SUPABASE_ANON_KEY 환경변수가 설정되지 않았습니다.'
  );
}

// ── 브라우저 클라이언트 ──────────────────────────────────
// 공개 익명 키(anon key)를 사용하며 클라이언트 컴포넌트에서 사용 가능.
// Supabase RLS(Row Level Security) 정책으로 접근 범위를 제한한다.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── 서버 전용 관리자 클라이언트 ──────────────────────────
// Service Role Key는 RLS를 우회하므로 Server Actions / Route Handlers 전용.
// 절대 'use client' 컴포넌트나 브라우저에 노출하면 안 된다.
export function createSupabaseAdmin() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY 환경변수가 설정되지 않았습니다.');
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      // 서버 클라이언트는 세션 자동 갱신 불필요
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
