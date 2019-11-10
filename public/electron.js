const electron = require('electron');
const app = electron.app;
const log = require('electron-log');
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const { session } = require('electron');

if (isDev) {
  require('electron-reload');
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1281,
    height: 800,
    minWidth: 1281,
    minHeight: 800,
    backgroundColor: '#3E98E2',
    icon: path.join(__dirname, 'assets/icon.icns'),
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : url.format({
          pathname: path.join(__dirname, 'index.html'),
          protocol: 'file:',
          slashes: true
        })
  );
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => {
    session.defaultSession.clearStorageData(
      {
        // without set origin options
        storages: ['localstorage', 'caches', 'indexdb']
      },
      () => {
        // verify if storages got cleared.
      }
    );
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
