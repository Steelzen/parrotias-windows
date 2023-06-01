const zoom = (websiteView) => {
  const win = websiteView;

  win.webContents.setZoomFactor(1.0);

  // Upper Limit is working of 500%
  win.webContents
    .setVisualZoomLevelLimits(1, 5)
    .then(() => console.log("Zoom levels have been set between 100% and 500%"))
    .catch((err) => console.log(err));

  win.webContents.on("zoom-changed", (event, zoomDirection) => {
    const currentZoom = win.webContents.getZoomFactor();

    if (zoomDirection === "in") {
      win.webContents.zoomFactor = Math.min(currentZoom + 0.2, 5);
    }

    if (zoomDirection === "out") {
      win.webContents.zoomFactor = Math.max(currentZoom - 0.2, 0.2);
    }
  });
};

module.exports = {
  zoom,
};
