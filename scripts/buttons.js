document.addEventListener("DOMContentLoaded", () => {
  const webview = document.getElementById("website-view");
  const goBackButton = document.getElementById("go-back");
  const goForwardButton = document.getElementById("go-forward");
  const refreshButton = document.getElementById("refresh");

  goBackButton.addEventListener("click", () => {
    if (webview.canGoBack()) {
      webview.goBack();
    }
  });

  goForwardButton.addEventListener("click", () => {
    if (webview.canGoForward()) {
      webview.goForward();
    }
  });

  refreshButton.addEventListener("click", () => {
    webview.reload();
  });
});
