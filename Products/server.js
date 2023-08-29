import http from "http";
import app from "./app/app.js";

//create the server
const PORT = process.env.PORT || 6000;
const server = http.createServer(app);
server.listen(PORT, console.log(`Product Server is up and running on port ${PORT}`));