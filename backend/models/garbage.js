const mongoose = require('mongoose');

const GarbageSchema = new mongoose.Schema({
        // userId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User',
        //     required: true
        // },
        // driverId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Driver',  
        //     required: true
        // },
        location: {
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
            //not sure if this is needed
            // latitude: {
            //     type: Number,
            //     required: true
            // },
            // longitude: {
            //     type: Number,
            //     required: true
            // }
        },
        categories: [{
            type: String,
            enum: ['paper', 'polythene', 'food', 'plastic', 'glass'],
            required: true
        }],
        date: {
            type: Date,
            default: Date.now
        }
    },
    {timestamps: true}
);

const Garbage = mongoose.model('Garbage', GarbageSchema);
module.exports = Garbage;
