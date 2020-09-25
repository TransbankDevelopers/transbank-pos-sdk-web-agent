class WindowManager {
    constructor() {
        this.mainWindow = null;
    }
    setMainWindow(browserWindow) {
        this.mainWindow = browserWindow
    }

    getMainWindow() {
        return this.mainWindow;
    }
}

export default (new WindowManager());
