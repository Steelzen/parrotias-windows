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
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  rendererToMainAPI();
  handleMenu(mainWindow);

  mainWindow.loadFile("index.html");
  // mainWindow.loadURL("https://parrotias.com");
  // mainWindow.webContents.on('did-finish-load', () => {
  //   mainWindow.webContents.executeJavaScript(`
  //     // Execute JavaScript code in the loaded web page
  //     const newElement = document.createElement('div');
  //     newElement.textContent = 'This is a new element added dynamically.';
  //     document.body.appendChild(newElement);
  //   `);
  // });

  // for sending a message to renderer process
  mainToRendererAPI(mainWindow.webContents);

  // mainWindow.webContents.on('did-finish-load', () => {
  //   // Trigger the print action
  //   mainWindow.webContents.print();
  // });
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
