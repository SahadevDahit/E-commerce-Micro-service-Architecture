import jwt from "jsonwebtoken";

const generateToken = (id, role) => {
    return jwt.sign({
        id,
        role
    }, process.env.JWT_KEY, {
        expiresIn: "1d"
    });
};

export default generateToken;