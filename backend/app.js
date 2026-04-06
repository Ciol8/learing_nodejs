const express = require('express');
const app = express();
app.use(express.json());
const mysql = require('mysql');
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "userdb"
})

let userList = [
    {
        id: 1,
        name: "Pedro",
        age: 19,
        married: false,
    },
    {
        id: 2,
        name: "Artur",
        age: 22,
        married: false,
    },
    {
        id: 3,
        name: "Martyna",
        age: 22,
        married: true,
    },

];

app.get('/users', (req, res) => {
    //res.json(userList);
    db.query('SELECT * FROM users', (err, result) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(result);
        }
        res.json(result);
    })
})

app.post("/users", (req, res) => {
    //const newUser = req.body;
    //userList.push(newUser)
    //res.json(userList);
    //const name = req.body.name;
    //const age = req.body.age;
    const { name, age } = req.body;

    db.query(
        "INSERT INTO users (name, age) VALUES (?,?);", [name, age],
        (err, result) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(result);
            }
        })

})

app.put("/users", (req, res) => {
    const newName = req.body.newName;
    for (let i = 0; i < userList.length; i++) {
        userList[i].name = newName;
    }
    res.json(userList);
})

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    let = foundId = false;
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].id == id) {
            userList.splice(i, 1)
            foundId = true;
        }
    }

    if (!foundId) {
        res.status(404).json({ error: "User id not found" });
    } else {
        res.json(userList);
    }

})

app.listen('3001', () => {
    console.log("Server runnning on port 3001");
});