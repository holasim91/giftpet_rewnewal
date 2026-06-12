import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants';

interface Props {
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
}

export default function OrderSummary({ subtotal, discount, shippingFee, total }: Props) {
  return (
    <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] sticky top-32 border border-surface-container-high">
      <h2 className="text-headline-sm font-bold mb-8">주문 요약</h2>
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex justify-between items-center">
          <span className="text-body-md text-secondary">총 상품금액</span>
          <span className="text-body-lg font-bold whitespace-nowrap">{subtotal.toLocaleString()}원</span>
        </div>
        <div className="flex justify-between items-start">
          <div>
            <span className="text-body-md text-secondary">배송비</span>
            {shippingFee > 0 && (
              <p className="text-[10px] text-tertiary mt-1">10만원 이상 결제 시 무료</p>
            )}
            {shippingFee === 0 && subtotal >= FREE_SHIPPING_THRESHOLD && (
              <p className="text-[10px] text-primary mt-1">무료배송 적용!</p>
            )}
          </div>
          <span className="text-body-lg font-bold whitespace-nowrap">
            {shippingFee === 0 && subtotal >= FREE_SHIPPING_THRESHOLD
              ? '무료'
              : `${shippingFee.toLocaleString()}원`}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-body-md text-secondary">할인금액</span>
          <span className="text-body-lg font-bold whitespace-nowrap">
            {discount > 0 ? `-${discount.toLocaleString()}원` : '-0원'}
          </span>
        </div>
      </div>
      <hr className="border-surface-container-highest mb-8" />
      <div className="flex justify-between items-center mb-10">
        <span className="text-headline-sm font-bold whitespace-nowrap">총 결제금액</span>
        <span className="text-headline-md font-bold text-primary whitespace-nowrap">
          {total.toLocaleString()}원
        </span>
      </div>
      <button
        type="button"
        className="w-full bg-primary text-on-primary py-5 rounded-xl font-headline-sm hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20"
      >
        주문하기
      </button>
    </div>
  );
}
