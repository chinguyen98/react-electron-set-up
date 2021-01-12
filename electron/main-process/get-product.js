const { ipcMain } = require('electron');
const db = require('../db');

module.exports = ipcMain.handle('get-products', (e, arg) => {
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