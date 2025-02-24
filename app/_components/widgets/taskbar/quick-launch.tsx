import Image from 'next/image';

export default function QuickLaunch() {
  const quickLaunchItems = [
    { icon: '/icons/ie.ico', alt: 'Internet Explorer' },
    { icon: '/icons/msn.ico', alt: 'MSN' },
  ];

  return (
    <div className="flex items-center h-full gap-1 px-1">
      {quickLaunchItems.map((item, index) => (
        <button
          key={index}
          className="taskbar-button w-8 h-8 flex items-center justify-center rounded hover:brightness-105 active:brightness-90"
        >
          <div className="relative w-4 h-4">
            <Image src={item.icon} alt={item.alt} fill className="object-contain" />
          </div>
        </button>
      ))}
    </div>
  );
} 