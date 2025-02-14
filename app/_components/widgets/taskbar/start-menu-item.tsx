import { MenuItem } from "@/app/_types/menu";
import Image from "next/image";


export default function StartMenuItem({ 
  id,
  name, 
  description, 
  icon, 
  onClick = null,
  iconSize = 30,
  bold = false,
}: MenuItem) {
  return (
    <button className="menu-item flex items-center gap-2" onClick={onClick || undefined}>
      {icon && (
        <Image
          src={icon}
          alt={name}
          width={iconSize}
          height={iconSize}
        />
      )}
      <div className="flex flex-col items-start text-start">
        <span className={`program-name ${bold ? "bold" : ""}`}>{name}</span>
        {description && (
          <span className="program-description">
            {description}
          </span>
        )}
      </div>
    </button>
  );
} 