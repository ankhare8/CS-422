const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.serviceAccountKey)),
    projectId: "budget-app-fb637"
});

console.log('connected to firebase')


const db = admin.firestore();
const auth = admin.auth()
module.exports = { db, auth, admin }