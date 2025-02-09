/* To Do */
// export const ROOT = "/";
// export const AUTH_ROUTES = [
//     "/login",
//     "/register",
//     "/forgot-password",
//     "/reset-password",
// ];

export const ROUTES = {
  BOOT: {
    BIOS: '/',
    WINDOWS: '/boot/windows',
  },
  LOGIN: '/login',
  DESKTOP: '/desktop',
} as const;

export const PUBLIC_ROUTES = [
  ROUTES.BOOT.BIOS,
  ROUTES.BOOT.WINDOWS,
  ROUTES.LOGIN,
  ROUTES.DESKTOP,
];
