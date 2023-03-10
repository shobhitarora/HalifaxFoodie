var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.verifySecurityQnA = async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', '*');
        res.set('Access-Control-Allow-Headers', '*');
        res.status(204).send('');
    }
    const db = admin.firestore();
    const user = db.collection('security_QnA');
    const answers = await user.where('email', '==', req.body.email).get();
    console.log(answers)
    if (answers.empty) {
        res.status(400).send("fail");
        return;
    }
    answers.forEach(doc => {
        if (doc.data().securityA1 === req.body.securityA1 && doc.data().securityA2 === req.body.securityA2) {
            res.status(200).send("success");
            console.log(doc.id, '=>', doc.data());
            return;
        }
    });
    res.status(400).send("fail");
    return;
}