import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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

  // const [todoToUpdate, setTodoToUpdate] = useState({});

  useEffect(() => {
    getTodos();
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
    // setTodoToUpdate({});
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

  // const selectTodo = todo => {
  //   setTodoToUpdate(todo);
  // };

  return (
    <Router>
      <div className="container">
        <Header />
        <div className="container">
          {!onlineStatus && !loading ? (
            <h3>The data server may be offline, changes will not be saved</h3>
          ) : null}
          <Switch>
            <Route
              path="/"
              exact
              render={() => <AllTodos allTodos={todos} loading={loading} />}
            />
            <Route
              path="/add"
              render={() => <AddTodo submitTodo={submitTodo} />}
            />
            <Route
              path="/edit/:_id"
              render={props => (
                <AddTodo {...props} submitTodo={submitTodo} todos={todos} />
              )}
            />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
