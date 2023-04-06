const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());


const fs = require('fs');

const todos = JSON.parse(fs.readFileSync('./todos.json'));

// Connect to MongoDB database using mongoose 
// mongoose.connect('mongodb://localhost:27017/todo', {useNewUrlParser: true, useUnifiedTopology: true});

// import the schema from './models/Todo.js'
const Todo = require('./models/Todo');
/*
the below API endpoint should return all the todos in the todos.json file
Sample response:
[
    {
        "id": 1,
        "text": "Learn React",
        "complete": false
    },
    {
        "id": 2,
        "text": "Learn Node",
        "complete": false
    },   
    ]
*/

app.get('/todo', (req, res) => {
    res.json(todos);
});


// the below API endpoint should add a new todo to the todos.json file
/*
Request:
POST /todo/new
Sample request body:
{
    "text": "Learn Express"
}
Sample response:
{
    "id": 3,
    "text": "Learn Express",
    "complete": false
}
*/

app.post('/todo/new', (req, res) => {
    const todo = {
        id: Math.floor(Math.random() * 100000),
        text: req.body.text,
        complete: false
    };

    todos.push(todo);
    fs.writeFileSync('./todos.json', JSON.stringify(todos));

    res.json(todo);
});


// the below API endpoint should delete a todo from the todos.json file
/*
Sample request:
DELETE /todo/delete/1
Sample response:
{
    "id": 1,
    "text": "Learn React",
    "complete": false
}
*/

app.delete('/todo/delete/:id', (req, res) => {
    const todo = todos.find(todo => todo.id === parseInt(req.params.id));

    const index = todos.indexOf(todo);

    todos.splice(index, 1);

    fs.writeFileSync('./todos.json', JSON.stringify(todos));

    res.json(todo);
});


// the below API endpoint should toggle the complete status of a todo in the todos.json file
/*
Sample request:
PUT /todo/complete/1
Sample response:
{
    "id": 1,
    "text": "Learn React",
    "complete": true
}
*/

app.get('/todo/complete/:id', (req, res) => {
    const todo = todos.find(todo => todo.id === parseInt(req.params.id));

    todo.complete = !todo.complete;

    fs.writeFileSync('./todos.json', JSON.stringify(todos));

    res.json(todo);
});


app.listen(3002, () => console.log("Server is running on port 3002"));

