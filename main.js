const { app, BrowserWindow, Menu} = require("electron");
const ProgressBar = require("electron-progressbar");
const { setContextMenu, disableMenuBarVisbility, createMenu } = require("./scripts/menu.js");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  setContextMenu();
  disableMenuBarVisbility(win);
  createMenu();

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
