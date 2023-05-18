const progressBar = document.getElementById("progress");
const iframe = document.getElementById("website-iframe");

// Start the progress bar when the iframe starts loading
iframe.addEventListener("loadstart", () => {
  progressBar.style.width = "0%";
  progressBar.style.display = "block";
});

// Complete the progress bar when the iframe finishes loading
iframe.addEventListener("load", () => {
  progressBar.style.width = "100%";

  // Delay hiding the progress bar for a smoother transition
  setTimeout(() => {
    progressBar.style.display = "none";
  }, 500);
});
