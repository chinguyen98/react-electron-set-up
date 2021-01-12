const { app, ipcMain } = require('electron');

module.exports = ipcMain.on('quit-app', (e, arg) => {
  app.quit();
})