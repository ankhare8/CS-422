
//NOTE: this route may not be neccessary, we may just be able to do this client-side in the react
//stay tuned....
const createNewUserDoc = async (req, res) => {
    const {uid, email} = req.body;
}

module.exports = {
    createNewUserDoc
}