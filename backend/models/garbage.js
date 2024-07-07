const mongoose = require('mongoose');

const GarbageSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        driverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Driver',  
            required: true
        },
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
                default: 'Srilanka'
            },
            postalcode: {
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
            enum: ['paper', 'polythene', 'foodwaste', 'plastic', 'glass','metal'],
            required: true
        }],
        date: {
            type: Date,
            required: true
        },
        pickupStatus: {
            type: String,
            enum: ["Didn't Pickup","Pending", "Picked Up"],
            default: "Didn't Pickup"
        },
        issueReported: {
            type: Boolean,
            default: false
        },
    },
    {timestamps: true}
);

const Garbage = mongoose.model('Garbage', GarbageSchema);
module.exports = Garbage;
