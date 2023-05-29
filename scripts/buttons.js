const goBackButton = document.getElementById("go-back");
const goFowardButton = document.getElementById("go-forward");
const refreshButton = document.getElementById("refresh");

const sendGoBack = () => {
  window.electronAPI.goBack();
};
const sendGoForward = () => {
  window.electronAPI.goForward();
};
const sendRefresh = () => {
  window.electronAPI.refresh();
};

goBackButton.addEventListener("click", sendGoBack);
goFowardButton.addEventListener("click", sendGoForward);
refreshButton.addEventListener("click", sendRefresh);
