import React, { useMemo, useState, useEffect } from "react";

export const useTodos = () => {
  const [todosList, setTodosList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  const [search, setSearch] = useState("");

  const visibleTodos = useMemo(() => {
    let filtered = todosList;

    if (search.trim() !== "") {
      filtered = filtered.filter((todo) =>
        todo.text.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (isSorting) {
      return [...filtered].sort((a, b) => a.text.localeCompare(b.text));
    }

    return filtered;
  }, [todosList, search, isSorting]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setIsLoading(true);
    const loadedTodos = await fetch("http://localhost:3000/todos").then((res) =>
      res.json()
    );
    setTodosList(loadedTodos);
    setIsLoading(false);
  };

  const handleAddTodo = async (text) => {
    if (text.trim() === "") return;

    const newTodo = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        text,
        completed: false,
      }),
    }).then((res) => res.json());

    setTodosList((prev) => [...prev, newTodo]);
  };

  const handleDeleteTodo = async (id) => {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    });

    setTodosList((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = async (updatedTodo) => {
    const updated = await fetch(
      `http://localhost:3000/todos/${updatedTodo.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(updatedTodo),
      }
    ).then((res) => res.json());

    setTodosList((prev) =>
      prev.map((todo) => (todo.id === updated.id ? updated : todo))
    );
  };

  return {
    isLoading,
    todosList,
    visibleTodos,
    fetchTodos,
    handleAddTodo,
    handleDeleteTodo,
    handleEditTodo,
    setIsSorting,
    isSorting,
    setSearch,
    search,
  };
};
