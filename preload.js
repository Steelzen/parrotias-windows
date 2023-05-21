const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  goBack: () => ipcRenderer.send("go-back"),
  goForward: () => ipcRenderer.send("go-forward"),
  refresh: () => ipcRenderer.send("refresh"),
  handleStartLoading: (callback) =>
    ipcRenderer.on("did-start-loading", callback),
  handleStopLoading: (callback) => ipcRenderer.on("did-stop-loading", callback),
});
