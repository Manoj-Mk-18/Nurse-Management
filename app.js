const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const path = require("path");
const mysql = require("mysql");


require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;



app.use(bodyParser.urlencoded({extended: false}));


app.use(bodyParser.json());


 app.use(express.static(path.join(__dirname,'public')));




app.set('view engine', 'hbs');


const routes = require("./server/routes/user");

app.use('/', routes);


app.listen(port,()=>{
    console.log(`Server running on port: ${port}`);
});