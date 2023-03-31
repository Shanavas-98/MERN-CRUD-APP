require('dotenv').config()
const express = require('express');
const logger = require('morgan');
const connectDB = require("./config/db")


const app = express();
connectDB()

// middleware
app.use(express.json());
app.use(logger('dev'));

app.listen(process.env.PORT,console.log(`Server started on ${process.env.PORT}`))