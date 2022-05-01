const express = require('express');
const app = express();
const fs = require('fs');
var todo = fs.readFileSync("todo.json") || [];
const port = 80;

app.use(express.static('public'));
app.use(express.json());

app.post('/test', (req, res) => {
    if(!req.body.todo || req.body.todo.length < 1) return res.status(400).send("Missing parameter");

    todo.push(req.body.todo);
    fs.writeFileSync("todo.json", JSON.stringify(todo), { flag: "a+" });
});

app.get("/todo", (req, res) => {
    res.json(todo);
});

app.listen(port, () => {
    console.log(port);
});
