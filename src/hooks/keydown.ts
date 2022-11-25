import { useEffect } from 'react';

export const useKeyDown = (key: string, action: () => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === key) {
        action();
      }
    };
    console.log(key, action.toString());
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      console.log('remove', key, action.toString());
      document.removeEventListener('keydown', handleKeyDown);
    };
  });
};
