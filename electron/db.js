const sqlite3 = require('sqlite3');
const isDev = require('electron-is-dev');
const path = require('path');

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

module.exports = db;