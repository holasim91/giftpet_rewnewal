'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

const ANIMAL_ITEMS: NavItem[] = [
  {
    label: '강아지',
    href: '/shop/dog',
    children: [
      { label: '사료', href: '/shop/dog/food' },
      { label: '간식', href: '/shop/dog/treats' },
      { label: '용품', href: '/shop/dog/supplies' },
      { label: '영양제', href: '/shop/dog/supplements' },
    ],
  },
  {
    label: '고양이',
    href: '/shop/cat',
    children: [
      { label: '간식', href: '/shop/cat/treats' },
      { label: '용품', href: '/shop/cat/supplies' },
    ],
  },
];

const TYPE_ITEMS: NavItem[] = [
  { label: '사료', href: '/shop/food' },
  { label: '간식', href: '/shop/treats' },
  { label: '용품', href: '/shop/supplies' },
  { label: '영양제', href: '/shop/supplements' },
];

export default function CategorySidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;
  const isParentActive = (item: NavItem) =>
    pathname === item.href || (item.children?.some((c) => pathname === c.href) ?? false);

  return (
    <nav className="w-52 flex-shrink-0">
      <Link
        href="/shop"
        className={`block px-3 py-2 rounded-lg text-label-md transition-colors mb-5 ${
          pathname === '/shop'
            ? 'text-primary font-bold bg-primary-fixed/40'
            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
        }`}
      >
        모든 상품
      </Link>

      <p className="text-label-sm text-tertiary uppercase tracking-widest px-3 mb-2">동물별</p>
      <ul className="mb-6 space-y-0.5">
        {ANIMAL_ITEMS.map((item) => {
          const parentActive = isParentActive(item);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-lg text-label-md transition-colors ${
                  isActive(item.href)
                    ? 'text-primary font-bold bg-primary-fixed/40'
                    : parentActive
                    ? 'text-on-surface font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                {item.label}
              </Link>
              {parentActive && item.children && (
                <ul className="ml-3 mt-0.5 space-y-0.5 border-l-2 border-outline-variant/50 pl-3">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className={`block px-2 py-1.5 rounded-lg text-body-md transition-colors ${
                          isActive(child.href)
                            ? 'text-primary font-semibold bg-primary-fixed/30'
                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                        }`}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      <p className="text-label-sm text-tertiary uppercase tracking-widest px-3 mb-2">상품 유형</p>
      <ul className="space-y-0.5">
        {TYPE_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`block px-3 py-2 rounded-lg text-label-md transition-colors ${
                isActive(item.href)
                  ? 'text-primary font-bold bg-primary-fixed/40'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
