import ShutdownButton from "@/app/_components/ui/shutdown-button";
import BottomHelp from "@/app/_components/ui/bottom-help";

export default function Footer() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#0C246B] flex justify-between items-center px-4">
      <ShutdownButton />
      <BottomHelp />
    </div>
  );
}