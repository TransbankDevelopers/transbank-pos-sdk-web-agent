/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```\
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

const { ipcRenderer } = require("electron")

import './assets/css/index.css';
import {version} from '../package.json';

console.log('👋 This message is being logged by "renderer.js", included via webpack');

document.title = `Agente POS v${version} - Transbank`
document.getElementById('title').innerHTML += ` v${version}`

ipcRenderer.on('count', (event, data) => {
    console.log('count updated', data);
    document.getElementById('usersCount').innerHTML = data
})

ipcRenderer.on('log', (event, data) => {
    console.log('Server log', data);
    document.getElementById('logs').innerHTML = data + '\n' + document.getElementById('logs').innerHTML
})

let showed = false;
document.getElementById('log_toggle').onclick = function() {
    showed = !showed;
    if (showed) {
        document.getElementById('log_toggle').innerText = 'Ocultar últimos eventos'
        document.getElementById('logs_container').style.display = 'block';
    } else {
        document.getElementById('log_toggle').innerText = 'Mostrar últimos eventos'
        document.getElementById('logs_container').style.display = 'none';
    }

    return false;
}
