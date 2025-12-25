const express = require('express');
const router = express.Router();

// const { logIn } = require('../controllers/authController');
const {
     createUserController,
     getAllUsersController, 
     getUserByIdController,
     updateUserController,
     deleteUserController, 
     getUserSearchByNameController, 
     getUserByTokenController
     }  = require('../controllers/karyawanController');
     
const {
     authenticateVerifyToken, 
     authorizeAdmin,
     tokenExtractor
      } = require("../middlewares/authMiddleware");

// admin 
router.post('/', authenticateVerifyToken, authorizeAdmin, createUserController);
router.put('/:id', authenticateVerifyToken, authorizeAdmin, updateUserController);
router.delete('/:id', authenticateVerifyToken, authorizeAdmin, deleteUserController);

// admin & user
router.get('/', getAllUsersController); 
router.get('/search', getUserSearchByNameController);
router.get('/profile', tokenExtractor, getUserByTokenController);
router.get('/:id', getUserByIdController);

module.exports = router;