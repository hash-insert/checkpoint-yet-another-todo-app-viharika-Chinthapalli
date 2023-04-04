const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());


// Connect to MongoDB database using mongoose 

// import the schema from './models/Todo.js'

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

