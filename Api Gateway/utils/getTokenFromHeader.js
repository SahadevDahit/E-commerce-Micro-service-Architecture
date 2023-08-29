export const getTokenFromHeader = (headerToken) => {
    //get token from header
    const token = headerToken?.split(" ")[1];
    if (token === undefined) {
        return "No token found in the header";
    } else {
        return token;
    }
};