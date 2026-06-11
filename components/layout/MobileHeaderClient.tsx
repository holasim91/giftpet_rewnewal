'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Session } from 'next-auth';
import MobileDrawer from '@/components/layout/MobileDrawer';

interface MobileHeaderProps {
  session: Session | null;
  cartCount: number;
  wishlistCount: number;
}

export default function MobileHeaderClient({
  session,
  cartCount,
  wishlistCount,
}: MobileHeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="md:hidden bg-surface sticky top-0 z-30 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border-b border-outline-variant w-full">
        <div className="flex flex-col w-full px-margin-mobile mx-auto py-4 space-y-4">

          {/* Row 1: Hamburger | Logo | Icons */}
          <div className="flex items-center justify-between w-full">
            <button
              type="button"
              aria-label="Open menu"
              className="text-on-surface-variant focus:outline-none p-1"
              onClick={() => setDrawerOpen(true)}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>

            <Link
              href="/"
              className="text-headline-sm font-bold tracking-tighter text-on-surface mx-auto text-center"
            >
              GIFT PET
            </Link>

            <div className="flex items-center space-x-3 text-on-surface-variant">
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="hover:text-primary transition-colors duration-200 ease-out focus:outline-none relative"
              >
                <span className="material-symbols-outlined">favorite</span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-container text-on-primary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                href="/cart"
                aria-label="장바구니"
                className="hover:text-primary transition-colors duration-200 ease-out focus:outline-none relative"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-container text-on-primary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* TODO: 검색 기능 구현 예정
              검색창 UI는 구현되어 있으나 기능 미구현으로 임시 비활성화 */}
          {/* <div className="w-full relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
              search
            </span>
            <input
              type="search"
              placeholder="Search for treats, beds..."
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-10 pr-4 py-2 text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors"
            />
          </div> */}

        </div>
      </header>

      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} session={session} />
    </>
  );
}
