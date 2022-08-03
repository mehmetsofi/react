import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "./css/AddTodo.css";
import generateTodoId from "./utils/generateId";
import TodoForm from "./TodoForm";

const AddTodo = props => {
  const [todo, setTodo] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (props.todos && props.match && props.match.params._id) {
      const todoEditing = props.todos.find(
        todoToCheck => todoToCheck._id === props.match.params._id
      );
      setTodo(todoEditing);
    }
  }, [props.todos, props.match]);

  const submitTodo = (todoDescription, todoDateCreated, todoCompleted) => {
    if (todo._id) {
      let updatedTodo = todo;
      updatedTodo.todoDescription = todoDescription;
      updatedTodo.todoCompleted = todoCompleted;
      props.submitTodo(updatedTodo);
      setTodo({});
    } else {
      const _id = generateTodoId();
      todoDateCreated = new Date(todoDateCreated).toISOString();
      const newTodo = {
        _id,
        todoDescription,
        todoDateCreated,
        todoCompleted: false
      };
      props.submitTodo(newTodo);
      setTodo({});
    }
    setSubmitted(true);
  };

  const action = todo && props.match ? `Edit` : `Add`;

  return (
    <>
      {submitted ? (
        <Redirect to="/" />
      ) : (
        <div className="addTodo container">
          <h3>{action} Todo</h3>
          <TodoForm todo={todo} submitTodo={submitTodo} />
        </div>
      )}
    </>
  );
};

export default AddTodo;
