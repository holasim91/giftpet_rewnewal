'use client';

import { createContext, useCallback, useContext, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toggleWishlist } from '@/actions/wishlist';
import { useToast } from '@/components/ui/Toast';

interface WishlistContextValue {
  isWishlisted: (productId: string) => boolean;
  toggle: (productId: string) => void;
  removeId: (productId: string) => void;
  isLoggedIn: boolean;
}

const WishlistContext = createContext<WishlistContextValue>({
  isWishlisted: () => false,
  toggle: () => {},
  removeId: () => {},
  isLoggedIn: false,
});

export function useWishlist() {
  return useContext(WishlistContext);
}

export default function WishlistProvider({
  initialIds,
  isLoggedIn,
  children,
}: {
  initialIds: string[];
  isLoggedIn: boolean;
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
      if (!isLoggedIn) {
        router.push('/auth/login');
        return;
      }

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
          setIds((prev) => {
            const next = new Set(prev);
            if (wasWishlisted) next.add(productId);
            else next.delete(productId);
            return next;
          });
          return;
        }
        showToast(
          result.data?.wishlisted ? '찜 목록에 추가했어요' : '찜을 해제했어요',
          'success',
        );
      });
    },
    [ids, isLoggedIn, router, showToast],
  );

  return (
    <WishlistContext.Provider value={{ isWishlisted, toggle, removeId, isLoggedIn }}>
      {children}
    </WishlistContext.Provider>
  );
}
