'use client';

import WindowsLogo from '../../assets/windows-logo';
import UserTile from './user-tile';

export default function UserSelection() {
  return (
    <div className="flex items-center justify-center gap-8 h-full">
      <div className="flex flex-col items-end justify-center h-full w-full gap-4">
        <WindowsLogo />
        <div className="text-white text-lg mr-6">
          To begin, click your user name
        </div>
      </div>
      
      <div className="w-px h-4/6 login-divider" />
      
      <div className="flex flex-col items-center">
        <UserTile />
      </div>
    </div>
  );
} 