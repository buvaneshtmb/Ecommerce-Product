const mongoose = require('mongoose')

const BuySchema = new mongoose.Schema({
    isPaid: { type: Boolean },
    amount: { type: Number },
    userEmail: {
        type: String,
        required: true
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
    orderStatus: {
        type: String,
        default: "your ordered is packed"
    },
    deliveryDate: {
        type: String,
        default: "Your Order will be delivered in 6 days"
    },
    createdAt: { type: Date, default: Date.now() },
    razorpay: {
        orderId: { type: String },
        paymentId: { type: String },
        signature: { type: String },
    },
},
    {
        collection: 'buy',
        versionKey: false
    }
);
const BuyModel = mongoose.model('buy', BuySchema);
module.exports = { BuyModel }

