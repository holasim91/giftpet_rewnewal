import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-margin-mobile text-center">

      {/* 아이콘 */}
      <span className="material-symbols-outlined text-[96px] text-surface-container-high mb-6 select-none">
        search_off
      </span>

      {/* 에러 코드 */}
      <p className="text-label-md text-tertiary tracking-wider mb-3">404</p>

      {/* 타이틀 */}
      <h1 className="text-headline-md text-on-surface mb-3">
        길을 잃으셨나요?
      </h1>

      {/* 설명 */}
      <p className="text-body-md text-on-surface-variant mb-8 max-w-xs leading-relaxed">
        요청하신 페이지를 찾을 수 없습니다.
        <br />
        주소를 다시 확인하거나 홈으로 돌아가세요.
      </p>

      {/* 홈으로 버튼 */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-primary-container text-on-primary text-label-md px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
      >
        <span className="material-symbols-outlined text-[18px]">home</span>
        홈으로 돌아가기
      </Link>

    </main>
  );
}
