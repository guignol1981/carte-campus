import admin = require('firebase-admin');
import functions = require('firebase-functions');
const Busboy = require('busboy');
const path = require('path');
const os = require('os');
const fs = require('fs');
import fieldTypeServiceJSON from './field-type-service.json';

let adminConfig = functions.config().firebase;

if (process.env.FUNCTIONS_EMULATOR === 'true') {
    process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
    adminConfig = {
        projectId: 'monportail-test'
    };
}

admin.initializeApp(adminConfig);

exports.fileToFirebase = functions.https.onRequest((req, res) => {
    functions.logger.log('fichier recu');
    res.set('Access-Control-Allow-Origin', '*');

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
            _filename: any,
            _encoding: any,
            _mimetype: any
        ) => {
            filepath = path.join(os.tmpdir(), fieldname);

            uploads[fieldname] = { file: filepath };

            file.pipe(fs.createWriteStream(filepath));
        }
    );

    busboy.on('finish', async () => {
        for (const name in uploads) {
            const upload = uploads[name];
            const file = (upload as any).file;

            res.write(`${file}\n`);

            const data = fs.readFileSync(filepath, 'utf8');

            await Promise.all(
                JSON.parse(data).map(async (d: any) => {
                    const adresseRaw = d.field_adresse[0]?.processed ?? '';
                    const adresse = adresseRaw.replace(/<[^>]*>?/gm, '');

                    await admin
                        .firestore()
                        .collection('places')
                        .doc()
                        .create({
                            name: d.field_nom[0]?.value ?? '',
                            category:
                                fieldTypeServiceJSON.find(
                                    fts =>
                                        fts.tid[0]?.value ===
                                        d.field_type_service_ul[0]?.target_id
                                )?.name[0]?.value ?? '',
                            adresse: adresse,
                            website: d.field_lien_site_web[0]?.uri ?? '',
                            email: d.field_courriel[0]?.value ?? '',
                            phoneNumber: d.field_telephone[0]?.value ?? '',
                            tollFreeNumber:
                                d.field_ligne_sans_frais[0]?.value ?? '',
                            markerCoordinates: new admin.firestore.GeoPoint(
                                d.field_position[0]?.lat ?? 0,
                                d.field_position[0]?.lng ?? 0
                            )
                        });
                })
            );

            fs.unlinkSync(file);
        }

        res.end();
        return functions.logger.log('finish');
    });

    busboy.end(req.rawBody);
});
