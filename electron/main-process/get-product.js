const { ipcMain } = require('electron');
const { getAllProducts } = require('../services/products');

module.exports = ipcMain.handle('get-products', (e, arg) => {
  return new Promise((resolve, reject) => {
    try {
      getAllProducts()
        .then(products => resolve(products))
        .catch(err => { throw err });
    } catch (err) {
      reject(err);
    }
  });
});