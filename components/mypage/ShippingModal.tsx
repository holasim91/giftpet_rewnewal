'use client';

import { useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { addShippingAddress, updateShippingAddress, setDefaultAddress } from '@/actions/shipping';
import { useToast } from '@/components/ui/Toast';
import type { ShippingAddress } from '@/types';

interface DaumPostcodeData {
  zonecode: string;
  roadAddress: string;
  autoRoadAddress: string;
  jibunAddress: string;
  autoJibunAddress: string;
}

declare global {
  interface Window {
    daum: {
      Postcode: new (options: {
        oncomplete: (data: DaumPostcodeData) => void;
      }) => { open: () => void };
    };
  }
}

type FormValues = {
  recipientName: string;
  phone: string;
  zipCode: string;
  address: string;
  addressDetail: string;
  isDefault: boolean;
};

interface Props {
  isOpen: boolean;
  editTarget: ShippingAddress | null;
  onClose: () => void;
}

export default function ShippingModal({ isOpen, editTarget, onClose }: Props) {
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const isEdit = editTarget !== null;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      recipientName: '',
      phone: '',
      zipCode: '',
      address: '',
      addressDetail: '',
      isDefault: false,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        recipientName: editTarget?.recipientName ?? '',
        phone: editTarget?.phone ?? '',
        zipCode: editTarget?.zipCode ?? '',
        address: editTarget?.address ?? '',
        addressDetail: editTarget?.addressDetail ?? '',
        isDefault: editTarget?.isDefault ?? false,
      });
    }
  }, [isOpen, editTarget, reset]);

  function openPostcode() {
    new window.daum.Postcode({
      oncomplete(data) {
        const road = data.roadAddress || data.autoRoadAddress;
        setValue('zipCode', data.zonecode);
        setValue('address', road || data.jibunAddress || data.autoJibunAddress);
      },
    }).open();
  }

  function onSubmit(values: FormValues) {
    const { isDefault, ...addressData } = values;
    startTransition(async () => {
      if (isEdit) {
        const result = await updateShippingAddress(editTarget.id, addressData);
        if (!result.success) { showToast(result.error, 'error'); return; }
        if (isDefault) {
          const defResult = await setDefaultAddress(editTarget.id);
          if (!defResult.success) { showToast(defResult.error, 'error'); return; }
        }
      } else {
        const result = await addShippingAddress(addressData);
        if (!result.success) { showToast(result.error, 'error'); return; }
        if (isDefault && result.data) {
          const defResult = await setDefaultAddress(result.data.id);
          if (!defResult.success) { showToast(defResult.error, 'error'); return; }
        }
      }
      showToast(isEdit ? '배송지가 수정되었습니다.' : '배송지가 추가되었습니다.', 'success');
      onClose();
    });
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-surface-container-lowest rounded-xl p-6 md:p-8 w-full max-w-lg mx-4 shadow-[0px_8px_30px_rgba(0,0,0,0.15)] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-headline-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">local_shipping</span>
            {isEdit ? '배송지 수정' : '배송지 추가'}
          </h3>
          <button
            onClick={onClose}
            className="text-secondary hover:text-on-surface transition-colors"
            aria-label="닫기"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 수령인 이름 */}
          <div>
            <label className="block text-label-sm text-secondary mb-2">수령인 이름</label>
            <input
              type="text"
              {...register('recipientName', { required: '수령인 이름을 입력해주세요.' })}
              placeholder="홍길동"
              className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-body-md"
            />
            {errors.recipientName && (
              <p className="text-label-sm text-error mt-1.5">{errors.recipientName.message}</p>
            )}
          </div>

          {/* 연락처 */}
          <div>
            <label className="block text-label-sm text-secondary mb-2">연락처</label>
            {(() => {
              const phoneField = register('phone', {
                required: '연락처를 입력해주세요.',
                minLength: { value: 9, message: '올바른 전화번호를 입력해주세요.' },
                maxLength: { value: 11, message: '전화번호는 최대 11자리입니다.' },
                pattern: { value: /^\d+$/, message: '숫자만 입력 가능합니다.' },
              });
              return (
                <input
                  type="tel"
                  {...phoneField}
                  maxLength={11}
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 11);
                    phoneField.onChange(e);
                  }}
                  placeholder="01000000000"
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-body-md"
                />
              );
            })()}
            {errors.phone && (
              <p className="text-label-sm text-error mt-1.5">{errors.phone.message}</p>
            )}
          </div>

          {/* 우편번호 + 기본주소 */}
          <div>
            <label className="block text-label-sm text-secondary mb-2">주소</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                {...register('zipCode', { required: true })}
                placeholder="우편번호"
                readOnly
                className="w-32 shrink-0 px-4 py-3 bg-surface-container border border-outline-variant rounded-lg text-body-md text-secondary cursor-not-allowed"
              />
              <button
                type="button"
                onClick={openPostcode}
                className="px-4 py-3 border border-primary text-primary text-label-md rounded-lg hover:bg-primary-fixed/40 transition-colors whitespace-nowrap"
              >
                우편번호 찾기
              </button>
            </div>
            <input
              type="text"
              {...register('address', { required: true })}
              placeholder="기본주소"
              readOnly
              className="w-full px-4 py-3 bg-surface-container border border-outline-variant rounded-lg text-body-md text-secondary cursor-not-allowed"
            />
            {(errors.zipCode || errors.address) && (
              <p className="text-label-sm text-error mt-1.5">우편번호 찾기를 이용해주세요.</p>
            )}
          </div>

          {/* 상세주소 */}
          <div>
            <label className="block text-label-sm text-secondary mb-2">상세주소 (선택)</label>
            <input
              type="text"
              {...register('addressDetail')}
              placeholder="동/호수, 층 등"
              className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-body-md"
            />
          </div>

          {/* 기본 배송지 체크박스 */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register('isDefault')}
              className="w-4 h-4 accent-primary"
            />
            <span className="text-body-md text-on-surface">기본 배송지로 설정</span>
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="flex-1 py-3 border border-outline-variant text-secondary text-label-md rounded-lg hover:bg-surface-container transition-colors disabled:opacity-60"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 py-3 bg-primary text-on-primary text-label-md rounded-lg hover:bg-surface-tint active:scale-95 transition-all disabled:opacity-60"
            >
              {isPending ? '저장 중...' : isEdit ? '수정하기' : '추가하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
