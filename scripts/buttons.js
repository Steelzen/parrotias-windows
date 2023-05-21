const goBackButton = document.getElementById("go-back");
const goFowardButton = document.getElementById("go-forward");
const refreshButton = document.getElementById("refresh");

goBackButton.addEventListener("click", () => {
    window.electronAPI.goBack();
})

goFowardButton.addEventListener("click", () =>{
    window.electronAPI.goForward();
})

refreshButton.addEventListener("click", () =>{
    window.electronAPI.refresh();
})


