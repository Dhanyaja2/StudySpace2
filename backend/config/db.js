import mongoose from "mongoose";

const connectDB = async() => {
    await mongoose.connect("mongodb+srv://dhanyaja2003:6SmbN89E1NHd8Pla@cluster0.cuzcuyc.mongodb.net/StudySpace2").then(() => console.log("DB connected"));
}

export default connectDB;