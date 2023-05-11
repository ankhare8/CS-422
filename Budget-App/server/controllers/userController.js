const { db, admin } = require('../src/firebase')

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

const getUserDoc = async (req, res) => {
    try {
        const { uid } = req.user;
        const userDocRef = db.collection('users').doc(uid);
        const userDoc = await userDocRef.get();
        if (!userDoc.exists) {
          return res.status(404).json({ message: 'User not found' });
        }
        const userData = userDoc.data();
        return res.status(200).json(userData)
    } catch (error) {
        console.error('Error creating user document:', error);
        return res.status(400).json({message: 'Error creating user document: ' + error.message});
    }
}

  
const updateUserDoc = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Unable to update user: Missing name in req.body" });
    }

    try {
    const userId = req.user.uid;
      const userDocRef = db.collection('users').doc(userId);
      await userDocRef.update({ name });
      return res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(`Error updating user: ${error}`);
        return res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createNewUserDoc,
    getUserDoc,
    updateUserDoc
}