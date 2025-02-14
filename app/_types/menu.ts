export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  iconSize?: number;
  onClick?: (() => void) | null;
  bold?: boolean;
  width?: string;
  height?: string;
}

export interface MenuConfig {
  left: {
    apps: MenuItem[];
  };
  right: {
    shortcuts: MenuItem[];
  };
}