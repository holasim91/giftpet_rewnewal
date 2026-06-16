'use client';

import { createContext, useCallback, useContext, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toggleWishlist } from '@/actions/wishlist';
import { useToast } from '@/components/ui/Toast';

interface WishlistContextValue {
  isWishlisted: (productId: string) => boolean;
  toggle: (productId: string) => void;
  removeId: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextValue>({
  isWishlisted: () => false,
  toggle: () => {},
  removeId: () => {},
});

export function useWishlist() {
  return useContext(WishlistContext);
}

export default function WishlistProvider({
  initialIds,
  children,
}: {
  initialIds: string[];
  children: React.ReactNode;
}) {
  const [ids, setIds] = useState<Set<string>>(() => new Set(initialIds));
  const [, startTransition] = useTransition();
  const router = useRouter();
  const { showToast } = useToast();

  const isWishlisted = useCallback((productId: string) => ids.has(productId), [ids]);

  const removeId = useCallback((productId: string) => {
    setIds((prev) => {
      const next = new Set(prev);
      next.delete(productId);
      return next;
    });
  }, []);

  const toggle = useCallback(
    (productId: string) => {
      const wasWishlisted = ids.has(productId);

      // Optimistic: 클릭 즉시 상태 반영
      setIds((prev) => {
        const next = new Set(prev);
        if (wasWishlisted) next.delete(productId);
        else next.add(productId);
        return next;
      });

      startTransition(async () => {
        const result = await toggleWishlist(productId);
        if (!result.success) {
          // 실패 시 롤백 후 비로그인이면 로그인 페이지로
          setIds((prev) => {
            const next = new Set(prev);
            if (wasWishlisted) next.add(productId);
            else next.delete(productId);
            return next;
          });
          router.push('/auth/login');
          return;
        }
        showToast(
          result.data?.wishlisted ? '찜 목록에 추가했어요' : '찜을 해제했어요',
          'success',
        );
      });
    },
    [ids, router, showToast],
  );

  return (
    <WishlistContext.Provider value={{ isWishlisted, toggle, removeId }}>
      {children}
    </WishlistContext.Provider>
  );
}
