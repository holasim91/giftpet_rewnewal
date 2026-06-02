// 하위 호환 re-export — 기존 import 경로를 유지하기 위한 래퍼.
// 신규 코드는 직접 아래 경로를 사용하세요:
//   브라우저 컴포넌트 → '@/lib/supabase/client'
//   서버 컴포넌트 / Server Action → '@/lib/supabase/server'

export { createClient } from '@/lib/supabase/client';
export { createAdminClient } from '@/lib/supabase/server';
