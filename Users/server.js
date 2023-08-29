import http from "http";
import app from "./app/app.js";

//create the server
const PORT = process.env.PORT || 2023;
const server = http.createServer(app);
server.listen(PORT, console.log(`Users Server is up and running on port ${PORT}`));