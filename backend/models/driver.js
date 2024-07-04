const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true,       
    },
    truckNumber: {
        type: String,
        required: true
    },
    
    
});

const Driver = mongoose.model('Driver', DriverSchema);
module.exports = Driver;
