import React, { useState } from "react";
import { Link } from "react-router-dom";

export const TodoItem = ({ id, text, completed, onEdit }) => {
  const [disabled, setDisabled] = useState(false);

  const handleToggle = async () => {
    if (disabled) return;
    setDisabled(true);
    await onEdit({ id, completed: !completed });
    setDisabled(false);
  };

  return (
    <li className={`todo-item ${completed ? "completed" : ""}`}>
      <div className="todo-inner">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleToggle}
          disabled={disabled}
          className="todo-checkbox"
        />
        <span className="todo-text">
          <Link className="todo-link" to={`/task/${id}`}>
            {text}
          </Link>
        </span>
      </div>
    </li>
  );
};
