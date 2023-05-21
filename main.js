const { app, BrowserWindow } = require("electron");
const path = require("path");
const {
  setContextMenu,
  disableMenuBarVisbility,
  createMenu,
} = require("./scripts/menu.js");
const { handleElectronAPI } = require("./scripts/electron-api.js");
// require('update-electron-app')()

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  handleElectronAPI();

  setContextMenu();
  disableMenuBarVisbility(mainWindow);
  createMenu();

  mainWindow.loadFile("index.html");

  // for sending a message to renderer process
  mainWindow.webContents.on("did-start-loading", () => {
    mainWindow.webContents.send("did-start-loading");
  });

  mainWindow.webContents.on("did-stop-loading", () => {
    mainWindow.webContents.send("did-stop-loading");
  });
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

app.setAppUserModelId(process.execPath);
