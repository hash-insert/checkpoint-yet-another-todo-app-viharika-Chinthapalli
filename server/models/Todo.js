// const mongoose = require('mongoose');
// const schema = mongoose.Schema;
// const fs = require('fs');


// // mongoose.connect('mongodb+srv://viharikaa:mini%40123@mydata.8zx6rvr.mongodb.net/todoAppData')
// mongoose.connect(('mongodb+srv://hashinsert-readonly:e5NuDt26x5bg0YdQ@cluster0.ms1e2fc.mongodb.net/todo?retryWrites=true&w=majority'),{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => {
//   console.log('Connected to MongoDB');
// }).catch((err) => {
//   console.log('Error connecting to MongoDB', err);
// })

// const TodoSchema = new schema({
//     // write your schema here
//     text: { type: String, required: true },
//     complete: { type: Boolean, default: false },
// });

// const Todo = mongoose.model('Todo', TodoSchema);


// module.exports = Todo;


const mongoose = require('mongoose');
const fs = require('fs');

mongoose.connect(('mongodb+srv://hashinsert-readonly:e5NuDt26x5bg0YdQ@cluster0.ms1e2fc.mongodb.net/todo?retryWrites=true&w=majority'), {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  
  const Todo = mongoose.model('Todo', new mongoose.Schema({
    text: { type: String, required: true },
    complete: { type: Boolean, default: false },
  }));

  Todo.find({}, function(err, todos) {
    if (err) {
      console.error(err);
      mongoose.connection.close();
      return;
    }

    fs.writeFile('todos.json', JSON.stringify(todos), function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log('Todos written to todos.json');
      }
      mongoose.connection.close();
    });
  });

})
.catch((err) => {
  console.log('Error connecting to MongoDB', err);
})
