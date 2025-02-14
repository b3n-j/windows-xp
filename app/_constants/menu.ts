import { MenuConfig } from "@/app/_types/menu";

export const menu: MenuConfig = {
  left: {
    apps: [
      {
        id: "internet-explorer",
        name: "Internet",
        description: "Browse the web",
        icon: "/icons/ie.ico",
        bold: true,
      },
      {
        id: "outlook-express",
        name: "Email",
        description: "Outlook Express",
        icon: "/icons/email.ico",
        bold: true,
      },
      {
        id: "menu-divider",
        name: "1",
      },
      {
        id: "notepad",
        name: "Notepad",
        icon: "/icons/notepad.ico",
      },
      {
        id: "paint",
        name: "Paint",
        icon: "/icons/paint.ico",
      },
      {
        id: "calculator",
        name: "Calculator",
        icon: "/icons/calculator.ico",
      },
      {
        id: "windows-media-player",
        name: "Windows Media Player",
        icon: "/icons/windows-media-player.ico",
      },
      {
        id: "windows-messenger",
        name: "Windows Messenger",
        icon: "/icons/windows-messenger.ico",
      },
      {
        id: "minesweeper",
        name: "Minesweeper",
        icon: "/icons/minesweeper.ico",
      },
      {
        id: "pinball",
        name: "Pinball",
        icon: "/icons/pinball.ico",
      },
    ],
  },
  right: {
    shortcuts: [
      {
        id: "my-documents",
        name: "My Documents",
        icon: "/icons/folder.ico",
        bold: true,
      },
      {
        id: "my-recent-documents",
        name: "My Recent Documents",
        icon: "/icons/my-recent-documents.ico",
        bold: true,
      },
      {
        id: "my-pictures",
        name: "My Pictures",
        icon: "/icons/my-pictures.ico",
        bold: true,
      },
      {
        id: "my-music",
        name: "My Music",
        icon: "/icons/my-music.ico",
        bold: true,
      },
      {
        id: "my-computer",
        name: "My Computer",
        icon: "/icons/my-computer.ico",
        bold: true,
      },
      {
        id: "menu-divider",
        name: "2",
      },
      {
        id: "control-panel",
        name: "Control Panel",
        icon: "/icons/control-panel.ico",
      },
      {
        id: "set-program-access-and-defaults",
        name: "Set Program Access and Defaults",
        icon: "/icons/set-program-access-and-defaults.ico",
      },
      {
        id: "connect-to",
        name: "Connect to",
        icon: "/icons/connect-to.ico",
      },
      {
        id: "printers-and-faxes",
        name: "Printers and Faxes",
        icon: "/icons/printers-and-faxes.ico",
      },
      {
        id: "menu-divider",
        name: "3",
      },
      {
        id: "help-and-support",
        name: "Help and Support",
        icon: "/icons/help-and-support.ico",
      },

      {
        id: "search",
        name: "Search",
        icon: "/icons/loop.ico",
      },
      {
        id: "run",
        name: "Run...",
        icon: "/icons/run.ico",
      },
    ],
  },
};
