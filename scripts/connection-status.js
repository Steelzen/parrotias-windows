const updateOnlineStatus = () => {
  document.getElementById("status").innerHTML = navigator.onLine
    ? '<img src="./resources/online.png" alt="Online" />'
    : '<img src="./resources/offline.png" alt="Offline" />';
};

window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);

updateOnlineStatus();
