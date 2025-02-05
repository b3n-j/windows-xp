import Taskbar from '@/app/_components/widgets/desktop/taskbar/taskbar';

export default function DesktopPage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Fond d'écran Bliss */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: 'url(/images/wallpapers/bliss.jpg)' }}
      />
      
      {/* Zone du bureau pour les icônes (à implémenter plus tard) */}
      <div className="absolute inset-0 pb-8">
        {/* Les icônes iront ici */}
      </div>

      {/* Barre des tâches */}
      <Taskbar />
    </div>
  );
} 