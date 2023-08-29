import gateway from 'fast-gateway';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import {
    getTokenFromHeader
} from "./utils/getTokenFromHeader.js";
import {
    verifyToken
} from "./utils/verifyToken.js";

import {
    authMiddleware
} from './middlewares/authMiddleware.js';
import {
    sellerAccessPaths,
    publicPaths,
    customerAccessPaths
} from './pathRegistery/paths.js'

dotenv.config();
const app = express();
// Enable CORS globally
const corsOptions = {
    origin: '*', // Set the appropriate origin or origins for your application
    credentials: true,
    // optionSuccessStatus: 200,
};
app.use(cors(corsOptions))

app.use(cors());
app.use(express.json());

const server = gateway({
    routes: [{
            prefix: '/users',
            target: 'http://localhost:5000',
            // middlewares: [authMiddleware],

        },
        {
            prefix: '/products',
            target: 'http://localhost:6000',
        },
        {
            prefix: '/shopping',
            target: 'http://localhost:8000',
        },
        {
            prefix: '/feedbackAndReports',
            target: 'http://localhost:4000',
            // middlewares: [authMiddleware],
        },
    ],
    middlewares: [
        (req, res, next) => {
            const headerToken = req.headers.authorization;
            const token = getTokenFromHeader(headerToken);
            const decoded = verifyToken(token);        
            req.headers['user-auth-id'] = `${decoded?.id}`;
          
            next();
        }
    ]

});

server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,  Accept"
    );
    res.setHeader('Content-Type', 'application/json')
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});
server.use(cors())
server.use(cors(corsOptions))
server.use((req, res, next) => {
    next(); // Call next to proceed to the next middleware or route handler
});
server.get('/', (req, res) => {
    console.log(req.headers)
    res.send('API gateway server');
});
const PORT = process.env.PORT;
server.start(process.env.PORT).then(() => {
    console.log(`API gateway is running on port ${PORT}`);
});