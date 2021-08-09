import admin = require('firebase-admin');
import functions = require('firebase-functions');
const Busboy = require('busboy');
const path = require('path');
const os = require('os');
const fs = require('fs');

let adminConfig = functions.config().firebase;

if (process.env.FUNCTIONS_EMULATOR === 'true') {
    // process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
    adminConfig = {
        projectId: 'monportail-test'
    };
}

admin.initializeApp(adminConfig);

exports.fileToFirebase = functions.https.onRequest((req, res) => {
    functions.logger.log('fichier recu');

    const busboy = new Busboy({
        headers: req.headers
    });

    const uploads: Record<string, unknown> = {};

    let filepath = '';

    busboy.on(
        'file',
        (
            fieldname: string | number,
            file: { pipe: (arg0: any) => void },
            filename: any,
            encoding: any,
            mimetype: any
        ) => {
            console.log(
                `File [${fieldname}] filename: ${filename}, encoding: ${encoding}, mimetype: ${mimetype}`
            );

            filepath = path.join(os.tmpdir(), fieldname);

            uploads[fieldname] = { file: filepath };

            console.log(`Saving '${fieldname}' to ${filepath}`);

            file.pipe(fs.createWriteStream(filepath));
        }
    );

    // This callback will be invoked after all uploaded files are saved.
    busboy.on('finish', async () => {
        for (const name in uploads) {
            const upload = uploads[name];
            const file = (upload as any).file;

            res.write(`${file}\n`);

            const data = fs.readFileSync(filepath, 'utf8');

            JSON.parse(data).forEach(async (d: string) => {
                console.log(d);
                await admin
                    .firestore()
                    .collection('test')
                    .doc()
                    .create(JSON.parse(d));
            });

            fs.unlinkSync(file);
        }
        res.end();
    });

    // The raw bytes of the upload will be in req.rawBody.  Send it to busboy, and get
    // a callback when it's finished.
    busboy.end(req.rawBody);
});
