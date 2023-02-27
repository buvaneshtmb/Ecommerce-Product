const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TokenSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user',
        unique: true
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now(), expires: 3600 }
})


const TokenModel = mongoose.model('token', TokenSchema)
module.exports = { TokenModel }