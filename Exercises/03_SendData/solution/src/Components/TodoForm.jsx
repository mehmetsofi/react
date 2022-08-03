import React, { useState, useEffect } from "react";

import DateCreated from "./DateCreated";

const TodoForm = props => {
  const [todoDescription, setTodoDescription] = useState(``);
  const [todoDateCreated, setTodoDateCreated] = useState(null);
  // Stated added for editing a todo
  const [todoCompleted, setTodoCompleted] = useState(false);

  // useEffect added for editing a todo
  useEffect(() => {
    if (Object.getOwnPropertyNames(props.todo).length > 0) {
      setTodoDescription(props.todo.todoDescription);
      setTodoDateCreated(props.todo.todoDateCreated);
      setTodoCompleted(props.todo.todoCompleted);
    } else {
      setTodoDescription(``);
      setTodoDateCreated(new Date());
      setTodoCompleted(false);
    }
  }, [props.todo]);

  // Method modified for editing a todo
  const handleSubmit = event => {
    event.preventDefault();
    props.submitTodo(todoDescription, todoDateCreated, todoCompleted);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="todoDescription">Description:</label>
        <input
          type="text"
          name="todoDescription"
          placeholder="Todo Description"
          value={todoDescription}
          className="form-control"
          onChange={e => setTodoDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="todoDateCreated">Created on:</label>
        {/* Conditional render to display date of todo to edit */}
        {props.todo.todoDateCreated ? (
          `${new Date(
            props.todo.todoDateCreated
          ).toLocaleDateString()} @ ${new Date(
            props.todo.todoDateCreated
          ).toLocaleTimeString()}`
        ) : (
          <DateCreated
            dateCreated={props.todo ? props.todo.todoDateCreated : null}
            updateDateCreated={dateCreated => setTodoDateCreated(dateCreated)}
          />
        )}
      </div>
      {/* Added to enable editing of a Todo */
      Object.getOwnPropertyNames(props.todo).length > 0 ? (
        <div className="form-group">
          <label htmlFor="todoCompleted">Completed: </label>
          <input
            type="checkbox"
            name="todoCompleted"
            checked={todoCompleted}
            onChange={e => setTodoCompleted(e.target.checked)}
          />
        </div>
      ) : null}
      <div className="form-group">
        <input type="submit" value="Submit" className="btn btn-primary" />
      </div>
    </form>
  );
};

export default TodoForm;
