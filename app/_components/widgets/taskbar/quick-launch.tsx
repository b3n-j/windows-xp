import Image from 'next/image';

export default function QuickLaunch() {
  const quickLaunchItems = [
    { icon: '/icons/ie.ico', alt: 'Internet Explorer' },
    { icon: '/icons/msn.ico', alt: 'MSN' },
  ];

  return (
    <div className="flex items-center h-full px-1">
      {quickLaunchItems.map((item, index) => (
        <button
          key={index}
          className="taskbar-quicklaunch-button w-6 h-full flex items-center justify-center hover:brightness-105 active:brightness-90"
        >
          <div className="flex justify-center h-full">
            <Image src={item.icon} alt={item.alt} width={15} height={15} className="object-contain" />
          </div>
        </button>
      ))}
    </div>
  );
} 