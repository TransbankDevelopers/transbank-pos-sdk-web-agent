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
const {version} = require('../package.json');
import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import './assets/css/index.css';
import spacetime from "spacetime";
console.log('👋 This message is being logged by "renderer.js", included via webpack');

new Vue({
    el: '#app',
    render: (h) => h(App)
})
document.title = `Agente POS v${version} - Transbank`

ipcRenderer.on('count', (event, data) => {
    console.log('count updated', data);
    document.getElementById('usersCount').innerHTML = data
})

ipcRenderer.on('log', (event, data) => {
    console.log('Server log', data);
    store.logs.unshift({message: data.join(''), time: spacetime.now()});
    // document.getElementById('logs').innerHTML = `<span>${data}</span>`+ '\n' + document.getElementById('logs').innerHTML
})
