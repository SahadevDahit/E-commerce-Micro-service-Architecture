import http from "http";
import app from "./app/app.js";

//create the server
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(PORT, console.log(`Shopping server is up and running on port ${PORT}`));