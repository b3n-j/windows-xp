import { ROUTES } from '@/app/_constants/routes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function UserTile() {
  const router = useRouter();

  const handleClick = () => {
    router.push(ROUTES.DESKTOP);
  };

  return (
    <div 
      onClick={handleClick}
      className="user-tile p-2 cursor-pointer border border-white/40 rounded-lg min-w-[300px] hover:border-white/50"
    >
      <div className="flex items-start gap-4">
        <div className="relative w-14 h-14">
          <Image
            src="/images/account/astronaut.jpg"
            alt="Benjamin"
            fill
            className="object-cover rounded-lg border-2 border-white/50"
          />
        </div>
        <div className="flex flex-col items-start justify-start">
          <p className="text-white text-m">Benjamin Gracia</p>
          <p className="text-white/80 text-sm">1 program running</p>
        </div>
      </div>
    </div>
  );
} 