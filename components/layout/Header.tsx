import Link from 'next/link';

interface NavItem {
  label: string;
  href: string;
  hasMegaMenu?: boolean;
}

interface MegaMenuSection {
  heading: string;
  href: string;
  items: { icon: string; label: string; href: string }[];
}

// '모든 카테고리' hover 시 표시되는 메가메뉴 (2컬럼)
const MEGA_MENU: MegaMenuSection[] = [
  {
    heading: '강아지',
    href: '/shop/dog',
    items: [
      { icon: 'set_meal',      label: '사료',   href: '/shop/dog/food' },
      { icon: 'pet_supplies',  label: '간식',   href: '/shop/dog/treats' },
      { icon: 'home',          label: '용품',   href: '/shop/dog/supplies' },
      { icon: 'healing',       label: '영양제', href: '/shop/dog/supplements' },
    ],
  },
  {
    heading: '고양이',
    href: '/shop/cat',
    items: [
      { icon: 'cruelty_free', label: '간식', href: '/shop/cat/treats' },
      { icon: 'toys',         label: '용품', href: '/shop/cat/supplies' },
    ],
  },
];

// GNB 항목 — '모든 카테고리'만 메가메뉴 트리거
const NAV_ITEMS: NavItem[] = [
  { label: '모든 카테고리', href: '/shop', hasMegaMenu: true },
  { label: '강아지',       href: '/shop/dog' },
  { label: '고양이',       href: '/shop/cat' },
  { label: '사료',         href: '/shop/food' },
  { label: '간식',         href: '/shop/treats' },
  { label: '용품',         href: '/shop/supplies' },
  { label: '영양제',       href: '/shop/supplements' },
];

export default function Header() {
  return (
    <header className="hidden md:block bg-surface border-b border-outline-variant shadow-[0px_4px_20px_rgba(0,0,0,0.05)] sticky top-0 z-50 w-full">
      {/* Inner container — relative 유지 (메가메뉴 절대위치 기준점), group 제거 */}
      <div className="flex flex-col w-full px-margin-desktop max-w-container mx-auto space-y-4 py-4 relative">

        {/* Row 1: Logo + Utility Icons */}
        <div className="flex justify-between items-center w-full">
          <div className="w-1/3" />
          <div className="w-1/3 flex justify-center">
            <Link href="/" className="text-headline-xl text-on-surface tracking-tighter">
              GIFT PET
            </Link>
          </div>
          <div className="w-1/3 flex justify-end items-center space-x-6 text-on-surface">
            <button type="button" aria-label="person" className="hover:text-primary transition-colors duration-200 ease-out">
              <span className="material-symbols-outlined text-[28px]">person</span>
            </button>
            <button type="button" aria-label="favorite" className="hover:text-primary transition-colors duration-200 ease-out">
              <span className="material-symbols-outlined text-[28px]">favorite</span>
            </button>
            <button type="button" aria-label="shopping_cart" className="hover:text-primary transition-colors duration-200 ease-out relative">
              <span className="material-symbols-outlined text-[28px]">shopping_cart</span>
              <span className="absolute -top-2 -right-2 bg-primary-container text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>

        {/* Row 2: Search Bar */}
        <div className="flex justify-center w-full">
          <div className="relative w-full max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-tertiary">search</span>
            <input
              type="search"
              placeholder="Search"
              className="w-full bg-surface-container rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary border-none text-body-md transition-shadow"
            />
          </div>
        </div>

        {/* Row 3: GNB — self-center로 텍스트 너비에 맞게 축소, relative로 메가메뉴 기준점 */}
        <nav className="flex items-center space-x-8 self-center relative">
          {NAV_ITEMS.map((item) =>
            item.hasMegaMenu ? (
              // '모든 카테고리' — group만, relative 없음 → 메가메뉴는 inner container(relative) 기준으로 포지셔닝
              <div key={item.label} className="group">
                <Link
                  href={item.href}
                  className="block text-label-md tracking-wider uppercase text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 ease-out"
                >
                  {item.label}
                </Link>

                {/* 메가메뉴 — nav 텍스트 너비 기준, 헤더 최하단 정렬 (inner container pb-4=1rem 오프셋) */}
                <div className="absolute top-[calc(100%+1rem)] left-0 w-full bg-white shadow-[0px_10px_30px_rgba(0,0,0,0.1)] rounded-b-xl border-t border-surface-container opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-40 origin-top pt-6 pb-8">
                  <div className="grid grid-cols-2 gap-8 px-8">
                    {MEGA_MENU.map((section) => (
                      <div key={section.heading}>
                        <Link
                          href={section.href}
                          className="block text-headline-sm text-on-surface mb-4 hover:text-primary transition-colors"
                        >
                          {section.heading}
                        </Link>
                        <ul className="space-y-3">
                          {section.items.map((sub) => (
                            <li key={sub.label}>
                              <Link
                                href={sub.href}
                                className="flex items-center text-body-md text-on-surface-variant hover:text-primary transition-colors"
                              >
                                <span className="material-symbols-outlined mr-2 text-tertiary">
                                  {sub.icon}
                                </span>
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="text-label-md tracking-wider uppercase text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 ease-out"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

      </div>
    </header>
  );
}
