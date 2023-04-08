/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// Import the express in typescript file
import express, { Request, Response } from "express";
import path from 'path';
// Take a port 3000 for running server.
const port = process.env.PORT || 5000;
import cors from 'cors';
require("dotenv").config({ path: "./config/.env" }); //loads variables from .env file into process.env
import connectDB from "./src/config/db.js";
connectDB();

// Initialize the express engine
const app = express();


// Middleware
app.use(cors());

app.use('/users', require('./routes/users'))
app.use('/workouts', require('./routes/workouts'));
app.use('/exercises', require('./routes/exercises'));


// Handling '/' Request
app.get("/", (req: Request, res: Response) => {
  res.send("TypeScript With Express");
});

// Server setup
app.listen(port, () => {
  console.log(`TypeScript with Express
         http://localhost:${port}/`);
});
