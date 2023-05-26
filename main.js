// const { app, BrowserWindow } = require("electron");
// const path = require("path");
// const { handleMenu } = require("./scripts/menu.js");
// const {
//   rendererToMainAPI,
//   mainToRendererAPI,
// } = require("./scripts/electron-api.js");
// // require('update-electron-app')()

// const createWindow = () => {
//   const mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: true,
//       preload: path.join(__dirname, "preload.js"),
//     },
//   });

//   const interfaceWindow = new BrowserWindow({
//     width: 800,
//     height: 100,
//     webPreferences: {
//       nodeIntegration: true,
//       preload: path.join(__dirname, "preload.js"),
//     },
//   });

//   mainWindow.loadURL("https://parrotias.com");
//   interfaceWindow.loadFile("index.html");

//   rendererToMainAPI(mainWindow);
//   handleMenu(mainWindow);

//   // for sending a message to renderer process
//   mainToRendererAPI(mainWindow.webContents, interfaceWindow.webContents);

//   // mainWindow.webContents.on("did-finish-load", () => {
//   //   // Trigger the print action
//   //   mainWindow.webContents.print();
//   // });
// };

// app
//   .whenReady()
//   .then(() => {
//     createWindow();

//     app.on("activate", () => {
//       if (BrowserWindow.getAllWindows().length === 0) {
//         createWindow();
//       }
//     });
//   })
//   .catch((error) => {
//     // Handle any promise rejections here
//     console.error("Error:", error);
//   });

// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") app.quit();
// });

// app.setAppUserModelId(process.execPath);

// TEst for view//
const { app, BrowserWindow, BrowserView } = require("electron");
const path = require("path");
const { handleMenu } = require("./scripts/menu.js");
const {
  rendererToMainAPI,
  mainToRendererAPI,
} = require("./scripts/electron-api.js");
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

  const view = new BrowserView({
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.setBrowserView(view);
  view.setBounds({ x: 0, y: 28, width: 800, height: 40 });
  view.setAutoResize({ width: true, height: true });

  mainWindow.loadURL("https://parrotias.com");
  view.webContents.loadURL(`file://${path.join(__dirname, "index.html")}`);

  rendererToMainAPI(mainWindow);
  handleMenu(mainWindow);

  // for sending a message to renderer process
  mainToRendererAPI(mainWindow.webContents, view.webContents);
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
