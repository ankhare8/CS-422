const { db, admin } = require('../src/firebase')

//return all lists
const getAllWishlists = async (req, res) => {
  try {
    const userId = req.user.uid;
    const wishlistsRef = db
      .collection("users")
      .doc(userId)
      .collection("wishlists");

    const wishlistsSnapshot = await wishlistsRef.get();
    const wishlistsData = await Promise.all(wishlistsSnapshot.docs.map(async (doc) => {
      const wishlistData = doc.data();
      const itemsSnapshot = await doc.ref.collection("items").orderBy("priority", "desc").get();
      const itemsData = itemsSnapshot.docs.map((itemDoc) => ({
        ...itemDoc.data(),
      }));
      const wishlist = {
        ...wishlistData,
        items: itemsData,
      };
      return wishlist;
    }));

    const userRef =  await db.collection("users").doc(userId).get()
    const userData = userRef.data()

    return res.status(200).json({
      "name": userData.name,
      "wishlistsData": wishlistsData
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
};

const getWishlistsMetadata = async (req, res) => {
  try {
    const userId = req.user.uid;
    const wishlistsRef = db
      .collection("users")
      .doc(userId)
      .collection("wishlists");

    const wishlistsSnapshot = await wishlistsRef.get();
    const wishlistsData = wishlistsSnapshot.docs.map((doc) => ({
      value: doc.id,
      label: doc.data().name,
    }));

    return res.status(200).json(wishlistsData);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
};

//get items from specific wishlists
const getItemsFromWishlists = async (req, res) => {
  const { wishlistIds } = req.query;

  if (!wishlistIds || wishlistIds.length === 0) {
    return res.status(400).json({ message: "Unable to get items: Missing wishlistIds[] in req.body" });
  }

  try {
    const userId = req.user.uid;
    const items = [];

    // Get items from all wishlists
    const getItemsPromises = wishlistIds.map(async (wishlistId) => {
      const wishlistRef = db.collection('users').doc(userId).collection('wishlists').doc(wishlistId);
      const itemsSnapshot = await wishlistRef.collection('items').get();
      const wishlistItems = itemsSnapshot.docs.map((doc) => ({ ...doc.data(), wishlistId }));
      items.push(...wishlistItems);
    });

    await Promise.all(getItemsPromises);

    items.sort((a, b) => a.priority - b.priority);

    return res.status(200).json({ items });

  } catch (error) {
    console.error(`Error getting items: ${error}`);
    return res.status(400).json({ message: error.message });
  }
};



// create a new list
const createWishlist = async (req, res) => {
  const { wishlistData } = req.body

  if( !wishlistData || !wishlistData.id ){
    return res.status(400).json({message: "Unable to create wishlist: Add wishlistData to req.body"})
  }

  try {
    // validateWishlistData(wishlistData)
    const userId = req.user.uid;
    // console.log(userId);
    const userDocRef = db.collection('users').doc(userId);
    
    const wishlistColRef = userDocRef.collection('wishlists');
    
    const wishlistId = wishlistData.id;
    console.log()

    const newWishlistDocRef = wishlistColRef.doc(wishlistId);
   
    const itemsColRef = newWishlistDocRef.collection('items');

    for (const item of wishlistData.items) {
      const itemId = item.id;
      const newItemDocRef = itemsColRef.doc(itemId);
      await newItemDocRef.set(item);
    }

    await newWishlistDocRef.set({
      name: wishlistData.name,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      id: wishlistData.id,
    });

    console.log(`Wishlist "${wishlistData.name}" created for user ${userId}.`);
    return res.status(201).json({message: "Wishlist created"});

  } catch (error) {
    console.error(`Error creating wishlist: ${error}`);
    return res.status(400).json({ message: error });
  }
};

const updateWishlist = async (req, res) => {
  const { wishlistData } = req.body

  if( !wishlistData || !wishlistData.id ){
    return res.status(400).json({message: "Unable to update wishlist: Add wishlist data in req.body"})
  }

  try{
    // validateWishlistData(wishlistData)
    const userId = req.user.uid;

    const wishlistDocRef = db.collection('users').doc(userId).collection('wishlists').doc(wishlistData.id);
    const wishlistDoc = await wishlistDocRef.get();
    if (!wishlistDoc.exists) {
      return res.status(404).json({ message: 'Unable to update wishlist: Wishlist with that Id was not found' });
    }

    const originalItemsSnapshot = await wishlistDocRef.collection('items').get();
    const originalItems = originalItemsSnapshot.docs.map((doc) => ({ ...doc.data() }));

    const newItems = wishlistData.items
   
    // Delete items in original list but not in new list
    const itemsToDelete = originalItems.filter((item) => !newItems.some((newItem) => newItem.id === item.id));
    if(itemsToDelete.length > 0) {
      console.log(itemsToDelete);
      const deleteItemPromises = itemsToDelete.map((item) => wishlistDocRef.collection('items').doc(item.id).delete());
      await Promise.all(deleteItemPromises);
    }

    // Add or update items that are in the new list
    const updateItemPromises = newItems.map((item) => {
      const itemRef =  wishlistDocRef.collection('items').doc(item.id)
      return itemRef.set(item);
    });
    await Promise.all(updateItemPromises);

    // Update wishlist name
    await wishlistDocRef.update({ name: wishlistData.name });
    return res.status(200).json({ message: 'Wishlist updated' });
    
  } catch(error){
    console.log(error)
    return res.status(400).json({ message: error.message });
  }
}

// const updateWishlist = async (req, res) => {
//   const { wishlistData } = req.body

//   if( !wishlistData || !wishlistData.id ){
//     return res.status(400).json({message: "Unable to update wishlist: Add wishlist data in req.body"})
//   }

//   try{
//     // validateWishlistData(wishlistData)
//     const userId = req.user.uid;

//     const wishlistDocRef = db.collection('users').doc(userId).collection('wishlists').doc(wishlistData.id);
//     const wishlistDoc = await wishlistDocRef.get();
//     if (!wishlistDoc.exists) {
//       return res.status(404).json({ message: 'Unable to update wishlist: Wishlist with that Id was not found' });
//     }

//     const originalItemsSnapshot = await wishlistDocRef.collection('items').get();
//     const originalItems = originalItemsSnapshot.docs.map((doc) => ({ ...doc.data() }));

//     const newItems = wishlistData.items
   
//     const batch = db.batch();

//     // Delete items in original list but not in new list
//     const itemsToDelete = originalItems.filter((item) => !newItems.some((newItem) => newItem.id === item.id));
//     if(itemsToDelete.length > 0) {
//       console.log(itemsToDelete);
//       itemsToDelete.forEach((item) => {
//         const itemRef = wishlistDocRef.collection('items').doc(item.id);
//         batch.delete(itemRef);
//       });
//     }

//     // Add or update items that are in the new list
//     newItems.forEach((item) => {
//       const itemRef = wishlistDocRef.collection('items').doc(item.id)
//       batch.set(itemRef, item);
//     });

//     // Update wishlist name
//     batch.update(wishlistDocRef, { name: wishlistData.name });

//     await batch.commit();

//     return res.status(200).json({ message: 'Wishlist updated' });
    
//   } catch(error){
//     console.log(error)
//     return res.status(400).json({ message: error.message });
//   }
// }


const deleteItemsFromWishlist = async (req, res) => {
  const { wishlistId, itemIds } = req.body;
  if (!wishlistId || !itemIds) {
    return res.status(400).json({ message: "Unable to delete items: please provide wishlistId and itemIds[] in req.body" });
  }

  try {
    const userId = req.user.uid;
    const wishlistRef = db.collection('users').doc(userId).collection('wishlists').doc(wishlistId);
    const itemsRef = wishlistRef.collection('items');
    const batch = db.batch();

    // Iterate over the itemIds and delete the corresponding items
    itemIds.forEach((itemId) => {
      const itemRef = itemsRef.doc(itemId);
      batch.delete(itemRef);
    });

    await batch.commit();

    return res.status(200).json({ message: "Items deleted" });

  } catch (error) {
    console.error(`Error deleting items: ${error}`);
    return res.status(400).json({ message: error.message });
  }
}

const updateItemsInWishlist = async (req, res) => {
  const { wishlistId, items } = req.body;
  if (!wishlistId || !items) {
    return res.status(400).json({ message: "Unable to update items: please provide wishlistId and items[] in req.body" });
  }

  try {
    const userId = req.user.uid;
    const wishlistRef = db.collection('users').doc(userId).collection('wishlists').doc(wishlistId);
    const itemsRef = wishlistRef.collection('items');
    const batch = db.batch();

    // Iterate over the items and update the corresponding items
    items.forEach((item) => {
      const itemRef = itemsRef.doc(item.id);
      batch.update(itemRef, item);
    });

    await batch.commit();

    return res.status(200).json({ message: "Items updated" });

  } catch (error) {
    console.error(`Error updating items: ${error}`);
    return res.status(400).json({ message: error.message });
  }
};



//get all items within a specific list
const getWishlist = async (req, res) => {
  const { wishlistId } = req.body;
  if(!wishlistId){
    return res.status(400).json({message: "Unable to get list: Add the id of the list you want to get in req.body"})
  }
  try {
    const userId = req.user.uid;
    const wishlistRef = admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("wishlists")
      .doc(wishlistId);
    
    const wishlistDoc = await wishlistRef.get();
    
    if (!wishlistDoc.exists) {
      return res.status(404).json({ error: "List not found" });
    }

    const itemsSnapshot = await wishlistRef.collection('items').orderBy("priority", "desc").get();

    const wishListData = wishlistDoc.data();
    const itemsData = itemsSnapshot.docs.map((doc) => ({...doc.data() }));
    const wishlist = {
       ...wishListData, 
      items: itemsData
    }
    return res.status(200).json(wishlist);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};



//delete existing list
const deleteWishlist = async (req, res) => {
  const { wishlistId } = req.body;
  if (!wishlistId) {
    return res.status(400).json({ message: "Unable to delete wishlist: Add the id of the list you want to delete to in req.body" });
  }

  try {
    const userId = req.user.uid;
    const wishlistRef = db.collection("users").doc(userId).collection("wishlists").doc(wishlistId);
    const itemsRef = wishlistRef.collection("items");

    // Delete all items in the wishlist
    const itemsSnapshot = await itemsRef.get();
    const deleteItemPromises = itemsSnapshot.docs.map((doc) => doc.ref.delete());
    await Promise.all(deleteItemPromises);

    // Delete the wishlist itself
    await wishlistRef.delete();
    console.log("list deleted");
    return res.status(200).json({ message: "Wishlist deleted" });
  } catch (error) {
    console.error(`Error deleting wishlist: ${error}`);
    return res.status(400).json({ message: error.message });
  }
};


const addItemToWishList = async (req, res) => {
  const { wishlistId, item } = req.body;
  if(!wishlistId || !item){
    let errors = [];

    if(!wishlistId){
      errors.push('Add the id of the list you want to add to in req.body')
    }

    if(!item){
      errors.push('Add the item that you want to add in req.body')
    }

    return res.status(400).json({message: "Unable to add item: " + errors.join(", ")})
  }

  try {
    //validateItem(item)
    const userId = req.user.uid;
    const wishlistRef = db.collection('users').doc(userId).collection('wishlists').doc(wishlistId);

    const itemId = item.id;

    await wishlistRef.collection('items').doc(itemId).set(item);

    return res.status(200).json({
      message: "Item added to wishlist"
    });

  } catch (error) {
    console.error(`Error adding item to wishlist: ${error}`);
    return res.status(400).json({ message: error.message });

  }
}

const updateItemInWishlist = async (req, res) => {
  const { wishlistId, itemId, item } = req.body;
  if( !wishlistId || !itemId || !item ){
    let errors = [];

    if(!wishlistId){
      errors.push('Add the id of the list you want to update in req.body')
    }

    if(!itemId){
      errors.push('Add the id item that you want to update in req.body')
    }


    if(!item){
      errors.push('Add the item that you want to change in req.body')
    }
    return res.status(400).json({message: "Unable to add item: " + errors.join(", ")})
  }

  try {
    //validateItem(item)
    const userId = req.user.uid;
    const wishlistRef = db.collection('users').doc(userId).collection('wishlists').doc(wishlistId);

    const itemRef = wishlistRef.collection('items').doc(itemId);

    await itemRef.update(item);

    return res.status(200).json({message: "Item updated"});

  } catch (error) {
    console.error(`Error updating item: ${error}`);
    return res.status(400).json({ message: error.message });
  }
}

const deleteItemFromWishlist = async (req, res) => {
  const { wishlistId, itemId } = req.body;
  if( !wishlistId || !itemId ){
    let errors = [];

    if(!wishlistId){
      errors.push('Add the id of the list you want to delete in req.body')
    }

    if(!itemId){
      errors.push('Add the id item that you want to delete in req.body')
    }

    return res.status(400).json({message: "Unable to delete item: " + errors.join(", ")})
  }

  try {
    const userId = req.user.uid;
    const wishlistRef = db.collection('users').doc(userId).collection('wishlists').doc(wishlistId);

    const itemRef = wishlistRef.collection('items').doc(itemId);

    await itemRef.delete();

    return res.status(200).json({message: "Item deleted"});

  } catch (error) {
    console.error(`Error deleting item from wishlist: ${error}`);
    return res.status(400).json({ message: error.message });

  }
}


module.exports = {
  getAllWishlists,
  getWishlistsMetadata,
  getItemsFromWishlists,
  getWishlist,
  createWishlist,
  deleteItemsFromWishlist,
  updateItemsInWishlist,
  updateWishlist,
  deleteWishlist,
  addItemToWishList,
  updateItemInWishlist,
  deleteItemFromWishlist
};
