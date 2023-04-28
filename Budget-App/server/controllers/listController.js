

//return all lists
const getAllLists = async (req, res) => {
    try{
        const userId = req.user.uid;
        const wishlistRef = admin.firestore().collection('users').doc(userId).collection('wishlist');
        const snapshot = await wishlistRef.get();
        const wishlistItems = snapshot.docs.map(doc => doc.data());
        return res.json(wishlistItems);
    } catch(error){
        return res.status(400).error({"message":  error});
    }
   
}

//get all items within list
const getList = async (req, res) => {
   const listId = req.body;

}

//create new list
const postList = async (req, res) => {
    const {listId, items } = req.body;

}

//update existing list
const putList = async (req, res) => {
    const {listId, items } = req.body;

}

//delete existing list
const deleteList = async(res, req) => {
    const listId = req.body;
}

module.exports = {
    getAllLists,
    getAllLists,
    postList,
    putList,
    deleteList
}