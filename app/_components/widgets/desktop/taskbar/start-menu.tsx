'use client';

export default function StartMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute bottom-12 left-0 w-96 bg-white rounded-t-lg shadow-xl">
      {/* En-tête avec l'utilisateur */}
      <div className="h-20 bg-gradient-to-r from-[#245EDC] to-[#3C8EF3] rounded-t-lg p-4 flex items-center gap-4">
        <img 
          src="/images/account/astronaut.jpg"
          alt="User"
          className="w-12 h-12 rounded-full border-2 border-white"
        />
        <span className="text-white font-bold">Benjamin Gracia</span>
      </div>

      {/* Zone principale du menu */}
      <div className="flex h-[400px]">
        {/* Colonne de gauche */}
        <div className="w-2/3 p-2 bg-white">
          {/* Les programmes récents iront ici */}
        </div>

        {/* Colonne de droite */}
        <div className="w-1/3 bg-[#D3E5FA] p-2">
          {/* Les raccourcis système iront ici */}
        </div>
      </div>
    </div>
  );
} 