import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from '../api/routes/user.route.js'
import authRoutes from '../api/routes/auth.route.js'
dotenv.config();
import cors from "cors";
import messageRoute from "./routes/message.route.js";
import cookieParser from "cookie-parser";
const app = express();
import gigRoutes from '../api/routes/gig.route.js'
import reviewRoutes from '../api/routes/review.route.js'
import orderRoutes from '../api/routes/order.route.js'
import conversationRoute from "./routes/conversation.route.js";
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



//  if you are using cookieparser you have to use this credentials : true}
app.use(cors({origin : "http://localhost:5173", credentials : true}))

app.use(express.json())
app.use(cookieParser())

 app.use("/api/auth", authRoutes)
 app.use("/api/users", userRoutes)
 app.use("/api/gigs", gigRoutes);
 app.use("/api/reviews", reviewRoutes);
 app.use("/api/orders", orderRoutes);
 app.use("/api/conversations", conversationRoute);
 app.use("/api/messages", messageRoute);
 


 app.use((err,req,res,next) => { 
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).send(errorMessage)
 })






app.listen(8800, () => {
  console.log("Backend is listening on port 8800");
});
