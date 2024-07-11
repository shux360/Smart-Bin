const { lang } = require('moment-timezone');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true,
    },
    phone: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    address: {
        streetName: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        province: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        
    },
    garbageIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Garbage'
    }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;