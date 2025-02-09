import { useState } from 'react';

export function useWindowMaximize() {
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMaximize = (callback?: () => void) => {
    setIsMaximized(!isMaximized);
    if (callback) {
      callback();
    }
  };

  return {
    isMaximized,
    handleMaximize
  };
} 