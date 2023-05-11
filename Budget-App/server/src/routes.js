const express = require('express'); //for http requests
const verifyToken = require('../middleware/verifyToken')
const userController = require('../controllers/userController')
const listController = require('../controllers/listController')
const router = express.Router();

//user routes
router.post('/updateuser', verifyToken, userController.updateUserDoc);
router.get('/getuser', verifyToken, userController.getUserDoc);

/** Get all wishlists and data within each wishlist
 * [{
 *      wishlists: {wishlistdata},
 *      {user: {userdara}
 *  }] = res.data */
router.get('/alllists', verifyToken, listController.getAllWishlists);

/** Return list of meta data for all wishlists
 * { wishlistIds[] } = req.body
 * [{
 *      label: name of wishlist,
 *      value: id of wishlist
 * }] = res.data */
router.get('/allmeta', verifyToken, listController.getWishlistsMetadata);

/** Return list of all items from given lists with additional "wishlistId" property for each item
 * { wishlistIds[] } = req.body
 * items[] = res.data */
router.get('/lists', verifyToken, listController.getItemsFromWishlists);


/** Get data for a list by id
 * { wishlistId } = req.body 
 * {wishlistData} = res.data*/
router.get('/list', verifyToken, listController.getWishlist);

/**Create new wishlist
 * { wishlistData } = req.body
 * Note: wishlistData is an object that contains "name" and "items" with is an array of items */
router.post('/list',verifyToken, listController.createWishlist);


/** Update list by id (stored within wishlistData)
 * { wishlistData } = req.body */
router.post('/updatelist', verifyToken, listController.updateWishlist);

/** Delete items within list
 * { wishlistId, itemIds[] } = req.body */
router.post('/deleteitems', verifyToken, listController.deleteItemsFromWishlist);

/** Updates multiple items within list
 * { wishlistId, items[] } = req.body */
router.post('/updateitems', verifyToken, listController.updateItemsInWishlist);

/** Delete list by id
 * { wishlistId } = req.body */
router.post('/deletelist',  verifyToken, listController.deleteWishlist);

/** Add an item to a wishlist
 * { wishlistId, item } = req.body */
router.post('/item', verifyToken, listController.addItemToWishList);

/** Change a given item within a wishlist
 * { wishlistId, itemId item } = req.body
 * Note: item represents the updated item data*/
router.post('/updateitem', verifyToken, listController.updateItemInWishlist);

/** Delete an item from the wishlist
 * { wishlistId, itemId } = req.body */
router.post('/deleteitem', verifyToken, listController.deleteItemFromWishlist)

module.exports = router;