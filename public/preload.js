const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  quitApp: (args) => ipcRenderer.send('quit-app', args),
  getProducts: (args) => ipcRenderer.invoke('get-products', args),
});