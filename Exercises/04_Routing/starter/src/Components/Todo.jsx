import React from "react";

const Todo = props => {
  const dateCreated = new Date(
    Date.parse(props.todo.todoDateCreated)
  ).toUTCString();
  return (
    <tr>
      <td className={props.todo.todoCompleted ? "completed" : ""}>
        {props.todo.todoDescription}
      </td>
      <td className={props.todo.todoCompleted ? "completed" : ""}>
        {dateCreated}
      </td>
      <td>
        {/* Render amended to allow editing */}
        {props.todo.todoCompleted ? (
          `N/A`
        ) : (
          <span id="link" onClick={() => props.selectTodo(props.todo)}>
            Edit
          </span>
        )}
      </td>
    </tr>
  );
};

export default Todo;
