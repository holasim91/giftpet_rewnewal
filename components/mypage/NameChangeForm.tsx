'use client';

import { useState, useTransition } from 'react';
import { updateUserName } from '@/actions/user';
import { useToast } from '@/components/ui/Toast';

interface Props {
  initialName: string;
}

export default function NameChangeForm({ initialName }: Props) {
  const { showToast } = useToast();
  const [nameValue, setNameValue] = useState(initialName);
  const [isNamePending, startNameTransition] = useTransition();

  function handleNameSubmit(e: React.FormEvent) {
    e.preventDefault();
    startNameTransition(async () => {
      const result = await updateUserName(nameValue);
      if (!result.success) {
        showToast(result.error, 'error');
      } else {
        showToast('이름이 변경되었습니다.', 'success');
      }
    });
  }

  return (
    <div className="flex-1 bg-surface-container-lowest rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container">
      <h2 className="text-headline-sm mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">settings</span>
        회원 정보 수정
      </h2>
      <form onSubmit={handleNameSubmit} className="space-y-4">
        <div>
          <label className="block text-label-sm text-secondary mb-2">이름</label>
          <input
            type="text"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-body-md"
          />
        </div>
        <button
          type="submit"
          disabled={isNamePending}
          className="w-full bg-primary text-on-primary text-label-md py-3 rounded-lg hover:bg-surface-tint active:scale-95 transition-all disabled:opacity-60"
        >
          {isNamePending ? '변경 중...' : '이름 변경하기'}
        </button>
      </form>
    </div>
  );
}
