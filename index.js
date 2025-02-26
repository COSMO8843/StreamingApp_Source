const { app, BrowserWindow, session } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    // Correct the uBlock Origin extension path
    const ublockPath = path.join(__dirname, 'uBlock-master'); // Update this path to where you extracted uBlock Origin
    win.webContents.session.loadExtension(ublockPath);

    // Block pop-up windows by intercepting new window requests
    win.webContents.setWindowOpenHandler(() => {
        return { action: 'deny' }; 
    });

    win.loadURL('https://example.com/'); 
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
