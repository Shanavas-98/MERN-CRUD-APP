const express = require('express');
const logger = require('morgan');
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");

const app = express();
require('dotenv').config();
connectDB();

// middleware
app.use(express.json());
app.use(logger('dev'));

//routes
app.use('/api/user',userRoute);
app.use('/api/admin',adminRoute);

app.listen(process.env.PORT,console.log(`Server started on ${process.env.PORT}`));