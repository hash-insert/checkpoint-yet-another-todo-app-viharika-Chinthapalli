const mongoose = require('mongoose');
const schema = mongoose.Schema;

mongoose.connect('mongodb+srv://viharikaa:mini%40123@mydata.8zx6rvr.mongodb.net/todoAppData')
.then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('Error connecting to MongoDB', err);
})

const TodoSchema = new schema({
    // write your schema here
    text: { type: String, required: true },
    complete: { type: Boolean, default: false },
});

const Todo = mongoose.model('Todo', TodoSchema);

const sampleTodo = new Todo({
    text: "raji",
    complete: false
})

const anotherSampleTodo = new Todo({
    text: "vijay",
    complete: false
})

Array.from([sampleTodo, anotherSampleTodo]).forEach((todo) => {
    todo.save().then(() => {
        console.log('data saved');
    })
})
// module.exports = Todo;