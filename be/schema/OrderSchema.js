const mongoose = require('mongoose')
const validator = require('validator')

const OrderSchema = new mongoose.Schema({
    userEmail:{
        type:String,
        required:true
    },
    productName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        default:"your ordered is packed"
    },
    deliveryDate:{
        type:String,
        default:"Your Order will be delivered in 6 days"
    },
    createdAt: { type: Date, default: Date.now() }

},
    {
        collection: 'order',
        versionKey: false
    })

const OrderModel = mongoose.model('order', OrderSchema)
module.exports = { OrderModel }