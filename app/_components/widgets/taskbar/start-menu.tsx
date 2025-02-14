import Image from "next/image";;
import { useWindow } from "@/app/_hooks/useWindow";
import { menu } from "@/app/_constants/menu";
import StartMenuItem from "./start-menu-item";
import { MenuItem } from "@/app/_types/menu";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/_constants/routes";

export default function StartMenu({ onClose }: { onClose: () => void }) {
  const { addWindow } = useWindow();
  const router = useRouter();

  const openProgram = (program: MenuItem) => {
    addWindow({
      id: program.id,
      title: program.name,
      icon: program.icon,
      size: {
        width: 2000,
        height: 500,
      },
      isMaximized: false,
      component: (
        <div className="p-4">
          <textarea className="w-full h-full resize-none" />
        </div>
      ),
    });
    onClose();
  };

  return (
    <div className="menu" style={{ zIndex: 10000 }}>
      {/* Menu header */}
      <div className="menu-header gap-2">
        <div className="relative w-11 h-11">
          <Image
            src="/images/account/astronaut.jpg"
            alt="User"
            fill
            sizes="42px"
            priority
            className="menu-header-image"
          />
        </div>
        <span className="menu-header-username">Benjamin Gracia</span>
      </div>

      <hr className="orange-gradient-divider"></hr>

      {/* Menu body */}
      <div className="menu-body">
        <div className="flex flex-col w-full h-full">
          <div className="flex flex-row w-full h-full">
            {/* Menu left column */}
            <div className="menu-left-column">
              <ul>
                {menu.left.apps.map((item) =>
                  item.id === "menu-divider" ? (
                    <div
                      key={`${item.id}-${item.name}`}
                      className="menu-divider"
                    />
                  ) : (
                    <li key={item.id} className="menu-list-item">
                      <StartMenuItem
                        {...item}
                        onClick={() => openProgram(item)}
                        iconSize={30}
                      />
                    </li>
                  )
                )}
              </ul>
              <div className="menu-all-programs">All programs</div>
            </div>
            {/* Menu right column */}
            <ul className="menu-right-column">
              {menu.right.shortcuts.map((item) =>
                item.id === "menu-divider" ? (
                  <div
                    key={`${item.id}-${item.name}`}
                    className="menu-divider"
                  />
                ) : (
                  <li key={item.id} className="menu-list-item">
                    <StartMenuItem
                      {...item}
                      onClick={() => openProgram(item)}
                      iconSize={22}
                    />
                  </li>
                )
              )}
            </ul>
          </div>
          <section className="menu-footer">
            <ul className="flex flex-row gap-2 px-1">
              <li className="menu-list-item">
                <StartMenuItem
                id="log-off"
                name="Log off"
                icon="/icons/log-off.ico"
                iconSize={22}
                onClick={() => router.push(ROUTES.LOGIN)}
              />
              </li>
              <li className="menu-list-item">
                <StartMenuItem
                  id="shutdown"
                  name="Turn off computer"
                  icon="/icons/shutdown.ico"
                  iconSize={22}
                  onClick={() => {}}
                />
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
