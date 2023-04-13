const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(cors());
// Use bodyParser to parse JSON request bodies
app.use(bodyParser.json());
mongoose.set("strictQuery", false);

// Connect to MongoDB database using mongoose
mongoose.connect(
  "mongodb+srv://viharikaa:mini%40123@mydata.8zx6rvr.mongodb.net/todoAppData",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
// import the schema from './models/Todo.js'
const Todo = require("./models/Todo");
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

app.get("/todo", async (req, res) => {
  Todo.find({}, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("An error occurred while retrieving the data.");
    } else {
      res.send(data);
    }
  });
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

// Define a route to add a new todo
app.post("/todo/new", async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
      complete: false,
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding todo" });
  }
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

app.delete("/todo/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log("Deleting todo with ID:", id);
  try {
    const deletedTodo = await Todo.findOneAndDelete({ _id: id });
    res.json({ id: deletedTodo._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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

app.put("/todo/complete/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while completing the todo.");
  }
});

app.listen(3002, () => console.log("Server is running on port 3002"));
