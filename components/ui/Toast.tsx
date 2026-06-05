'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';

export type ToastType = 'success' | 'error';

interface ToastState {
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const TOAST_STYLES: Record<ToastType, { bg: string; icon: string }> = {
  success: { bg: 'bg-green-600', icon: 'check_circle' },
  error:   { bg: 'bg-error',     icon: 'error'        },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState>({ message: '', type: 'success' });
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ message, type });
    setVisible(true);
    timerRef.current = setTimeout(() => setVisible(false), 2000);
  }, []);

  const { bg, icon } = TOAST_STYLES[toast.type];

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className={[
          'fixed bottom-24 right-4 md:bottom-8 md:right-8 z-[9999]',
          'flex items-center gap-3',
          bg,
          'text-white',
          'px-4 py-3 rounded-xl',
          'shadow-[0px_8px_30px_rgba(0,0,0,0.2)]',
          'transition-all duration-300 ease-out',
          visible
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-2 pointer-events-none',
        ].join(' ')}
      >
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
        <span className="text-label-md whitespace-nowrap">{toast.message}</span>
      </div>
    </ToastContext.Provider>
  );
}
