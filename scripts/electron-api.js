const { ipcMain, BrowserWindow, dialog } = require("electron");

const rendererToMainAPI = (websiteView) => {
  ipcMain.on("go-back", () => {
    handleGoBack(websiteView);
  });

  ipcMain.on("go-forward", () => {
    handleGoForward(websiteView);
  });

  ipcMain.on("refresh", () => {
    handleRefresh(websiteView);
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

const handleGoBack = (websiteView) => {
  if (websiteView.webContents.canGoBack()) {
    websiteView.webContents.goBack();
  }
};

const handleGoForward = (websiteView) => {
  if (websiteView.webContents.canGoForward()) {
    websiteView.webContents.goForward();
  }
};

const handleRefresh = (websiteView) => {
  websiteView.webContents.reload();
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
