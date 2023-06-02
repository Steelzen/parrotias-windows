const { Menu, MenuItem } = require("electron");
const contextMenu = require("electron-context-menu");

const handleMenu = (mainWindow, websiteView) => {
  setContextMenu(mainWindow, websiteView);
  disableMenuBarVisbility(mainWindow);
  createMenu(websiteView);
};

const setContextMenu = (mainWindow, websiteView) => {
  // Display SaveImageAs function when right click on any image item
  contextMenu({
    showSaveImageAs: true,
    prepend: () => {
      const contextMenuItems = [
        {
          label: "Print",
          click: () => {
            websiteView.webContents.print();
          },
        },
      ];

      return contextMenuItems;
    },
    window: websiteView,
  });
};

const disableMenuBarVisbility = (mainWindow) => {
  mainWindow.setMenuBarVisibility(false);
};

const createMenu = (websiteView) => {
  const isMac = process.platform === "darwin";
  const printMenuItem = new MenuItem({
    label: "Print",
    accelerator: "CmdOrCtrl+P",
    click: () => {
      websiteView.webContents.print();
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
        { role: "zoomIn", accelerator: "CmdOrCtrl+=" },
        { role: "zoomOut", accelerator: "CmdOrCtrl+-" },
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
