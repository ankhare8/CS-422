
const admin = require('firebase-admin');
require ('dotenv').config()

//create a new firestore doc for the user
const createNewUserDoc = async (req, res) => {
    try {
        const { uid } = req.user;
        await admin.firestore().collection('users').doc(uid).set({
        user: uid
        });
        console.log('User document created successfully');
    } catch (error) {
        console.error('Error creating user document:', error);
        throw new Error('Error creating user document: ' + error.message);
    }
}

module.exports = {
    createNewUserDoc
}