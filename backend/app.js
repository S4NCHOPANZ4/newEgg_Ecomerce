const express = require('express');
const ErrorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require("cors")
const path = require("path");



const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname,"./uploads")));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));


//import routes 
const user = require("./controller/user");
const payment = require("./controller/payment");
const order = require("./controller/order");


app.use("/api/v2/user", user)
app.use("/api/v2/payment", payment)
app.use("/api/v2/order", order);
app.use("/", (req, res) => {
    res.send("hello world!");
})


//config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path:"./config/.env" 
    })
}

//err handling
app.use(ErrorHandler)


module.exports = app;