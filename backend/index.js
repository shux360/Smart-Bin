import express from "express";
import {PORT, mongoDBURL} from "./config.js"; //Port and database connection string
import cors from 'cors';
import mongoose from "mongoose";

const app = express(); //Creating Express Application Instance

//Middleware for parsing request body
app.use(express.json());

app.use(cors()); //enable Cross-Origin Resource Sharing (CORS).

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log(`App is connected to Database`);
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        })
        
    })
    .catch((error) => {
        console.log(error)
    })