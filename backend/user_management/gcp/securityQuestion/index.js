var admin = require("firebase-admin");
const uuid = require('uuid');

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.createSecurityQnA = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', '*');
        res.set('Access-Control-Allow-Headers', '*');
        res.status(204).send('');
    }
    const db = admin.firestore();
    // const message="Hello world";
    const message = await db.collection('security_QnA').add({
        uuid:uuid.v4(),
        email: req.body.email,
        securityQ1: req.body.securityQ1,
        securityA1: req.body.securityA1,
        securityQ2: req.body.securityQ2,
        securityA2: req.body.securityA2,
    });
    res.status(200).send(message)
}