// const updateOnlineStatus = () => {
//     document.getElementById('status').innerHTML = navigator.onLine ? 'online' : 'offline'

// }
  
// window.addEventListener('online', updateOnlineStatus)
// window.addEventListener('offline', updateOnlineStatus)

// updateOnlineStatus()

const updateOnlineStatus = () => {
    window.electronAPI.offline();
}

window.electronAPI.handleStopLoading((event) => {
    window.addEventListener('offline', updateOnlineStatus)
})