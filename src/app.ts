require('dotenv').config();
import express, { Request, Response } from "express";

const APP = express();

APP.get('/', (req, res) => {
    res.send({
        message: "Hello world"
    })
});


APP.listen(process.env.PORT, () => {
    console.log(`API is running at ${process.env.PORT}`)
})