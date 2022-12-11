import React, { createContext, useContext, useCallback, useState, useRef } from 'react';
import { ConfirmModal } from 'components/UI/ConfirmModal';
import { TFnVoid } from 'types';

interface IAppContext {
  confirm: (fn: TFnVoid) => void;
  closeConfirm: () => void;
}

const AppContext = createContext<IAppContext | undefined>(undefined);

export const useAppContext = () => {
  return useContext(AppContext) as IAppContext;
};

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const onAction = useRef<TFnVoid>(() => {});

  const confirm = useCallback(
    (fn: TFnVoid) => {
      onAction.current = fn;
      setShowConfirm(true);
    },
    [setShowConfirm]
  );

  const closeConfirm = useCallback(() => {
    setShowConfirm(false);
  }, [setShowConfirm]);

  const value = { confirm, closeConfirm };

  return (
    <AppContext.Provider value={value}>
      {children}
      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onAction={onAction.current}
      />
    </AppContext.Provider>
  );
}
