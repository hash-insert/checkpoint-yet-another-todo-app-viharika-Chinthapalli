import { useState, useEffect } from "react";

const API_BASE = "http://localhost:3002";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    GetTodos();
  }, []);

  const GetTodos = async () => {
    try {
      const res = await fetch(API_BASE + "/todo");
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const completeTodo = async (id) => {
    try {
      const response = await fetch(API_BASE + "/todo/complete/" + id, {
        method: "PUT",
      });
      const data = await response.json();

      setTodos((todos) =>
        todos.map((todo) => {
          if (todo._id === data._id) {
            todo.complete = data.complete;
          }

          return todo;
        })
      );
    } catch (error) {
      console.error("Error completing todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/todo/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTodos(todos.filter((todo) => todo._id !== id));
      } else {
        throw new Error("Failed to delete todo.");
      }
    } catch (error) {
      console.error(error);
      // Display error message to user
      alert("An error occurred while deleting the todo item.");
    }
  };

  const addTodo = async () => {
    try {
      const response = await fetch(API_BASE + "/todo/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newTodo,
        }),
      });

      const data = await response.json();

      setTodos((todos) => [...todos, data]);
      setPopupActive(false);
      setNewTodo("");
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <div className="App">
      <h1>Howdy!</h1>
      <h4>Your tasks for the day:</h4>

      <div className="todos">
        {todos.map((todo) => (
          <div
            className={"todo " + (todo.complete ? "is-complete" : "")}
            key={todo.id}
            onClick={() => completeTodo(todo._id)}
          >
            <div className="checkbox"></div>

            <div className="text">{todo.text}</div>

            <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
              x
            </div>
          </div>
        ))}

        {todos.length === 0 ? (
          <div className="no-todos">No tasks yet!</div>
        ) : (
          ""
        )}
      </div>

      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>

      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>
            x
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <div className="button" onClick={addTodo}>
              Create Task
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
