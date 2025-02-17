import mongoose from "mongoose"

const connectDB = async()=>{
    try {

        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in .env file");
        }

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\n MongoDB connected !! DB Host: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log(("MongoDB connection error",error));
        process.exit(1)
    }
}

export default connectDB;