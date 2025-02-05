'use client';

export default function RunningApps() {
  // Pour l'instant, simulons une application ouverte
  const openApps = [
    { icon: '/icons/folder.ico', title: 'My Computer', isActive: true }
  ];

  return (
    <div className="flex-1 flex items-center h-full px-1">
      {openApps.map((app, index) => (
        <button
          key={index}
          className={`taskbar-button h-[90%] px-2 flex items-center gap-2 min-w-[150px] max-w-[200px] ${
            app.isActive ? 'bg-gradient-to-b from-[rgba(255,255,255,0.3)] to-[rgba(255,255,255,0.2)]' : ''
          }`}
        >
          <img src={app.icon} alt={app.title} className="w-6 h-6" />
          <span className="text-white text-sm truncate">{app.title}</span>
        </button>
      ))}
    </div>
  );
} 