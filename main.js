const { app, BrowserWindow, BrowserView } = require("electron");
const path = require("path");
const { handleMenu } = require("./scripts/menu.js");
const {
  rendererToMainAPI,
  mainToRendererAPI,
} = require("./scripts/electron-api.js");
// require('update-electron-app')()

const createWindow = async () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
      webviewTag: true,
    },
  });

  mainWindow.loadFile("index.html");

  const websiteView = new BrowserView({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  handleMenu(mainWindow, websiteView);

  mainWindow.setBrowserView(websiteView);
  await websiteView.webContents.loadURL("https://parrotias.com");
  websiteView.setBounds({ x: 0, y: 70, width: 800, height: 530 });
  websiteView.setAutoResize({ width: true, height: true });

  // Electron API
  rendererToMainAPI(websiteView);
  mainToRendererAPI(websiteView.webContents, mainWindow.webContents);
};

app
  .whenReady()
  .then(() => {
    createWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  })
  .catch((error) => {
    // Handle any promise rejections here
    console.error("Error:", error);
  });

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.setAppUserModelId(process.execPath);
