const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev');
const path = require('path');

let mainwindow;

function createWindow() {
  mainwindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
    }
  });

  const startUrl = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;
  mainwindow.loadURL(startUrl);

  mainwindow.once('ready-to-show', () => { mainwindow.show() });
  mainwindow.on('closed', () => {
    mainwindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
});