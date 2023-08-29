import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        // mongoose.set("strictQuery", false);
        const connected = await mongoose.connect(process.env.MONGO_URL);

        console.log(`Mongodb connected ${connected.connection.host}`);
        // console.log("connected")
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default dbConnect;