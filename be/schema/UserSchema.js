const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    image: { type: String },
    email: {
        type: String,
        required: true,
        validate: (value) => validator.isEmail(value)
    },
    mobile: {
        type: String,
        required: true,
        validate: (value) => validator.isNumeric(value) && value.length === 10
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "employee"
    },
    primeMember: {
        type: String,
        default: "No"
    },
    verified: {
        type: Boolean,
        default: false
    },
    createdAt: { type: Date, default: Date.now() }
},
    {
        collection: 'user',
        versionKey: false
    })

const UserModel = mongoose.model('user', UserSchema)
module.exports = { UserModel }