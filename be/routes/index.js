var express = require('express');
var router = express.Router();
const indexController = require('../controllers/index')
const auth = require('../common/auth')


/* GET home page. */
router.get('/', indexController.handleHome);

//Add Product
router.post('/add-product', auth.validate, auth.roleAdmin, indexController.handleAddProduct)

//Get the All Product
router.get('/get-allproduct', indexController.handleGetAllProduct)

//Get Single Product
router.get('/get-oneproduct/:id', indexController.handleGetOneProduct)

//Update the Product
router.put('/update-product/:id', auth.validate, auth.roleAdmin, indexController.handleUpdateProduct)

//Delete the Data
router.delete('/delete-product/:id', auth.validate, auth.roleAdmin, indexController.handleDeleteProduct)

//--------------------------------------ORDER-----------------------------------------------------------------//

// Get all the Data from Users Order by admin
router.get('/getallbuyproduct', auth.validate, auth.roleAdmin, indexController.handleGetBuyProductByAdmin)

//get Buy Product by User
router.get('/get-buy-product/:userEmail', auth.validate,indexController.handleGetBuyProductByUser)

// //Post the Order by User
// router.post('/orderproduct', auth.validate, indexController.handleOrder)

//----------------------------------------New Order------------------------------------------------------------//
router.get("/get-razorpay-key", auth.validate, indexController.handleGetBuyOrder)

router.post('/create-order', auth.validate, indexController.handleBuyOrder)

router.post('/pay-order', auth.validate, indexController.handlePayOrder)

router.get('/list-orders', auth.validate, indexController.handleListOrders)

module.exports = router;
