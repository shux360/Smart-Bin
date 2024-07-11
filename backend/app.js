const express = require('express');
const cors = require('cors');
require('./connection/connection');
const mongoose = require('mongoose');
require('dotenv').config();

const garbage = require('./routes/garbage');
const driver = require('./routes/driver');
const user = require('./routes/user');
const issue = require('./routes/issue');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/user',user);
app.use(garbage);
app.use('/driver',driver);
app.use(issue);


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
    
});


