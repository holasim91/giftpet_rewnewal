'use client';

import { useOptimistic, useState, useTransition } from 'react';
import {
  removeFromCart,
  removeSelectedFromCart,
  updateCartQuantity,
  type CartItemWithProduct,
} from '@/actions/cart';
import { useToast } from '@/components/ui/Toast';
import { SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from '@/lib/constants';

export type PendingDelete =
  | { type: 'single'; cartId: string }
  | { type: 'selected'; count: number };

export function useCart(initialItems: CartItemWithProduct[]) {
  const [items, setItems] = useState(initialItems);
  const [optimisticItems, addOptimistic] = useOptimistic(
    items,
    (state, { cartId, newQty }: { cartId: string; newQty: number }) =>
      state.map((i) => (i.id === cartId ? { ...i, quantity: newQty } : i)),
  );
  const [checked, setChecked] = useState<Set<string>>(
    new Set(initialItems.filter((i) => i.product.isActive).map((i) => i.id)),
  );
  const [, startTransition] = useTransition();
  const [quantityPendingIds, setQuantityPendingIds] = useState<Set<string>>(new Set());
  const [deletePendingIds, setDeletePendingIds] = useState<Set<string>>(new Set());
  const [isSelectedDeleting, setIsSelectedDeleting] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null);
  const [stockAlertOpen, setStockAlertOpen] = useState(false);
  const { showToast } = useToast();

  const activeItems = optimisticItems.filter((i) => i.product.isActive);
  const selectedItems = optimisticItems.filter((i) => checked.has(i.id));
  const subtotal = selectedItems.reduce(
    (sum, i) => sum + (i.product.discountPrice ?? i.product.price) * i.quantity,
    0,
  );
  const discount = selectedItems.reduce(
    (sum, i) =>
      i.product.discountPrice
        ? sum + (i.product.price - i.product.discountPrice) * i.quantity
        : sum,
    0,
  );
  const shippingFee = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shippingFee;
  const allChecked = activeItems.length > 0 && checked.size === activeItems.length;

  const toggleAll = (v: boolean) =>
    setChecked(v ? new Set(activeItems.map((i) => i.id)) : new Set());

  const toggleOne = (id: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const handleRemove = (cartId: string) => {
    setPendingDelete({ type: 'single', cartId });
  };

  const handleRemoveSelected = () => {
    if (checked.size === 0) return;
    setPendingDelete({ type: 'selected', count: checked.size });
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    if (pendingDelete.type === 'single') {
      const { cartId } = pendingDelete;
      setPendingDelete(null);
      setDeletePendingIds((prev) => new Set(prev).add(cartId));
      void (async () => {
        try {
          await removeFromCart(cartId);
          setItems((prev) => prev.filter((i) => i.id !== cartId));
          setChecked((prev) => {
            const next = new Set(prev);
            next.delete(cartId);
            return next;
          });
          showToast('상품이 삭제되었습니다', 'success');
        } finally {
          setDeletePendingIds((prev) => {
            const next = new Set(prev);
            next.delete(cartId);
            return next;
          });
        }
      })();
    } else {
      const ids = Array.from(checked);
      setPendingDelete(null);
      setIsSelectedDeleting(true);
      void (async () => {
        try {
          await removeSelectedFromCart(ids);
          setItems((prev) => prev.filter((i) => !ids.includes(i.id)));
          setChecked(new Set());
          showToast('선택한 상품이 삭제되었습니다', 'success');
        } finally {
          setIsSelectedDeleting(false);
        }
      })();
    }
  };

  const handleQuantity = (cartId: string, newQty: number) => {
    if (newQty < 1) return;
    const stock = items.find((i) => i.id === cartId)?.product.stock ?? Infinity;
    if (newQty > stock) {
      setStockAlertOpen(true);
      return;
    }
    setQuantityPendingIds((prev) => new Set(prev).add(cartId));
    startTransition(async () => {
      addOptimistic({ cartId, newQty });
      const result = await updateCartQuantity(cartId, newQty);
      if (result.success) {
        setItems((prev) =>
          prev.map((i) => (i.id === cartId ? { ...i, quantity: newQty } : i)),
        );
      }
      setQuantityPendingIds((prev) => {
        const next = new Set(prev);
        next.delete(cartId);
        return next;
      });
    });
  };

  return {
    optimisticItems,
    checked,
    quantityPendingIds,
    deletePendingIds,
    isSelectedDeleting,
    pendingDelete,
    stockAlertOpen,
    activeItems,
    subtotal,
    discount,
    shippingFee,
    total,
    allChecked,
    toggleAll,
    toggleOne,
    handleRemove,
    handleRemoveSelected,
    confirmDelete,
    handleQuantity,
    cancelDelete: () => setPendingDelete(null),
    closeStockAlert: () => setStockAlertOpen(false),
  };
}

export type CartState = ReturnType<typeof useCart>;
