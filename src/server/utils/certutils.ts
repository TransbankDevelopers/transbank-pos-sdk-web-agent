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

enum certType {
    key = 'keyFile',
    crt = 'crtFile'
}

const certificateFullPath = {
    keyFile: `${getCrtPath()}localhost.key`,
    crtFile: `${getCrtPath()}localhost.crt`
}

function checkCertExists(certificate?: certType): boolean {
    if ( certificate ) {
        return fs.existsSync(certificateFullPath[certificate]);
    }
    let status = true;
    const files = Object.values(certificateFullPath)
    files.map( file => {
        if ( !fs.existsSync(file) ) {
            status = false;
        }
    } )
    return status;
}

function getCertOptions(): {key: Buffer|false, cert: Buffer|false} {
    return {
        key: checkCertExists(certType.key) &&
            fs.readFileSync(certificateFullPath.keyFile),
        cert: checkCertExists(certType.crt) &&
            fs.readFileSync(certificateFullPath.crtFile)
    };
}

export {checkCertExists, getCrtPath, getCertOptions};
