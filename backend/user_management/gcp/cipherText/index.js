var admin = require("firebase-admin");
var CryptoJS = require("crypto-js");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.cipherText = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', '*');
        res.set('Access-Control-Allow-Headers', '*');
        res.status(204).send('');
    }
    const db = admin.firestore();
    var ciphertext = CryptoJS.AES.encrypt(req.body.text, req.body.key).toString();
    const message = await db.collection('cipher_text').add({
        key: req.body.key,
        text: req.body.text,
        email:req.body.email
    });
    
    res.status(200).send(ciphertext)
}