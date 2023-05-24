const { app, Menu, MenuItem, shell, session } = require("electron");

const handleMenu = (mainWindow) => {
  setContextMenu();
  disableMenuBarVisbility(mainWindow);
  createMenu(mainWindow);
};

const setContextMenu = () => {
  app.on("web-contents-created", (event, webContents) => {
    webContents.on(
      "context-menu",
      async (event, params) => {
        event.preventDefault();

        const menu = new Menu();

        menu.append(
          new MenuItem({
            label: "Save Image As",
            click: async () => {
              try {
                const { filePath } = await session.defaultSession.downloadURL(
                  params.srcURL
                );
                if (filePath) {
                  shell.showItemInFolder(filePath);
                }
              } catch (error) {
                console.error("Error downloading file:", error);
              }
            },
          })
        );

        menu.popup();
      },
      false
    );
  });
};

const disableMenuBarVisbility = (mainWindow) => {
  mainWindow.setMenuBarVisibility(false);
};

const createMenu = (mainWindow) => {
  const isMac = process.platform === "darwin";
  const printMenuItem = new MenuItem({
    label: "Print",
    accelerator: "CmdOrCtrl+P",
    click: () => {
      mainWindow.webContents.print();
    },
  });

  const template = [
    // { role: 'editMenu' }
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        ...(isMac
          ? [
              { role: "pasteAndMatchStyle" },
              { role: "delete" },
              { role: "selectAll" },
              { type: "separator" },
              {
                label: "Speech",
                submenu: [{ role: "startSpeaking" }, { role: "stopSpeaking" }],
              },
            ]
          : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
      ],
    },
    // { role: 'viewMenu' }
    {
      label: "View",
      submenu: [
        { role: "reload", accelerator: "F5" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    // { role: 'windowMenu' }
    {
      label: "Window",
      submenu: [
        { role: "minimize" },
        { role: "zoom" },
        printMenuItem,
        ...(isMac
          ? [
              { type: "separator" },
              { role: "front" },
              { type: "separator" },
              { role: "window" },
            ]
          : [{ role: "close" }]),
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

module.exports = {
  handleMenu,
};
