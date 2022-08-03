import React, { useState, useEffect } from "react";
import "./css/AddTodo.css";
import generateTodoId from "./utils/generateId";
import TodoForm from "./TodoForm";

const AddTodo = props => {
  // State added to enable editing of Todo
  const [todo, setTodo] = useState({});

  // useEffect added to enable editing of Todo
  useEffect(() => {
    if (
      props.todos &&
      props.todoToUpdate &&
      (Array.isArray(props.todos) &&
        Object.getOwnPropertyNames(props.todoToUpdate).length)
    ) {
      const todoEditing = props.todos.find(
        todoToCheck => todoToCheck._id === props.todoToUpdate._id
      );
      setTodo(todoEditing);
    }
  }, [props.todos, props.todoToUpdate]);

  // Method modified to allow editing of Todo
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
  };

  // Change the title if editing todo
  const action = Object.getOwnPropertyNames(props.todoToUpdate).length
    ? `Edit`
    : `Add`;

  return (
    <div className="addTodo container">
      <h3>{action} Todo</h3>
      {/* Form modified to allow editing */}
      <TodoForm todo={todo} submitTodo={submitTodo} />
    </div>
  );
};

export default AddTodo;
