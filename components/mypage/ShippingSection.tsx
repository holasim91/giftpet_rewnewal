'use client';

import { useState, useTransition } from 'react';
import { deleteShippingAddress, setDefaultAddress } from '@/actions/shipping';
import { useToast } from '@/components/ui/Toast';
import ConfirmModal from '@/components/ui/ConfirmModal';
import ShippingModal from './ShippingModal';
import { formatPhone } from '@/lib/format';
import type { ShippingAddress } from '@/types';

interface Props {
  initialAddresses: ShippingAddress[];
}

export default function ShippingSection({ initialAddresses }: Props) {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<ShippingAddress | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ShippingAddress | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const atMax = initialAddresses.length >= 3;

  function openAdd() {
    setEditTarget(null);
    setIsModalOpen(true);
  }

  function openEdit(address: ShippingAddress) {
    setEditTarget(address);
    setIsModalOpen(true);
  }

  function handleDelete() {
    if (!deleteTarget) return;
    startTransition(async () => {
      const result = await deleteShippingAddress(deleteTarget.id);
      if (!result.success) {
        showToast(result.error, 'error');
      } else {
        showToast('배송지가 삭제되었습니다.', 'success');
      }
      setIsDeleteOpen(false);
      // deleteTarget은 초기화하지 않음 — 모달 페이드아웃 중 수령인 이름 유지
    });
  }

  function handleSetDefault(id: string) {
    startTransition(async () => {
      const result = await setDefaultAddress(id);
      if (!result.success) {
        showToast(result.error, 'error');
      } else {
        showToast('기본 배송지가 변경되었습니다.', 'success');
      }
    });
  }

  return (
    <>
      <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container">
        {/* 헤더 */}
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-headline-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">local_shipping</span>
            배송지 관리
          </h2>
          <div className="flex flex-col items-end gap-1">
            <button
              onClick={openAdd}
              disabled={atMax}
              className="flex items-center gap-1 px-4 py-2 bg-primary text-on-primary text-label-md rounded-lg hover:bg-surface-tint active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              배송지 추가
            </button>
            {atMax && (
              <p className="text-label-sm text-error">최대 3개까지 등록 가능합니다.</p>
            )}
          </div>
        </div>

        {/* 목록 */}
        {initialAddresses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <span className="material-symbols-outlined text-[48px] mb-3 text-tertiary">
              local_shipping
            </span>
            <p className="text-body-md text-secondary">등록된 배송지가 없습니다.</p>
            <p className="text-label-sm text-tertiary mt-1">배송지를 추가해보세요.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {initialAddresses.map((addr) => (
              <li
                key={addr.id}
                className={`rounded-lg border p-4 transition-colors ${
                  addr.isDefault
                    ? 'border-primary/40 bg-primary-fixed/20'
                    : 'border-outline-variant bg-surface-container-low'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  {/* 주소 정보 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-label-md text-on-surface font-semibold">
                        {addr.recipientName}
                      </span>
                      {addr.isDefault && (
                        <span className="px-2 py-0.5 bg-primary text-on-primary text-label-sm rounded shrink-0">
                          기본
                        </span>
                      )}
                    </div>
                    <p className="text-body-md text-secondary">{formatPhone(addr.phone)}</p>
                    <p className="text-body-md text-on-surface mt-1">
                      ({addr.zipCode}) {addr.address}
                    </p>
                    {addr.addressDetail && (
                      <p className="text-body-md text-on-surface">{addr.addressDetail}</p>
                    )}
                    {!addr.isDefault && (
                      <button
                        onClick={() => handleSetDefault(addr.id)}
                        disabled={isPending}
                        className="mt-2 text-label-sm text-primary hover:underline disabled:opacity-60"
                      >
                        기본 배송지로 설정
                      </button>
                    )}
                  </div>

                  {/* 수정/삭제 버튼 */}
                  <div className="flex flex-col gap-1 shrink-0">
                    <button
                      onClick={() => openEdit(addr)}
                      className="px-3 py-1.5 border border-outline-variant text-secondary text-label-sm rounded-lg hover:bg-surface-container transition-colors"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => { setDeleteTarget(addr); setIsDeleteOpen(true); }}
                      className="px-3 py-1.5 border border-error/40 text-error text-label-sm rounded-lg hover:bg-error/5 transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ShippingModal
        isOpen={isModalOpen}
        editTarget={editTarget}
        onClose={() => setIsModalOpen(false)}
      />

      <ConfirmModal
        isOpen={isDeleteOpen}
        message={`'${deleteTarget?.recipientName}' 배송지를 삭제하시겠습니까?`}
        isPending={isPending}
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </>
  );
}
