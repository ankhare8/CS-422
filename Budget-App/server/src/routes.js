const express = require('express');
const verifyToken = require('../middleware/verifyToken')
const userController = require('../controllers/userController')
const listController = require('../controllers/listController')
const router = express.Router();

//user routes
router.post('/newUser', userController.createNewUserDoc);


//wishlist routes
router.get('/alllists', verifyToken, userController.getAllLists);
router.get('/list', verifyToken, listController.getList);
router.post('/list', verifyToken, listController.postList);
router.put('/list', verifyToken, listController.putList);
router.delete('/list', verifyToken,  listController.getList);