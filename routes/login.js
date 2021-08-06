const express = require("express");
const router = express.Router();
const mysql = require("mysql2")

const connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : '1111',
    database : 'test'
})

router.get("/", function(req, res){
    res.render("login/login")       // 폴더명 : 파일명
})

router.post("/", function(req, res){
    var id = req.body._id;
    var password = req.body._password
    console.log(id, password);
    connection.query(
        `select *from farm_user where id=? and password=?`,
        [id, password],
        function(err, result){
            if(err){
                console.log(err)
                res.send("login SQL select Error")
            }else{
                if(result.length > 0){
                    req.session.logged = result[0]
                    res.redirect("/");
                }else{
                    res.redirect("/login")
                }
            }
        }
    )
})

router.get("/signup", function(req, res){
    res.render("login/signup")
})

router.post("/signup", function(req, res){
    var id = req.body._id;
    var password = req.body._password;
    var name = req.body._name;
    var phone = req.body._phone;
    var email = req.body._email;
    var gender = req.body._gender;
    var linkcode = req.body._linkcode;
    console.log(id, password, name, phone, email, gender, linkcode);
    connection.query(
        `insert into farm_user(id, password, name, phone, email, gender, linkcode)
        values(?, ?, ?, ?, ?, ?, ?)`,
        [id, password, name, phone, email, gender, linkcode],
        function(err, result){
            if(err){
                console.log(err)
                res.send("signup SQL insert Error")
            }else{
                res.redirect("/login")
            }
        }
    )
})

module.exports = router;