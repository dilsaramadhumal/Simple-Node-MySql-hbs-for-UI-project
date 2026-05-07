const express = require("express");
const app = express();
const mysql = require("mysql2");
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path : './.env' })

app.use(express.json());

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

const publicDirectory= path.join(__dirname, './public')

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.set('view engine', 'hbs');
app.use(express.static(publicDirectory));

db.connect((error) => {
    if (error) {
        console.log('error connecting to database', error);
    } else {
        console.log('connected to database');
    }
})

//Define routes
app.use("/", require("./routes/pages"));
app.use("/auth", require('./routes/auth'));

app.listen(3001, () => {
    console.log('Server running on port 3001');
})