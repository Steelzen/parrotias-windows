const zoom = (websiteView) => {
  const mainWindow = websiteView.webContents.getOwnerBrowserWindow();
  const viewContents = websiteView.webContents;

  const handleZoom = (event) => {
    const isZoomIn = event.ctrlKey || event.metaKey || event.deltaY < 0;
    if (isZoomIn) {
      viewContents.zoomIn();
    } else {
      viewContents.zoomOut();
    }
  };

  mainWindow.webContents.on("mouse-wheel", handleZoom);
  mainWindow.webContents.on("dblclick", (event) => {
    if (event.ctrlKey || event.metaKey) {
      viewContents.setZoomLevel(0);
    }
  });
};

module.exports = {
  zoom,
};
