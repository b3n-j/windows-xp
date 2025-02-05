'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/app/_constants/routes';

const TYPING_SPEED = 50; /* Typing speed (ms) */
const POST_DELAY = 750; /* Delay after POST (ms) */
const MEMORY_TEST_DELAY = 1500; /* Memory test delay (ms) */

export default function BiosScreen() {
  const router = useRouter();
  const [currentText, setCurrentText] = useState('');
  const [step, setStep] = useState(0);
  const [memoryCount, setMemoryCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isMemoryTestComplete, setIsMemoryTestComplete] = useState(false);
  const [isBootingMessage, setIsBootingMessage] = useState(false);
  const [date, setDate] = useState('');

  const biosText = [
    'Award Modular BIOS v6.00PG',
    'Copyright (C) 1984-2002, Award Software, Inc.',
    '',
    `Current Date: ${date}`,
    'Intel(R) Pentium(R) 4 CPU 2.40GHz',
    'CPU Speed: 2400 MHz',
    'L1 Cache: 8K',
    'L2 Cache: 512K',
    'Checking NVRAM... OK',
    'CMOS Battery Status: OK',
    'Initializing USB Controllers... OK',
    'USB Device(s): 1 Keyboard, 1 Mouse',
    'Initializing IDE Master... WDC WD800JD-60LSA0',
    'Initializing IDE Slave... ATAPI DVD-ROM 16X',
    '',
    'Press DEL to enter SETUP, ESC to skip memory test',
    '',
    'Testing Memory: ',
  ];

  /* Memory test animation */
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (step === biosText.length && !isMemoryTestComplete) {
      interval = setInterval(() => {
        setMemoryCount(prev => {
          const increment = Math.floor(Math.random() * 128) + 64;
          const newValue = Math.min(prev + increment, 1024);
          
          if (newValue >= 1024) {
            setIsMemoryTestComplete(true);
          }
          
          return newValue;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [step, isMemoryTestComplete]);

  /* Main text animation */
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (step < biosText.length - 1) {
      timeout = setTimeout(() => {
        setCurrentText(prev => prev + biosText[step] + '\n');
        setStep(prev => prev + 1);
      }, TYPING_SPEED);
    } else if (step === biosText.length - 1 && !isMemoryTestComplete) {
      timeout = setTimeout(() => {
        setCurrentText(prev => prev + 'Testing Memory: ');
        setStep(prev => prev + 1);
      }, TYPING_SPEED);
    } else if (isMemoryTestComplete && !isBootingMessage) {
      timeout = setTimeout(() => {
        setCurrentText(prev => prev + '1024MB OK\n\nBooting from Hard Drive...');
        setIsBootingMessage(true);
        
        /* Redirect to Windows boot screen */
        setTimeout(() => {
          router.push(ROUTES.BOOT.WINDOWS);
        }, POST_DELAY);
      }, MEMORY_TEST_DELAY);
    }

    return () => clearTimeout(timeout);
  }, [step, isMemoryTestComplete, isBootingMessage, router]);

  /* Cursor blinking effect */
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    // Ajouter la date actuelle au démarrage
    const now = new Date();
    setDate(now.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    }));
  }, []);

  return (
    <div className="h-screen w-screen flex items-start justify-start bios-screen overflow-hidden">
      <pre className="bios-text">
        {currentText}
        {step === biosText.length && !isMemoryTestComplete && `${memoryCount}MB`}
        {showCursor && <span className="bios-cursor">_</span>}
      </pre>
    </div>
  );
} 