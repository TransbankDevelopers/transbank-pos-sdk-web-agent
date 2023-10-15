import { POSIntegrado } from "transbank-pos-sdk";
import { Server as SocketIOServer } from 'socket.io';

export default class PosHandler {

    pos: POSIntegrado;
    io: SocketIOServer;

    constructor( private socket: SocketIOServer, private posIntegrado: POSIntegrado) {
        this.pos = posIntegrado;
        this.io = socket;
    }

    openPort(port: string, baudrate: number, eventName: string): void {
        this.pos.connect(port, baudrate).then((response) => {
            this.io.emit(eventName, { success: true, response});
        }).catch((e) => {
            this.io.emit(eventName, { success:false, message: e.toString()});
        })
    }
    closePort (eventName: string): void {
        this.pos.disconnect().then((response) => {
            this.io.emit(eventName, {success: true, response});
        }).catch((e) => {
            this.io.emit(eventName, {success: false, message: e.toString()});
        })
    }

    getPortStatus(eventName: string): void {
        const response = {
            connected: this.pos.connected,
            activePort: this.pos.getConnectedPort()
        }
        this.io.emit(eventName, {success: true, response});
    }

    listPorts(eventName: string): void {
        this.pos.listPorts().then((response) => {
            this.io.emit(eventName, {success: true, response});
        }).catch((e) => {
            this.io.emit(eventName, { success: false, message: e.toString()});
        });
    }

    autoConnect(baudrate: number, eventName: number): void {
        this.pos.autoconnect(baudrate).then((response) => {
            this.io.emit(eventName, { success: true, response});
        }).catch((e) => {
            this.io.emit(eventName, { success: false, message: e.toString()});
        })
    }

    poll(eventName: string): void {
        this.pos.poll().then((response) => {
            this.io.emit(eventName, { success: true, response});
        }).catch((e) => {
            this.io.emit(eventName, { success: false, message: e.toString()});
        })
    }

    loadKeys(eventName: string): void {
        this.pos.loadKeys().then((response) => {
            this.io.emit(eventName, { success: true, response});
        }).catch((e) => {
            this.io.emit(eventName, { success: false, message: e.toString()});
        })
    }

    closeDay(eventName: string): void {
        this.pos.closeDay().then((response) => {
            this.io.emit(eventName, { success: true, response});
        }).catch((e) => {
            this.io.emit(eventName, { success: false, message: e.toString()});
        })
    }

    getTotals(eventName: string): void {
        this.pos.getTotals().then((response) => {
            this.io.emit(eventName, { success: true, response});
        }).catch((e) => {
            this.io.emit(eventName, { success: false, message: e.toString()});
        })
    }

    getLastSale(eventName: string): void {
        this.pos.getLastSale().then((response) => {
            this.io.emit(eventName, { success: true, response});
        }).catch((e) => {
            this.io.emit(eventName, { success: false, message: e.toString()});
        })
    }

    salesDetail(printOnPos: boolean, eventName: string): void {
        this.pos.salesDetail(printOnPos).then((response) => {
            this.io.emit(eventName, { success: true, response});
        }).catch((e) => {
            this.io.emit(eventName, { success: false, message: e.toString()});
        })
    }

    refund(operationId: number, eventName: string): void {
        this.pos.refund(operationId).then((response) => {
            this.io.emit(eventName, { success: true, response});
        }).catch((e) => {
            this.io.emit(eventName, { success: false, message: e.toString()});
        })
    }

    changeToNormalMode(eventName: string): void {
        this.pos.changeToNormalMode().then((response) => {
            this.io.emit(eventName, { success: true, response});
        }).catch((e) => {
            this.io.emit(eventName, { success: false, message: e.toString()});
        })
    }

    sale(amount: number, ticket: string, eventName: string): void {
        this.pos.sale(amount, ticket, true, (data) => {
            this.io.emit('sale_status.response', data);
        }).then((response) => {
            this.io.emit(eventName, { success: true, response});
        }).catch((e) => {
            this.io.emit(eventName, { success: false, message: e.toString()});
        })
    }

    multicodeSale(amount: number, ticket: string, commerceCode: string, eventName: string): void {
        this.pos.multicodeSale(amount, ticket, commerceCode, true, (data) => {
            this.io.emit('multicodeSale_status.response', data);
        }).then((response) => {
            this.io.emit(eventName, { success: true, response});
        }).catch((e) => {
            this.io.emit(eventName, { success: false, message: e.toString()});
        })
    }
}
