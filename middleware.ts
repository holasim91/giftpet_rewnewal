import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Supabase Auth 토큰 갱신 프록시.
//
// Next.js Server Component는 쿠키를 쓸 수 없으므로,
// 만료된 Access Token을 Refresh Token으로 갱신하는 작업을
// middleware에서 수행하고 Set-Cookie 헤더로 클라이언트에 전달한다.
//
// 주의: createServerClient 호출과 getClaims() 사이에
//       다른 로직을 끼워 넣으면 세션이 랜덤하게 끊기는 문제가 생길 수 있다.
export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // request에 쿠키를 먼저 반영한 뒤 response에도 Set-Cookie
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // getClaims(): getSession() 보다 안전 — 서버에서 JWT를 직접 검증한다.
  // 이 호출이 만료된 토큰을 자동으로 갱신하고 쿠키를 업데이트한다.
  await supabase.auth.getClaims();

  return supabaseResponse;
}

export const config = {
  matcher: [
    // 정적 파일·이미지·Next.js 내부 경로는 제외
    '/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
