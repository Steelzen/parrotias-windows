const { ipcMain } = require("electron");

const handleElectronAPI = () => {
  ipcMain.on("go-back", handleGoBack);
  ipcMain.on("go-forward", handleGoForward);
  ipcMain.on("refresh", handleRefresh);
};

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

module.exports = {
  handleElectronAPI,
};
