var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
var CryptoJS = require("crypto-js");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.verifyCipher = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', '*');
        res.set('Access-Control-Allow-Headers', '*');
        res.status(204).send('');
    }
    const db = admin.firestore();
    const user = db.collection('cipher_text');
    const cipher = await user.where('email', '==', req.body.email).get();
    if (cipher.empty) {
        res.status(400).send("fail");
        return;
    }
    var decryptCipher;
    cipher.forEach(doc => {
        decryptCipher = CryptoJS.AES.decrypt(doc.data().text, doc.data().key);
        res.status(200).send(decryptCipher);
        if (decryptCipher === req.body.cipherText) {

            res.status(200).send("success");
            return;
        }
    });
    res.status(400).send("fail");
    return;

}