export default function ShutdownButton() {
  return (
    <button className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-white/10 transition-colors">
      <img 
        src="/icons/shutdown.ico" 
        alt="Shutdown" 
        className="w-8 h-8"
      />
      <span className="text-white text-sm">Turn off computer</span>
    </button>
  );
} 