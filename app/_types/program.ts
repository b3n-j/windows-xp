export interface Program {
  id: string;
  name: string;
  description?: string;
  icon: string;
  onClick: (() => void) | null;
  iconSize?: number;
  size?: {
    width: number;
    height: number;
  };
  component?: React.ReactNode;
}