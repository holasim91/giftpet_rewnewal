'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { updateUserPassword } from '@/actions/user';
import ConfirmModal from '@/components/ui/ConfirmModal';

type PwFormValues = {
  currentPw: string;
  newPw: string;
  confirmPw: string;
};

export default function PasswordModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pwError, setPwError] = useState('');
  const [isPwPending, startPwTransition] = useTransition();

  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PwFormValues>({
    defaultValues: { currentPw: '', newPw: '', confirmPw: '' },
  });

  const watchCurrentPw = watch('currentPw');
  const watchNewPw = watch('newPw');
  const watchConfirmPw = watch('confirmPw');

  const hasInput = !!(watchCurrentPw || watchNewPw || watchConfirmPw);
  const showMatchIndicator = watchConfirmPw.length > 0;
  const passwordsMatch = watchNewPw === watchConfirmPw;

  function openModal() {
    reset({ currentPw: '', newPw: '', confirmPw: '' });
    setPwError('');
    setShowCurrentPw(false);
    setShowNewPw(false);
    setShowConfirmPw(false);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setIsConfirmOpen(false);
    reset();
    setPwError('');
    setShowCurrentPw(false);
    setShowNewPw(false);
    setShowConfirmPw(false);
  }

  function requestClose() {
    if (hasInput) {
      setIsConfirmOpen(true);
    } else {
      closeModal();
    }
  }

  function onPwSubmit(data: PwFormValues) {
    setPwError('');
    if (data.newPw !== data.confirmPw) {
      setPwError('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    startPwTransition(async () => {
      const result = await updateUserPassword(data.currentPw, data.newPw, data.confirmPw);
      if (!result.success) {
        setPwError(result.error);
      }
      // 성공 시 서버 액션이 signOut + redirect 처리
    });
  }

  return (
    <>
      {/* 비밀번호 변경 카드 */}
      <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container">
        <h2 className="text-headline-sm mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">lock</span>
          비밀번호 변경
        </h2>
        <button
          onClick={openModal}
          className="w-full border border-primary text-primary text-label-md py-3 rounded-lg hover:bg-primary-fixed/40 active:scale-95 transition-all"
        >
          비밀번호 변경하기
        </button>
      </div>

      {/* 비밀번호 변경 모달 */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={requestClose}
        >
          <div
            className="bg-surface-container-lowest rounded-xl p-6 md:p-8 w-full max-w-md mx-4 shadow-[0px_8px_30px_rgba(0,0,0,0.15)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-headline-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">lock</span>
                비밀번호 변경
              </h3>
              <button
                onClick={requestClose}
                className="text-secondary hover:text-on-surface transition-colors"
                aria-label="닫기"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={rhfHandleSubmit(onPwSubmit)} className="space-y-4">
              {/* 현재 비밀번호 */}
              <div>
                <label className="block text-label-sm text-secondary mb-2">현재 비밀번호</label>
                <div className="relative">
                  <input
                    type={showCurrentPw ? 'text' : 'password'}
                    {...register('currentPw', { required: true })}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-11 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-body-md"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowCurrentPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface transition-colors"
                    aria-label={showCurrentPw ? '비밀번호 숨기기' : '비밀번호 보기'}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showCurrentPw ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* 새 비밀번호 */}
              <div>
                <label className="block text-label-sm text-secondary mb-2">새 비밀번호</label>
                <div className="relative">
                  <input
                    type={showNewPw ? 'text' : 'password'}
                    {...register('newPw', {
                      required: true,
                      minLength: { value: 8, message: '8자 이상 입력해주세요.' },
                    })}
                    placeholder="8자 이상 입력"
                    className="w-full px-4 py-3 pr-11 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-body-md"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowNewPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface transition-colors"
                    aria-label={showNewPw ? '비밀번호 숨기기' : '비밀번호 보기'}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showNewPw ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                {errors.newPw?.message && (
                  <p className="text-label-sm text-error mt-1.5">{errors.newPw.message}</p>
                )}
              </div>

              {/* 새 비밀번호 확인 */}
              <div>
                <label className="block text-label-sm text-secondary mb-2">새 비밀번호 확인</label>
                <div className="relative">
                  <input
                    type={showConfirmPw ? 'text' : 'password'}
                    {...register('confirmPw', { required: true })}
                    placeholder="새 비밀번호 재입력"
                    className="w-full px-4 py-3 pr-11 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-body-md"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowConfirmPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface transition-colors"
                    aria-label={showConfirmPw ? '비밀번호 숨기기' : '비밀번호 보기'}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showConfirmPw ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                {showMatchIndicator && (
                  <p className={`flex items-center gap-1 text-label-sm mt-1.5 ${passwordsMatch ? 'text-green-600' : 'text-error'}`}>
                    <span className="material-symbols-outlined text-[16px]">
                      {passwordsMatch ? 'check_circle' : 'cancel'}
                    </span>
                    {passwordsMatch ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
                  </p>
                )}
              </div>

              {pwError && (
                <p className="text-label-sm text-error">{pwError}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={requestClose}
                  disabled={isPwPending}
                  className="flex-1 py-3 border border-outline-variant text-secondary text-label-md rounded-lg hover:bg-surface-container transition-colors disabled:opacity-60"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={isPwPending}
                  className="flex-1 py-3 bg-primary text-on-primary text-label-md rounded-lg hover:bg-surface-tint active:scale-95 transition-all disabled:opacity-60"
                >
                  {isPwPending ? '변경 중...' : '변경하기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 닫기 확인 모달 (입력값 있을 때 모달 밖/X/취소 클릭 시) */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        message="작성 중인 내용이 있습니다. 닫으시겠습니까?"
        confirmLabel="닫기"
        onConfirm={closeModal}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </>
  );
}
