const { app, BrowserWindow } = require("electron");
const path = require("path");
const {
  handleMenu
} = require("./scripts/menu.js");
const { rendererToMainAPI, mainToRendererAPI } = require("./scripts/electron-api.js");
// require('update-electron-app')()

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  rendererToMainAPI();
  handleMenu(mainWindow);

  mainWindow.loadFile("index.html");

  // for sending a message to renderer process
  // mainWindow.webContents.on("did-start-loading", (event) =>{
  //   mainWindow.webContents.send("did-start-loading")
  // })
  // mainWindow.webContents.on("did-stop-loading", (event) =>{
  //   mainWindow.webContents.send("did-stop-loading")
  // })
  mainToRendererAPI(mainWindow.webContents);
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
