import helmet from 'helmet';
import bodyParser from 'body-parser'
import express from "express";
import dbConnection from '../config/dbConnect.js'
import dotenv from "dotenv";
import {
    globalErrhandler,
    notFound
} from "../middlewares/globalErrHandler.js";
import asyncHandler from 'express-async-handler';
import Coupons from "../routes/coupons.js";
dotenv.config();
import cors from "cors";
import Orders from "../routes/orders.js"
import Reviews from "../routes/reviews.js"
import consumeOrders from '../rabbitmq/consumeOrder.js'
const app = express();
app.use(helmet())
app.use(cors());
app.disable('x-powered-by');
dbConnection();
// Use body parser middleware to parse request bodies
app.use(bodyParser.json());
app.use(express.json());
//url encoded
app.use(express.urlencoded({
    extended: true
}));
consumeOrders();
//routes
app.use('/v1/coupons', Coupons)
app.use('/v1/orders', Orders)
app.use('/v1/reviews', Reviews);
app.get('/', asyncHandler(async (req, res) => {
    res.send("Welcome to shopping server")
}))


app.get('/', (req, res) => {
    res.send('Welcome to shopping server');
})

//err middleware
app.use(notFound);
app.use(globalErrhandler);

export default app;