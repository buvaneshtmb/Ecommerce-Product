const { ProductModel } = require('../schema/ProductSchema')
const { UserModel } = require('../schema/UserSchema')
// const { OrderModel } = require('../schema/OrderSchema')
const { BuyModel } = require('../schema/BuySchema')
const Razorpay = require('razorpay')
const { RAZORPAY_KEY_ID, RAZORPAY_SECRET } = require('../dbConfig')
const cloudinary = require('../cloudinary')




const handleHome = async (req, res, next) => {
    res.send(`<h1>Express Home Page ! Please visit proper route for data</h1>`)
}

const handleAddProduct = async (req, res, next) => {
    const { productName, image, quantity, originalPrice, sellingPrice, decscription } = req.body
    try {
        let result = await cloudinary.uploader.upload(image, {
            folder: "products"
        })
        console.log(req.body, "ethukkuda")
        console.log("ddeiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
        let prod = await ProductModel.create({
            productName,
            quantity,
            image: {
                public_id: result.public_id,
                url: result.secure_url
            },
            originalPrice,
            sellingPrice,
            decscription
        })
        res.status(201).send({
            "message": "User", prod
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error", error })
    }
}

const handleGetAllProduct = async (req, res, next) => {
    try {
        let product = await ProductModel.find()
        res.status(200).send({
            message: "data fetched successfull",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error", error })
    }
}

const handleGetOneProduct = async (req, res, next) => {
    try {
        let product = await ProductModel.findOne({ _id: req.params.id })
        res.status(200).send({
            message: "data fetched successful",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error", error })
    }
}

const handleUpdateProduct = async (req, res, next) => {
    // const { productName, image, quantity, originalPrice, sellingPrice, decscription } = req.body
    // console.log(productName, image, quantity, originalPrice, sellingPrice, decscription,
    // req.params.id, "enna image da ithu line no 73")
    try {
        let result = await cloudinary.uploader.upload(image, {
            folder: "products"
        })
        console.log(result, "ennnnnndeyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
        let product = await ProductModel.updateOne({ _id: req.params.id }, {
            $set: {

                productName: `${req.body.productName}`,
                quantity: `${req.body.quantity}`,
                image: `${req.body.image}`,
                originalPrice: `${req.body.originalPrice}`,
                sellingPrice: `${req.body.sellingPrice}`,
                decscription: `${req.body.decscription}`
            }
        }

        )
        console.log(product, ennapppaaaaaaaaa)
        res.status(200).send({
            message: "Data Updated Successfully",
            product
        })
    } catch (error) {
        console.log(error, "hlooooooooooooooooooooooooooooooooooooooooooooodddddddddddddddddddddddddddddddddddddddddd")
        res.status(500).send({ message: "Internal Server Error", error })
    }
}

const handleDeleteProduct = async (req, res, next) => {
    try {
        let product = await ProductModel.deleteOne({ _id: req.params.id })
        res.status(200).send({
            message: "Data deleted",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error", error })
    }
}


///model used for orderd------------------------------------------------//////////////////
// const handleOrder = async (req, res, next) => {
//     try {
//         let order = await OrderModel.create(req.body)
//         res.status(201).send({
//             message: "Placing Order Succesfully",
//             order
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({ message: "Internal Server Error", error })
//     }
// }

//-----------------------------Buy MOdel--------------------------------------------

const handleGetBuyProductByAdmin = async (req, res, next) => {
    try {
        let buy = await BuyModel.find()
        res.status(200).send({
            message: "Orderd Fetched Successfully",
            buy
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error", error })
    }
}

let handleGetBuyProductByUser = async (req, res, next) => {
    try {
        let buy = await BuyModel.find({ userEmail: req.params.userEmail }, {
            razorpay: 0, isPaid: 0,
            createdAt: 0, _id: 0, userEmail: 0
        })
        res.status(200).send({
            message: "Get User Successfully",
            buy
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error", error })
    }
}



const handleGetBuyOrder = async (req, res, next) => {
    console.log("ohooooooooooooooo")
    try {
        res.status(200).send({
            key: RAZORPAY_KEY_ID
        })
    } catch (error) {

    }
}

const handleBuyOrder = async (req, res, next) => {
    try {
        const instance = new Razorpay({
            key_id: RAZORPAY_KEY_ID,
            key_secret: RAZORPAY_SECRET
        })
        const options = {
            amount: req.body.amount,
            currency: 'INR'
        }
        const order = await instance.orders.create(options)
        if (!order) {
            return res.status(500).send('some error occured')
        } else {
            res.status(200).send(order)
            console.log(order)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
// 
const handlePayOrder = async (req, res, next) => {
    try {
        let { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature,
            userEmail, productName, image, quantity } = req.body;
        console.log(req.body)
        let data = await BuyModel.create({
            isPaid: true,
            amount: amount,
            userEmail,
            productName,
            image,
            quantity,
            razorpay: {
                orderId: razorpayOrderId,
                paymentId: razorpayPaymentId,
                signature: razorpaySignature
            },


        })
        res.status(200).send({
            message: 'Payment was Succesfull',
            data
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


const handleListOrders = async (req, res, next) => {
    try {
        let orders = await BuyModel.find()
        res.status(200).send({
            orders
        })
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = {
    handleHome,
    handleAddProduct,
    handleGetAllProduct,
    handleGetOneProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    // handleOrder,
    // handleGetOrderProduct,
    handleGetBuyProductByAdmin,
    handleGetBuyProductByUser,
    handleGetBuyOrder,
    handleBuyOrder,
    handlePayOrder,
    handleListOrders
}