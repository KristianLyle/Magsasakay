const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "magsasakay"
})

app.post('/register', (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    // Check if the email already exists in the database
    con.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) {
            res.send({ error: err });
        } else if (result.length > 0) {
            // Email already exists, send an error message
            res.send({ message: "Email already exists" });
            return;
        } else {
            // Email doesn't exist, proceed to insert the new user
            con.query("INSERT INTO users (email, username, password) VALUES (?, ?, ?)", [email, username, password], (err, result) => {
                if (err) {
                    res.send({ error: err });
                } else {
                    res.send({ message: "Account registered" });
                }
            });
        }
    });
});


app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    con.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], 
        (err, result) => {
            if(err){
                res.send({error: err});
            } else {
                if(result.length > 0){
                    res.send(result);
                } else {
                    res.send({message: "WRONG EMAIL OR PASSWORD!"});
                }
            }
        }
    )
});


app.listen(8000, () => {
    console.log("running backend server");
})