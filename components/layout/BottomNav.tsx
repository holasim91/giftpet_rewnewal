// 모바일 전용 하단 고정 네비게이션 (md 이상에서는 숨김)
interface NavItem {
  icon: string;
  label: string;
  active?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { icon: 'home', label: 'Home' },
  { icon: 'search', label: 'Search', active: true },
  { icon: 'person', label: 'My Page' },
  { icon: 'shopping_bag', label: 'Cart' },
];

export default function BottomNav() {
  return (
    <nav className="md:hidden bg-surface-container-lowest shadow-[0px_-4px_20px_rgba(0,0,0,0.05)] rounded-t-xl fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 border-t border-surface-variant">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.label}
          type="button"
          className={`flex flex-col items-center justify-center transition-colors active:scale-90 w-16 ${
            item.active ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          <span className="material-symbols-outlined mb-1">{item.icon}</span>
          <span className="text-label-sm text-[10px]">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
