const { ipcMain, BrowserWindow, dialog } = require("electron");

const rendererToMainAPI = (mainWindow) => {
  ipcMain.on("go-back", () => {
    handleGoBack(mainWindow);
  });

  ipcMain.on("go-forward", () => {
    handleGoForward(mainWindow);
  });

  ipcMain.on("refresh", () => {
    handleRefresh(mainWindow);
  });
};

const mainToRendererAPI = (mainWebContents, interfaceWebContents) => {
  mainWebContents.on("did-start-loading", () => {
    interfaceWebContents.send("did-start-loading");
  });
  mainWebContents.on("did-stop-loading", () => {
    interfaceWebContents.send("did-stop-loading");
  });
  mainWebContents.on("did-finish-load", () => {
    interfaceWebContents.send("did-finish-load");
  });
};

const handleGoBack = (mainWindow) => {
  if (mainWindow.webContents.canGoBack()) {
    mainWindow.webContents.goBack();
  }
};

const handleGoForward = (mainWindow) => {
  if (mainWindow.webContents.canGoForward()) {
    mainWindow.webContents.goForward();
  }
};

const handleRefresh = (mainWindow) => {
  mainWindow.webContents.reload();
};

module.exports = {
  rendererToMainAPI,
  mainToRendererAPI,
};
