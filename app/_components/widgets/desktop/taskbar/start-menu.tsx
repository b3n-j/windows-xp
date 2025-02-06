import Image from 'next/image';
import { useWindows } from '@/app/_contexts/WindowContext';

export default function StartMenu({ onClose }: { onClose: () => void }) {
  const { addWindow } = useWindows();

  const openNotepad = () => {
    addWindow({
      id: `notepad-${Date.now()}`, // ID unique
      title: "Notepad",
      icon: "/icons/notepad.ico",
      component: (
        <div className="p-4">
          <textarea className="w-full h-full resize-none" />
        </div>
      )
    });
    onClose(); // Ferme le menu démarrer
  };

  return (
    <div className="absolute bottom-8 left-0 w-96 bg-white rounded-t-lg shadow-xl">
      {/* En-tête avec l'utilisateur */}
      <div className="h-20 bg-gradient-to-r from-[#245EDC] to-[#3C8EF3] rounded-t-lg p-4 flex items-center gap-4">
        <div className="relative w-12 h-12">
          <Image 
            src="/images/account/astronaut.jpg"
            alt="User"
            fill
            sizes="48px"
            priority
            className="object-cover rounded-full border-2 border-white"
          />
        </div>
        <span className="text-white font-bold">Benjamin Gracia</span>
      </div>

      {/* Zone principale du menu */}
      <div className="flex h-[400px]">
        {/* Colonne de gauche */}
        <div className="w-2/3 p-2 bg-white">
          <button onClick={openNotepad} className="w-full text-left p-2 hover:bg-blue-50">
            Notepad
          </button>
        </div>

        {/* Colonne de droite */}
        <div className="w-1/3 bg-[#D3E5FA] p-2">
          {/* Les raccourcis système iront ici */}
        </div>
      </div>
    </div>
  );
} 