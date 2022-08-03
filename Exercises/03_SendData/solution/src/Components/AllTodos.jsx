import React from "react";

import "./css/AllTodos.css";

import Todo from "./Todo";

const AllTodos = props => {
  let todos = [];
  if (props.allTodos.length && typeof props.allTodos[0] !== "string") {
    // Todo component modified to allow editing of Todos
    todos = props.allTodos.map(currentTodo => (
      <Todo
        todo={currentTodo}
        key={currentTodo._id}
        selectTodo={props.selectTodo}
      />
    ));
  } else if (props.loading) {
    todos.push(
      <tr key="loading">
        <td colSpan="3">Please wait - retrieving the todos</td>
      </tr>
    );
  } else {
    todos.push(
      <tr key="error">
        <td colSpan="3">There has been an error retrieving the todos</td>
      </tr>
    );
  }

  return (
    <div className="container">
      <h3>Todos List</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Description</th>
            <th>Date Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{todos}</tbody>
      </table>
    </div>
  );
};

export default AllTodos;
