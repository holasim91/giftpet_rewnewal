import Link from 'next/link';

interface ComingSoonProps {
  /** 어떤 페이지인지 표시할 선택적 레이블 (예: "강아지 사료") */
  pageLabel?: string;
}

export default function ComingSoon({ pageLabel }: ComingSoonProps) {
  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-margin-mobile text-center">

      {/* 아이콘 */}
      <span className="material-symbols-outlined text-[96px] text-surface-container-high mb-6 select-none">
        construction
      </span>

      {/* 페이지 레이블 (선택) */}
      {pageLabel && (
        <p className="text-label-md text-tertiary tracking-wider mb-3 uppercase">
          {pageLabel}
        </p>
      )}

      {/* 타이틀 */}
      <h1 className="text-headline-md text-on-surface mb-3">
        준비 중인 페이지입니다
      </h1>

      {/* 설명 */}
      <p className="text-body-md text-on-surface-variant mb-8 max-w-xs leading-relaxed">
        곧 새로운 서비스로 찾아뵐게요.
        <br />
        조금만 기다려주세요.
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
