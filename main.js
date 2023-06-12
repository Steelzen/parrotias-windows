const { app, BrowserWindow, BrowserView } = require("electron");
const path = require("path");
const { handleMenu } = require("./scripts/menu.js");
const { zoom } = require("./scripts/zoom.js");
const {
  rendererToMainAPI,
  mainToRendererAPI,
} = require("./scripts/electron-api.js");
// require('update-electron-app')()

const createWindow = async () => {
  const mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
      webviewTag: true,
    },
  });

  const websiteView = new BrowserView({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.setBrowserView(websiteView);
  mainWindow.loadFile("index.html");

  try {
    // Makes it unable to size the app unless website is loaded
    await websiteView.webContents.loadURL("https://parrotias.com");
  } catch (error) {
    console.log(error);
  }

  mainWindow.maximize();
  mainWindow.show();

  const bounds = await mainWindow.getBounds();
  await websiteView.setBounds({
    x: bounds.x,
    y: bounds.y + 47,
    width: bounds.width - 8,
    height: bounds.height - 85,
  });

  zoom(websiteView);

  websiteView.setAutoResize({ width: true, height: true });

  handleMenu(mainWindow, websiteView);
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
