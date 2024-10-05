import mongoose from "mongoose";

const connectToDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Connected to MongoDB");
    } catch(error){
        console.log("Error connecting to MongoDB: ", error);
    }

}

export default connectToDB