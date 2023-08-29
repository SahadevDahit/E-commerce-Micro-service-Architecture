import {
    getTokenFromHeader
} from "../utils/getTokenFromHeader.js";
import {
    verifyToken
} from "../utils/verifyToken.js";

import {
    sellerAccessPaths,
    publicPaths,
    customerAccessPaths
} from '../pathRegistery/paths.js'

export const authMiddleware = (req, res, next) => {
    console.log("auth middleare functions ");
    console.log(req.headers)
    // const isValid = publicPaths.some(path => {
    //     return path.test(req.path);
    // });
    // if (isValid) {
    //     return next();
    // }

    //get token from header
    const token = getTokenFromHeader(headerToken);
    //verify the token
    const decodedUser = verifyToken(token);
    if (!decodedUser) {
        throw new Error("Invalid/Expired token, please login again");
    }
    const role = decodedUser.role;
    // req.headers['user-auth-id'] = decodedUser?.id;
    // const isSellerValid = sellerAccessPaths.some(path => {
    //     return path.test(req.path);
    // });
    // const isCustomerValid = customerAccessPaths.some(path => {
    //     return path.test(req.path);
    // });
    // if (role === "seller") {
    //     if (isCustomerValid) {
    //         throw new Error('Not authenticated to access this page')
    //     }
    //     if (isSellerValid) {
    //         return next();
    //     }
    // }

    // if (role === "customer") {

    //     if (isSellerValid) {
    //         throw new Error('Not authenticated to access this page')
    //     }
    //     if (isCustomerValid) {
    //         return next();
    //     }

    // }


};