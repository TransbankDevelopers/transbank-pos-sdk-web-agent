import { POS } from 'transbank-pos-sdk';

const pos = new POS();
pos.setDebug(true);

export default pos;
