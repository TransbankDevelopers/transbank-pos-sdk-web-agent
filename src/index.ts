import { app, BrowserWindow, ipcMain, Tray, Menu} from 'electron';
import path from 'path'
import pos from './pos'
import windowManager from "./classes/window-manager"
ipcMain.handle('connect-to-pos', (event, ...args) => {
  pos.autoconnect().then((port) => {
    if (port) {
      console.log('Connected to ', port.path)
    }
  });
})
import Server from './server/app';
const server = new Server();

var AutoLaunch = require('auto-launch');
var autoLauncher = new AutoLaunch({
  name: "MyApp"
});

// Checking if autoLaunch is enabled, if not then enabling it.
autoLauncher.isEnabled().then(function(isEnabled) {
  if (isEnabled) return;
  autoLauncher.enable();
}).catch(function (err) {
  throw err;
});

console.log = (...args) => {
  let win = windowManager.getMainWindow();
  if (win !== null) {
    win.webContents.send('log', [...args])
  } else {
    console.log(...args);
  }
}


declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}


const createWindow = (): BrowserWindow => {
  // Create the browser window.
  let mainWindow = new BrowserWindow({
    height: 390,
    width: 450,
    icon: path.join(__dirname, '../../src/assets/icons/AppIcon.icns'),
    webPreferences: {
      nodeIntegration: true,
    }
  });

  mainWindow.removeMenu();

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.on('close', function() {
    windowManager.setMainWindow(null);
  });

  mainWindow.webContents.send('count', "10")
  windowManager.setMainWindow(mainWindow);

  server.start()


  let tray = null;
  mainWindow.on('minimize', function (event) {
      event.preventDefault();
      mainWindow.hide();
      tray = createTray(mainWindow);
  });

  mainWindow.on('restore', function (event) {
      mainWindow.show();
      tray.destroy();
  });
  
  return mainWindow;

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const createTray = (window:BrowserWindow) => {
    let appIcon = new Tray(path.join(__dirname, '../../src/assets/tbk.png'));
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Mostrar', click: function () {
                window.show();
            }
        },
        {
            label: 'Salir', click: function () {
                app.quit();
            }
        }
    ]);

    appIcon.on('double-click', function (event) {
        window.show();
    });
    appIcon.setContextMenu(contextMenu);
    return appIcon;
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
