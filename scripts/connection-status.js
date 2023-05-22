const sendOffline = () => {
    window.electronAPI.offline();
}

window.electronAPI.handleStopLoadingOnce((event) => {
    window.addEventListener('offline', sendOffline)
})