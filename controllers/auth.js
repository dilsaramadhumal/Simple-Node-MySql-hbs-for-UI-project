const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req,res) => {

    const { name, email, password, passwordconfirm } = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {

        if (error) {
            console.log(error);
        }

        if(results.length > 0) {
            return res.render( 'register', {
                message: 'That emailis already in use'
            }) 
        }
        else if(password !== passwordconfirm) {
            return res.render( 'register', {
                message: 'Passwords do not match'
            })
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', {name:name, email:email, password:hashedPassword}, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('register', {
                    message: 'User registered'
                })
            }
        
    })

    //res.send("Form submitted");
})}