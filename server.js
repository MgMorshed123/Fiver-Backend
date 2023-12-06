import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from '../api/routes/user.route.js'
import authRoutes from '../api/routes/auth.route.js'
dotenv.config();
import cookieParser from "cookie-parser";
const app = express();

// MongoDB URI from environment variables
const mongoURI = process.env.mongoURI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

console.log( "token",  process.env.jwt_key)





app.use(express.json())
app.use(cookieParser())

 app.use("/api/auth", authRoutes)
 app.use("/api/users", userRoutes)


 app.use((err,req,res,next) => {

  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).send(errorMessage)
 })






app.listen(8800, () => {
  console.log("Backend is listening on port 8800");
});
