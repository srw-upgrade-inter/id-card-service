const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const pm2 = require("pm2");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}
const configProcess = {
  script: path.join(__dirname, "bin/id-card-service.exe"),
  name: "id-card",
};

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 250,
    // frame: false,
    resizable: false,
    icon: path.join(__dirname, "images/icon.png"),
    webPreferences: {
      // preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.removeMenu();

  // Create the browser window.

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  mainWindow.webContents.ipc.on("update-status", (_event, status,path) => {
    if (status) {
      configProcess.script = path;
      pm2.start(configProcess, function (err, apps) {
        if (err) {
          console.error(err);
          return pm2.disconnect();
        }

        pm2.list((err, list) => {
          console.log(err, list);

          pm2.restart(configProcess, (err, proc) => {
            // Disconnects from PM2
            pm2.disconnect();
          });
        });
      });
    } else {
      pm2.delete(configProcess.name, function (err, apps) {
        if (err) {
          console.error(err);
          return pm2.disconnect();
        }

        pm2.list((err, list) => {
          console.log(err, list);
        });
      });
    }
  });

  mainWindow.webContents.once("did-finish-load", function () {
    pm2.connect(function (err) {
      if (err) {
        console.error(err);
        process.exit(2);
      }

      pm2.list((err, list) => {
        // console.log("cccc", err, list);
        mainWindow.webContents.send('on-status',list)
      });
    });
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    pm2.delete(configProcess.name, function (err, apps) {
      if (err) {
        console.error(err);
        return pm2.disconnect();
      }

      pm2.list((err, list) => {
        console.log(err, list);
        app.quit();
      });
    });
    
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
