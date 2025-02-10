import { useContext } from 'react';
import { WindowContext } from '@/app/_contexts/window-context';

export function useWindow() {
  const context = useContext(WindowContext);
  
  if (!context) {
    throw new Error('useWindow must be used within a WindowProvider');
  }
  return context;
} 