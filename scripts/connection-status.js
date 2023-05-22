window.electronAPI.handleFinishLoad((event) => {
    window.addEventListener('offline', sendOffline)
})

const sendOffline = () => {
    window.electronAPI.offline();
}