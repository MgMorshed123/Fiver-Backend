import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

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

app.listen(8800, () => {
  console.log("Backend is listening on port 8800");
});
