const express = require('express');
const app = express();
app.use(express.json());

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
    res.json(userList);
})

app.post("/users", (req, res) => {

    const newUser = req.body;
    userList.push(newUser)
    res.json(userList);
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