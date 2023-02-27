const mongoose = require('mongoose')
const validator = require('validator')

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    quantity: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    },
    decscription: {
        type: String,
        required: true
    },
    createdAt: { type: Date, default: Date.now() }

},
    {
        collection: 'product',
        versionKey: false
    })

const ProductModel = mongoose.model('product', ProductSchema)
module.exports = { ProductModel }