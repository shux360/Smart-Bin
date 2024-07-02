const express = require('express');
const cors = require('cors');
//require('./connection/connection');
const mongoose = require('mongoose');
require('dotenv').config();
// const user = require('./routes/user');
const garbage = require('./routes/garbage');

const app = express();
app.use(cors());
app.use(express.json());
// app.use(user);
app.use(garbage);



app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
    
});