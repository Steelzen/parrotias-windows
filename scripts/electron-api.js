const { ipcMain, BrowserWindow, dialog } = require("electron");

const rendererToMainAPI = () => {
  ipcMain.on("go-back", handleGoBack);
  ipcMain.on("go-forward", handleGoForward);
  ipcMain.on("refresh", handleRefresh);
  ipcMain.on("offline", handleOffline);
};

const mainToRendererAPI = (webContents) => {
  webContents.on("did-start-loading", () => { webContents.send("did-start-loading") });
  webContents.on("did-stop-loading", () => { webContents.send("did-stop-loading") });
  webContents.once("did-stop-loading", () => { webContents.send("did-stop-loading-once")});
}

const handleGoBack = (event) => {
  const webContents = event.sender;
  if (webContents.canGoBack()) {
    webContents.goBack();
  }
};

const handleGoForward = (event) => {
  const webContents = event.sender;
  if (webContents.canGoForward()) {
    webContents.goForward();
  }
};

const handleRefresh = (event) => {
  const webContents = event.sender;
  webContents.reload();
};

const handleOffline = (event) => {
  const webContents = event.sender;
  const mainWindow = BrowserWindow.fromWebContents(webContents);
  dialog.showMessageBox(mainWindow, {
    message: 'Your connection is Offline',
  })
}

module.exports = {
  rendererToMainAPI,
  mainToRendererAPI,
};
