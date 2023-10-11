var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {cookie: false, serveClient: false});
import pos from '../pos';
import windowManager from "../classes/window-manager";
import posHandler from './poshandler';
const poshandler = new posHandler(io, pos);

export default class Server {
    start() {
        app.get('/', (req, res) => {
            res.send('<h1 style="font-family: sans-serif;">Transbank POS Client está activo ✅</h1>');
        });

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


        });

        http.listen(8090, 'localhost', () => {
            console.log('listening on *:8090');
        });

    }
}

