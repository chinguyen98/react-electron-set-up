const { app, BrowserWindow, ipcMain } = require('electron')
const isDev = require('electron-is-dev');
const path = require('path');
const sqlite3 = require('sqlite3');

let mainwindow;

function createWindow() {
  mainwindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: isDev
        ? path.join(app.getAppPath(), 'public/preload.js')
        : path.join(app.getAppPath(), 'build/preload.js')
    }
  });

  const startUrl = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;
  mainwindow.loadURL(startUrl);

  mainwindow.once('ready-to-show', () => { mainwindow.show() });
  mainwindow.maximize();
  mainwindow.on('closed', () => {
    mainwindow = null;
  });
}

app.whenReady().then(createWindow);

const db = new sqlite3.Database(
  isDev
    ? path.join(__dirname, '../db/test.db')
    : path.join(process.resourcesPath, 'db/test.db')
  ,
  (err) => {
    if (err) {
      console.log(`Database error: ${err}`)
    } else {
      console.log('Database loaded!');
    }
  }
)

/* Begin listen event on renderer process */
ipcMain.on('quit-app', (e, arg) => {
  app.quit();
  e.reply('Quit!')
})

ipcMain.handle('get-products', (e, arg) => {
  return new Promise((resolve, reject) => {
    try {
      db.serialize(() => {
        db.all('select * from products', (err, row) => {
          if (err)
            throw err;
          else {
            console.log(row)
            resolve(row)
          }
        })
      })
    } catch (err) {
      reject(err);
    }
  })
})

/* End listen event on renderer process */

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
