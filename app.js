const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser")
//import routes
const authRoute = require("./routes/auth");
const notesRoute = require("./routes/Notes");

dotenv.config();

mongoose.connect(process.env.DB_CONNECT,  {useNewUrlParser: true, useUnifiedTopology: true},() => console.log("connected to db"))
app.use(express.json());
app.use(cors());
// app.use(cookieParser);

//route middleware
app.use('/',authRoute);
app.use('/notes',notesRoute);

















app.listen(8000,function(){
    console.log("server started on port 8000")
})