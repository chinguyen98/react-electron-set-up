const { Sequelize } = require('sequelize');
const isDev = require('electron-is-dev');
const path = require('path');

const db = new Sequelize({
  dialect: 'sqlite',
  storage: isDev
    ? path.join(__dirname, '../db/test.db')
    : path.join(process.resourcesPath, 'db/test.db'),
  define: {
    timestamps: false,
  }
});

db.authenticate()
  .then(() => { console.log('Connect to sqlite successfully!') })
  .catch((err) => { console.log(err) });

module.exports = db;