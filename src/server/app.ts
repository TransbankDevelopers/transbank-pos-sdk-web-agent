var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {cookie: false, serveClient: false});
import pos from '../pos';
import windowManager from "../classes/window-manager"

export default class Server {
    start() {
        app.get('/', (req, res) => {
            res.send('<h1 style="font-family: sans-serif;">Transbank POS Client is active ✅</h1>');
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

            socket.on('disconnect', () => {
                updateClientCount(clientsCount - 1);
            });

            socket.on('openPort', ({port, baudrate}) => {
                pos.connect(port, baudrate).then((response) => {
                    io.emit('openPort.response', { success: true, response});
                }).catch((e) => {
                    io.emit('openPort.response', { success: false, message: e.toString()});
                })
            });

            socket.on('closePort', () => {
                pos.disconnect().then((response) => {
                    io.emit('closePort.response', {success: true, response});
                }).catch((e) => {
                    io.emit('closePort.response', {success: false, message: e.toString()});
                })
            });

            socket.on('getPortStatus', () => {
                let response = {
                    connected: pos.connected,
                    activePort: pos.getConnectedPort()
                }
                io.emit('getPortStatus.response', {success: true, response});
            });

            socket.on('listPorts', () => {
                pos.listPorts().then((response) => {
                    io.emit('listPorts.response', {success: true, response});
                }).catch((e) => {
                    io.emit('listPorts.response', { success: false, message: e.toString()});
                });

            });

            socket.on('autoconnect', () => {
                pos.autoconnect().then((response) => {
                    io.emit('autoconnect.response', { success: true, response});
                }).catch((e) => {
                    io.emit('autoconnect.response', { success: false, message: e.toString()});
                })
            });

            socket.on('poll', () => {
                pos.poll().then((response) => {
                    io.emit('poll.response', { success: true, response});
                }).catch((e) => {
                    io.emit('poll.response', { success: false, message: e.toString()});
                })
            });

            socket.on('loadKeys', () => {
                pos.loadKeys().then((response) => {
                    io.emit('loadKeys.response', { success: true, response});
                }).catch((e) => {
                    io.emit('loadKeys.response', { success: false, message: e.toString()});
                })
            });

            socket.on('closeDay', () => {
                pos.closeDay().then((response) => {
                    io.emit('closeDay.response', { success: true, response});
                }).catch((e) => {
                    io.emit('closeDay.response', { success: false, message: e.toString()});
                })
            });

            socket.on('getTotals', () => {
                pos.getTotals().then((response) => {
                    io.emit('getTotals.response', { success: true, response});
                }).catch((e) => {
                    io.emit('getTotals.response', { success: false, message: e.toString()});
                })
            });

            socket.on('getLastSale', () => {
                pos.getLastSale().then((response) => {
                    io.emit('getLastSale.response', { success: true, response});
                }).catch((e) => {
                    io.emit('getLastSale.response', { success: false, message: e.toString()});
                })
            });

            socket.on('salesDetail', ({printOnPos}) => {
                pos.salesDetail(printOnPos).then((response) => {
                    io.emit('salesDetail.response', { success: true, response});
                }).catch((e) => {
                    io.emit('salesDetail.response', { success: false, message: e.toString()});
                })
            });

            socket.on('refund', ({operationId}) => {
                pos.refund(operationId).then((response) => {
                    io.emit('refund.response', { success: true, response});
                }).catch((e) => {
                    io.emit('refund.response', { success: false, message: e.toString()});
                })
            });

            socket.on('changeToNormalMode', ({printOnPos}) => {
                pos.changeToNormalMode(printOnPos).then((response) => {
                    io.emit('changeToNormalMode.response', { success: true, response});
                }).catch((e) => {
                    io.emit('changeToNormalMode.response', { success: false, message: e.toString()});
                })
            });

            socket.on('sale', ({amount, ticket}) => {
                pos.sale(amount, ticket, true, (data) => {
                    io.emit('sale_status.response', data.split('|'));
                }).then((response) => {
                    io.emit('sale.response', { success: true, response});
                }).catch((e) => {
                    io.emit('sale.response', { success: false, message: e.toString()});
                })
            });

            socket.on('multicodeSale', ({amount, ticket, commerceCode = '0'}) => {
                pos.multicodeSale(amount, ticket, commerceCode, true, (data) => {
                    io.emit('multicodeSale_status.response', data.split('|'));
                }).then((response) => {
                    io.emit('multicodeSale.response', { success: true, response});
                }).catch((e) => {
                    io.emit('multicodeSale.response', { success: false, message: e.toString()});
                })
            });


        });

        http.listen(8090, 'localhost', () => {
            console.log('listening on *:8090');
        });

    }
}

