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
dotenv.config();
import cors from "cors";
import Brands from '../routes/brands.js'
import Category from '../routes/category.js'
import Colors from '../routes/colors.js'
import Products from '../routes/products.js'
import SubCategory from '../routes/subCategory.js';
import Books from '../routes/books.js'
import ApparelAndFashion from '../routes/apparelAndFashion.js';
import ConsumerElectronics from '../routes/consumerElectronics.js';
import Carts from '../routes/carts.js';
import consumeCart from '../rabbitmq/consumeCart.js'
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
consumeCart();

//routes
app.use('/v1/brands', Brands)
app.use('/v1/category', Category)
app.use('/v1/subCategory', SubCategory)
app.use('/v1/colors', Colors)
app.use('/v1/books', Books)
app.use('/v1/apparelAndFashion', ApparelAndFashion)
app.use('/v1/consumerElectronics', ConsumerElectronics)
app.use('/v1/carts', Carts)
app.use('/v1', Products)




app.get('/', asyncHandler(async (req, res) => {
    res.send("Welcome to products server")
}))

//err middleware
app.use(notFound);
app.use(globalErrhandler);

export default app;