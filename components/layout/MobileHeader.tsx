'use client';

import { useState } from 'react';
import Link from 'next/link';
import MobileDrawer from '@/components/layout/MobileDrawer';

export default function MobileHeader() {
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
              <button
                type="button"
                aria-label="Wishlist"
                className="hover:text-primary transition-colors duration-200 ease-out focus:outline-none"
              >
                <span className="material-symbols-outlined">favorite</span>
              </button>
              <button
                type="button"
                aria-label="Shopping cart"
                className="hover:text-primary transition-colors duration-200 ease-out focus:outline-none relative"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                <span className="absolute -top-1 -right-1 bg-primary-container text-on-primary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  2
                </span>
              </button>
            </div>
          </div>

          {/* Row 2: Search Bar */}
          <div className="w-full relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
              search
            </span>
            <input
              type="search"
              placeholder="Search for treats, beds..."
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-10 pr-4 py-2 text-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors"
            />
          </div>

        </div>
      </header>

      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
