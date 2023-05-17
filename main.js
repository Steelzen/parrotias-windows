const { app, BrowserWindow } = require("electron");
const ProgressBar = require("electron-progressbar");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  const progressBar = new ProgressBar({
    text: "Loading...",
    detail: "Please wait",
    browserWindow: {
      parent: win,
      modal: true,
      closable: false,
      minimizable: false,
      width: 400,
      height: 100,
    },
    style: {
      text: {},
      detail: {},
      bar: {
        background: "#e0e0e0",
        height: "10px",
        width: "0%",
      },
      value: {},
    },
    maxValue: 100, // Maximum value of the progress bar
  });

  progressBar
    .on("completed", () => {
      console.log("Loading completed.");
      progressBar.detail = "Completed.";
      setTimeout(() => {
        progressBar.close();
      }, 1000);
    })
    .on("aborted", () => {
      console.log("Loading aborted.");
      progressBar.detail = "Aborted.";
      setTimeout(() => {
        progressBar.close();
      }, 1000);
    });

  win.loadURL("https://parrotias.com");

  win.webContents.on("did-finish-load", () => {
    progressBar.setCompleted();
  });

  win.webContents.on("did-fail-load", () => {
    progressBar.setAborted();
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
