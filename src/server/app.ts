var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {cookie: false, serveClient: false});
import pos from '../pos';
import windowManager from "../classes/window-manager";
import {version} from '../../package.json';

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
                pos.connect(port, baudrate).then((response) => {
                    io.emit(eventName, { success: true, response});
                }).catch((e) => {
                    io.emit(eventName, { success: false, message: e.toString()});
                })
            });

            socket.on('closePort', ({eventName}) => {
                pos.disconnect().then((response) => {
                    io.emit(eventName, {success: true, response});
                }).catch((e) => {
                    io.emit(eventName, {success: false, message: e.toString()});
                })
            });

            socket.on('getPortStatus', ({eventName}) => {
                let response = {
                    connected: pos.connected,
                    activePort: pos.getConnectedPort()
                }
                io.emit(eventName, {success: true, response});
            });

            socket.on('listPorts', ({eventName}) => {
                pos.listPorts().then((response) => {
                    io.emit(eventName, {success: true, response});
                }).catch((e) => {
                    io.emit(eventName, { success: false, message: e.toString()});
                });

            });

            socket.on('autoconnect', ({eventName}) => {
                pos.autoconnect().then((response) => {
                    io.emit(eventName, { success: true, response});
                }).catch((e) => {
                    io.emit(eventName, { success: false, message: e.toString()});
                })
            });

            socket.on('poll', ({eventName}) => {
                pos.poll().then((response) => {
                    io.emit(eventName, { success: true, response});
                }).catch((e) => {
                    io.emit(eventName, { success: false, message: e.toString()});
                })
            });

            socket.on('loadKeys', ({eventName}) => {
                pos.loadKeys().then((response) => {
                    io.emit(eventName, { success: true, response});
                }).catch((e) => {
                    io.emit(eventName, { success: false, message: e.toString()});
                })
            });

            socket.on('closeDay', ({eventName}) => {
                pos.closeDay().then((response) => {
                    io.emit(eventName, { success: true, response});
                }).catch((e) => {
                    io.emit(eventName, { success: false, message: e.toString()});
                })
            });

            socket.on('getTotals', ({eventName}) => {
                pos.getTotals().then((response) => {
                    io.emit(eventName, { success: true, response});
                }).catch((e) => {
                    io.emit(eventName, { success: false, message: e.toString()});
                })
            });

            socket.on('getLastSale', ({eventName}) => {
                pos.getLastSale().then((response) => {
                    io.emit(eventName, { success: true, response});
                }).catch((e) => {
                    io.emit(eventName, { success: false, message: e.toString()});
                })
            });

            socket.on('salesDetail', ({printOnPos, eventName}) => {
                pos.salesDetail(printOnPos).then((response) => {
                    io.emit(eventName, { success: true, response});
                }).catch((e) => {
                    io.emit(eventName, { success: false, message: e.toString()});
                })
            });

            socket.on('refund', ({operationId, eventName}) => {
                pos.refund(operationId).then((response) => {
                    io.emit(eventName, { success: true, response});
                }).catch((e) => {
                    io.emit(eventName, { success: false, message: e.toString()});
                })
            });

            socket.on('changeToNormalMode', ({printOnPos, eventName}) => {
                pos.changeToNormalMode(printOnPos).then((response) => {
                    io.emit(eventName, { success: true, response});
                }).catch((e) => {
                    io.emit(eventName, { success: false, message: e.toString()});
                })
            });

            socket.on('sale', ({amount, ticket, eventName}) => {
                pos.sale(amount, ticket, true, (data) => {
                    io.emit('sale_status.response', data);
                }).then((response) => {
                    io.emit(eventName, { success: true, response});
                }).catch((e) => {
                    io.emit(eventName, { success: false, message: e.toString()});
                })
            });

            socket.on('multicodeSale', ({amount, ticket, commerceCode = '0', eventName}) => {
                pos.multicodeSale(amount, ticket, commerceCode, true, (data) => {
                    io.emit('multicodeSale_status.response', data);
                }).then((response) => {
                    io.emit(eventName, { success: true, response});
                }).catch((e) => {
                    io.emit(eventName, { success: false, message: e.toString()});
                })
            });


        });

        http.listen(8090, 'localhost', () => {
            console.log('listening on *:8090');
        });

    }
}

