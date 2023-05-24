onload = () => {
  const webview = document.getElementById("website-view");
  const progressBar = document.getElementById("progress");

  const loadstart = () => {
    progressBar.style.width = "10%";
    progressBar.style.display = "block";
  };

  const loadstop = () => {
    progressBar.style.width = "100%";

    // Delay hiding the progress bar for a smoother transition
    setTimeout(() => {
      progressBar.style.display = "none";
    }, 500);
  };

  webview.addEventListener("did-start-loading", loadstart);
  webview.addEventListener("did-stop-loading", loadstop);
};

onload();
