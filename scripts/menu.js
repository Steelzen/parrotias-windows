const {Menu} = require("electron");
const contextMenu = require('electron-context-menu'); 


function setContextMenu(){
    // Display SaveImageAs function when right click to any image item
    contextMenu({
        showSaveImageAs: true
    })
}

function disableMenuBarVisbility(win){
    win.setMenuBarVisibility(false);
}
  
function createMenu(){
    const isMac = process.platform === 'darwin'

    const template = [
        // { role: 'editMenu' }
        {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            ...(isMac ? [
            { role: 'pasteAndMatchStyle' },
            { role: 'delete' },
            { role: 'selectAll' },
            { type: 'separator' },
            {
                label: 'Speech',
                submenu: [
                { role: 'startSpeaking' },
                { role: 'stopSpeaking' }
                ]
            }
            ] : [
            { role: 'delete' },
            { type: 'separator' },
            { role: 'selectAll' }
            ])
        ]
        },
        // { role: 'viewMenu' }
        {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forceReload' },
            { role: 'toggleDevTools' },
            { type: 'separator' },
            { role: 'resetZoom' },
            { role: 'zoomIn' },
            { role: 'zoomOut' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
        },
        // { role: 'windowMenu' }
        {
        label: 'Window',
        submenu: [
            { role: 'minimize' },
            { role: 'zoom' },
            ...(isMac ? [
            { type: 'separator' },
            { role: 'front' },
            { type: 'separator' },
            { role: 'window' }
            ] : [
            { role: 'close' }
            ])
        ]
        },
    ]

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

module.exports = {
    setContextMenu,
    disableMenuBarVisbility,
    createMenu
}