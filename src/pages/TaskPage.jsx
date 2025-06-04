import React, { useRef, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const TaskPage = ({ todosList, isLoading, onDelete, onEdit }) => {
  const [editTodo, setEditTodo] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const todo = useMemo(() => {
    if (!Array.isArray(todosList)) return null;
    return todosList.find((t) => String(t.id) === id);
  }, [todosList, id]);

  if (isLoading || !Array.isArray(todosList)) {
    return (
      <div className="loader-container">
        <div className="loader" />
      </div>
    );
  }

  if (!todo) {
    return (
      <div>
        <h1>Задача не найдена</h1>
        <button onClick={() => navigate("/")}>⬅ Вернуться</button>
      </div>
    );
  }

  const handleDeleteTodo = async () => {
    setIsDeleting(true);
    try {
      await onDelete(todo.id);
      navigate("/");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditTodo = async () => {
    if (!editTodo) return setEditTodo(true);
    const newText = inputRef.current.value.trim();
    if (newText === "") return;
    setDisabled(true);
    await onEdit({ id: todo.id, text: newText });
    setDisabled(false);
    setEditTodo(false);
  };

  return (
    <>
      <h1>Задача:</h1>
      <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
        {editTodo ? (
          <div className="edit-todo">
            <input
              className="edit-input"
              type="text"
              ref={inputRef}
              defaultValue={todo.text}
            />
            <button
              className="save"
              disabled={disabled}
              onClick={handleEditTodo}
            >
              ✅
            </button>
          </div>
        ) : (
          <>
            <span className="todo-text">{todo.text}</span>
            <div className="button-group">
              <button className="edit" onClick={handleEditTodo}>
                ✏️
              </button>
              <button
                disabled={isDeleting}
                className="delete"
                onClick={handleDeleteTodo}
              >
                🗑
              </button>
            </div>
          </>
        )}
      </li>
      <button onClick={() => navigate(-1)}>⬅ Назад</button>
    </>
  );
};
