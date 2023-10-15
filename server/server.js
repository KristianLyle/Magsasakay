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

    con.query("INSERT INTO users (email, username, password) VALUES (?, ?, ?)", [email, username, password], 
        (err, result) => {
            if(result){
                res.send(result);
            }else{
                res.send({message: "ENTER CORRECT ASKED DETAILS!"})
            }
        }
    )
})

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