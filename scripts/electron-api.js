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
    type: 'question',
    buttons: ['Leave', 'Stay'],
    title: 'Do you want to leave this site?',
    message: 'Changes you made may not be saved.',
    defaultId: 0,
    cancelId: 1
  })
}

module.exports = {
  rendererToMainAPI,
  mainToRendererAPI,
};
