'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/app/_constants/routes';

export default function BiosScreen() {
  const router = useRouter();
  const [currentText, setCurrentText] = useState('');
  const [step, setStep] = useState(0);

  const biosText = [
    'Award Modular BIOS v4.51PG',
    'Copyright (C) 1984-2002, Award Software, Inc.',
    '',
    'Intel(R) Pentium(R) 4 CPU 2.40GHz',
    'Memory Test: 1024MB OK',
    '',
    'Press DEL to enter SETUP',
    'Press TAB to show POST screen',
    '',
    'Initializing USB Controllers ... Done',
    'Initializing IDE Controllers ... Done',
    'Boot from CD/DVD :',
    'Boot from Hard Drive...',
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (step < biosText.length) {
      timeout = setTimeout(() => {
        setCurrentText((prev) => prev + biosText[step] + '\n');
        setStep((prev) => prev + 1);
      }, 100);
    } else {
      // When BIOS animation is complete, redirect to Windows boot screen
      timeout = setTimeout(() => {
        router.push(ROUTES.BOOT.WINDOWS);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [step, router]);

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <pre className="font-mono text-white whitespace-pre">
        {currentText}
      </pre>
    </div>
  );
} 