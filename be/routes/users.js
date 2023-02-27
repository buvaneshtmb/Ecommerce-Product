var express = require('express');
var router = express.Router();
const UserController = require('../controllers/users')
const auth = require('../common/auth')

//Signup or Add post
router.post('/signup', UserController.handleSignup);

//email verify
router.get('/:id/verify/:token',UserController.handleEmailVerify)

//Update Profile Image by user
router.put('/profile-update', UserController.handleProfile)

//login
router.post('/login', UserController.handleLogin);

//All user detail
router.get('/details', UserController.handleGetUserDetails)

//single user id(Edit or get single user)
router.get('/one-user/:id', auth.validate, UserController.handleGetUser)

//edit user details
router.put('/update/:id', auth.validate, UserController.handleUpdateUser)

//delete user by admin
router.delete('/del/:id', auth.validate, auth.roleAdmin, UserController.handleDeleteUser)

module.exports = router;
