const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const czlonekRoutes = require("./api/routes/czlonkowie");
const wejscieRoutes = require("./api/routes/wejscie");
const userRoutes = require("./api/routes/users"); 

const MongoClient = require('mongodb').MongoClient;
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb+srv://admin:1234@cluster0-ok1tb.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/czlonkowie", czlonekRoutes);
app.use("/wejscie", wejscieRoutes);
app.use("/users", userRoutes);

app.use((req,res,next)=>{
    const error = new Error("Not found.");
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
});

module.exports = app;