// const { firestore } = require("firebase-admin");
// const db = firestore();

//return all lists
const getAllLists = async (req, res) => {
  // we get request from user, send response back, express will take care of it
  try {
    const userId = req.user.uid;
    const wishlistRef = admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("wishlist");
    const snapshot = await wishlistRef.get();
    const wishlistItems = snapshot.docs.map((doc) => doc.data());
    return res.json(wishlistItems);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

// function similar to get All Lists
// get snapshot of list with id

//get all items within list
const getList = async (req, res) => {
  try {
    const listId = req.params.listId;
    const userId = req.user.uid;
    const listRef = admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("lists")
      .doc(listId);
    const doc = await listRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: "List not found" });
    }
    const listData = doc.data();
    return res.json(listData);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

// create a new list
const postList = async (req, res) => {
  try {
    const userId = req.user.uid;
    const listData = {
      name: req.body.name,
      items: [],
    };
    const listRef = admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("lists");
    const newListRef = await listRef.add(listData);
    const newListData = (await newListRef.get()).data();
    return res.status(201).json(newListData);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

// add an item to a list
const postItemToList = async (req, res) => {
  try {
    const userId = req.user.uid;
    const listId = req.params.listId;
    const itemData = {
      name: req.body.name,
      price: req.body.price,
      priority: req.body.priority,
      quantity: req.body.quantity,
    };
    const listRef = admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("lists")
      .doc(listId);
    await listRef.update({
      items: admin.firestore.FieldValue.arrayUnion(itemData),
    });
    const listData = (await listRef.get()).data();
    return res.status(201).json(listData);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const putList = async (req, res) => {
  try {
    const userId = req.user.uid;
    const listId = req.params.listId;
    const newListData = {
      name: req.body.name,
      items: req.body.items,
    };
    const listRef = admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("lists")
      .doc(listId);
    await listRef.set(newListData, { merge: true });
    const updatedListData = (await listRef.get()).data();
    return res.status(200).json(updatedListData);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

//delete existing list
const deleteList = async (req, res) => {
  try {
    const userId = req.user.uid;
    const listId = req.params.listId;
    const listRef = admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("lists")
      .doc(listId);
    await listRef.delete();
    return res.status(204).end();
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

module.exports = {
  getAllLists,
  getList,
  postList,
  postItemToList,
  putList,
  deleteList,
};
