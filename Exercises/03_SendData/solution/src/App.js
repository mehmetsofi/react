import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import AllTodos from "./Components/AllTodos";
import AddTodo from "./Components/AddTodo";

const TODOSURL = `http://localhost:4000/todos`;

const App = () => {
  const [todos, setTodos] = useState([]);
  const [onlineStatus, setOnlineStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  // Additional Logic to allow editing of todo
  const [todoToUpdate, setTodoToUpdate] = useState({});

  useEffect(() => {
    setTimeout(() => {
      getTodos();
    }, 5000);
  }, []);

  const getTodos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(TODOSURL);
      const todos = await res.data;
      setTodos(todos);
      setLoading(false);
      setOnlineStatus(true);
    } catch (e) {
      setTodos(e.message);
      setLoading(false);
      setOnlineStatus(false);
    }
  };

  // Modified to allow editing of a todo
  const submitTodo = todo => {
    let updatedTodos;
    if (typeof todos !== "string") {
      updatedTodos = [...todos];
    }

    const updateIndex = updatedTodos.findIndex(
      storedTodo => storedTodo._id === todo._id
    );

    if (updateIndex === -1) {
      Array.isArray(updatedTodos)
        ? updatedTodos.push(todo)
        : (updatedTodos = [todo]);
      postTodo(todo);
    } else {
      updatedTodos[updateIndex] = todo;
      updateTodo(todo);
    }

    setTodos(updatedTodos);
    setTodoToUpdate({});
  };

  const postTodo = async todo => {
    try {
      await axios.post(TODOSURL, todo);
      setOnlineStatus(true);
      getTodos();
    } catch (e) {
      setOnlineStatus(false);
    }
  };

  const updateTodo = async todo => {
    try {
      await axios.put(`${TODOSURL}/${todo._id}`, todo);
      setOnlineStatus(true);
      getTodos();
    } catch (e) {
      setOnlineStatus(false);
    }
  };

  // Additional Logic to allow editing of todo
  const selectTodo = todo => {
    setTodoToUpdate(todo);
  };

  return (
    <div className="container">
      <Header />
      <div className="container">
        {!onlineStatus && !loading ? (
          <h3>The data server may be offline, changes will not be saved</h3>
        ) : null}
        {/* Components modified to allow editing of Todos */}
        <AllTodos allTodos={todos} loading={loading} selectTodo={selectTodo} />
        <AddTodo
          submitTodo={submitTodo}
          todos={todos}
          todoToUpdate={todoToUpdate}
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;
