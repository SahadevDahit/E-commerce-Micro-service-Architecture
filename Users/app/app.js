import helmet from 'helmet';
import bodyParser from 'body-parser'
import express from "express";
import dbConnection from '../config/dbConnect.js'
import dotenv from "dotenv";
import {
    globalErrhandler,
    notFound
} from "../middlewares/globalErrHandler.js";
import shippingAddressRoutes from "../routes/shippingAddress.js"
import FeedbackAndReports from "../routes/feedbackAndReports.js";

import asyncHandler from 'express-async-handler';
dotenv.config();
import cors from "cors";
import Users from '../routes/users.js'

const app = express();
app.use(helmet())
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,  Accept"
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});
dbConnection();
// Use body parser middleware to parse request bodies
app.use(bodyParser.json());
app.use(express.json());
//url encoded
app.use(express.urlencoded({
    extended: true
}));
//routes
app.use("/v1", Users);
app.use("/v1/shippingAddress", shippingAddressRoutes);
app.use("/v1/feedbackAndReports", FeedbackAndReports);


app.get('/', asyncHandler(async (req, res) => {
    console.log(req.headers)
    res.send("Welcome to users server")
}))

//err middleware
app.use(notFound);
app.use(globalErrhandler);

export default app;