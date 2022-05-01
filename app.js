const express = require('express');
const app = express();
const fs = require('fs');
const port = 80;

app.use(express.static('public'));
app.use(express.json());

app.post('/test', (req, res) => {
    if(!req.body.todo || req.body.todo.length < 1) return res.status(400).send("Missing parameter");
    var todo = fs.existsSync("todo.json") ? JSON.parse(fs.readFileSync("todo.json")) : [];

    todo.push(req.body.todo);
    fs.writeFileSync("todo.json", JSON.stringify(todo));
});

app.get("/todo", (req, res) => {
    var todo = fs.existsSync("todo.json") ? JSON.parse(fs.readFileSync("todo.json")) : [];
    res.json(todo);
});

app.listen(port, () => {
    console.log(port);
});
