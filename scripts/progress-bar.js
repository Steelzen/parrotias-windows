const progressBar = document.getElementById("progress");
// const iframe = document.getElementById("website-iframe");

window.electronAPI.handleStartLoading((event) => {
  progressBar.style.width = "10%";
  progressBar.style.display = "block";
});

window.electronAPI.handleStopLoading((event) => {
  progressBar.style.width = "100%";

  // Delay hiding the progress bar for a smoother transition
  setTimeout(() => {
    progressBar.style.display = "none";
  }, 500);
});
