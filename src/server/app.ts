const express = require('express');
const helmet = require('helmet');
const https = require('https');
const fs = require('fs');
const socket = require('socket.io');
const cors = require('cors');
const path = require('path');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const version = require('../../package.json');
import pos from '../pos';
import windowManager from "../classes/window-manager";
import PosHandler from './poshandler';

const app = express();

const crtFolder: string = process.env.NODE_ENV === "production" ?
    path.join(__dirname, '..', '..', '..', 'crt/') :
    path.join(__dirname, '..', '..', 'crt/');

if(!/[A-Z][A-Z0-9_]*/i.test(crtFolder)) {
    throw new Error('Invalid crt folder');
}

const options = {
    key: fs.readFileSync(crtFolder + 'localhost.key'),
    cert: fs.readFileSync(crtFolder + 'localhost.crt')
};

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: false,
    optionsSuccessStatus: 200
};

const csrfProtection = csrf({cookie: true});

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}));
app.use(csrfProtection);
app.use(cors(corsOptions));
app.use(hpp());
app.use(helmet.noSniff());

const server = https.createServer(options, app);
https.globalAgent.maxSockets = 3;
const io = socket(server, {cookie: false, serveClient: false});
const poshandler = new PosHandler(io, pos);

export default class Server {
    start() {

        pos.autoconnect();

        function updateClientCount(count) {
            clientsCount = count;
            let win = windowManager.getMainWindow();
            if (win) {
                win.webContents.send('count', count);
            }
        }

        let clientsCount = 0;
        io.on('connection', (socket) => {
            updateClientCount(clientsCount + 1);

            pos.on('port_opened', (port) => {
                io.emit('event.port_opened', port)
            })

            pos.on('port_closed', () => {
                io.emit('event.port_closed');
            })

            socket.on('disconnect', () => {
                updateClientCount(clientsCount - 1);
            });

            socket.on('getVersion', () => {
                io.emit('getVersion.response', version);
            });

            socket.on('openPort', ({port, baudrate, eventName}) => {
                poshandler.openPort(port, baudrate, eventName)
            });

            socket.on('closePort', ({eventName}) => {
                poshandler.closePort(eventName);
            });

            socket.on('getPortStatus', ({eventName}) => {
                poshandler.getPortStatus(eventName);
            });

            socket.on('listPorts', ({eventName}) => {
                poshandler.listPorts(eventName);
            });

            socket.on('autoconnect', ({baudrate, eventName}) => {
                poshandler.autoConnect(baudrate, eventName);
            });

            socket.on('poll', ({eventName}) => {
                poshandler.poll(eventName);
            });

            socket.on('loadKeys', ({eventName}) => {
                poshandler.loadKeys(eventName);
            });

            socket.on('closeDay', ({eventName}) => {
                poshandler.closeDay(eventName);
            });

            socket.on('getTotals', ({eventName}) => {
                poshandler.getTotals(eventName);
            });

            socket.on('getLastSale', ({eventName}) => {
                poshandler.getLastSale(eventName);
            });

            socket.on('salesDetail', ({printOnPos, eventName}) => {
                poshandler.salesDetail(printOnPos, eventName);
            });

            socket.on('refund', ({operationId, eventName}) => {
                poshandler.refund(operationId, eventName);
            });

            socket.on('changeToNormalMode', ({eventName}) => {
                poshandler.changeToNormalMode(eventName);
            });

            socket.on('sale', ({amount, ticket, eventName}) => {
                poshandler.sale(amount, ticket, eventName);
            });

            socket.on('multicodeSale', ({amount, ticket, commerceCode = '0', eventName}) => {
                poshandler.multicodeSale(amount, ticket, commerceCode, eventName);
            });
        });

        server.listen(8090, 'localhost', () => {
            console.log('listening on *:8090');
        });
    }
}

