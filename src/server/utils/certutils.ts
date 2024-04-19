import fs from 'fs';
import path from 'path';

function getCrtPath(): string {
    const crtPath = process.env.NODE_ENV === "production" ?
        path.join(__dirname, '../../../crt/') :
        path.join(__dirname, '../../crt/');
    if(!/[A-Z][A-Z0-9_ -]*/i.test(crtPath)) {
        throw new Error(`Invalid crt folder: ${crtPath}`);
    }
    return crtPath;
}

const certificateFullPath = {
    keyFile: `${getCrtPath()}localhost.key`,
    crtFile: `${getCrtPath()}localhost.crt`
}

function checkCertExists(): boolean {
    let status = true;
    const files = Object.values(certificateFullPath)
    files.map( file => {
        if ( !fs.existsSync(file) ) {
            status = false;
        }
    } )
    return status;
}

export {checkCertExists, getCrtPath, certificateFullPath};
