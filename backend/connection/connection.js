const mongoose = require('mongoose');
const connection = async () => {
    
    try {
        
        await mongoose.connect('mongodb+srv://username:password@cluster0.s27bx1x.mongodb.net/SmartBin');
        console.log('Connected to the database');
        }
    catch (error) {
        console.log(error);
    }
};
connection();