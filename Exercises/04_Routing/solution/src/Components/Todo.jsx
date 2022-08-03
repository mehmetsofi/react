import React from "react";
import { Link } from "react-router-dom";

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
          <Link to={`/edit/${props.todo._id}`} className="page-link">
            Edit
          </Link>
        )}
      </td>
    </tr>
  );
};

export default Todo;
