const express = require('express');
const app = express();
const fs = require('fs');
const port = 80

app.use(express.static('public'))

app.use(express.json());

const path = "./mytodolist.txt";

app.post('/test', (req, res) => {
    console.log("api shit")

    fs.exists(path, function (isExist) {
        if (isExist) {
            let content = req.body.todo;
            content = `\n${content}`;
            fs.appendFile(path, content, (err) => {
                if (err) throw err;
                console.log('Adding task to todo-list...')
            });
        } else {
            fs.appendFile('mytodolist.txt', req.body.todo, function (err) {
                if (err) throw err;
                console.log('Todo-list created...');
            });
        }
    });
});

app.listen(port, () => {
    console.log(`${port}`)
});