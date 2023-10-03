import { POSIntegrado } from "transbank-pos-sdk";

const pos = new POSIntegrado();
pos.setDebug(true);

export default pos;
