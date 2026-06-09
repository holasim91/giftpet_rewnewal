import { auth } from '@/auth';
import { getCartCount } from '@/actions/cart';
import MobileHeaderClient from '@/components/layout/MobileHeaderClient';

// 모든 페이지에서 <MobileHeader />로 임포트되는 서버 래퍼.
// auth() 한 번만 호출하고 session을 클라이언트 컴포넌트로 전달한다.
export default async function MobileHeader() {
  const [session, cartCount] = await Promise.all([auth(), getCartCount()]);
  return <MobileHeaderClient session={session} cartCount={cartCount} />;
}
