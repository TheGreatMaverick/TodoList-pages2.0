import React from "react";
import { AddForm, FiltredForm, TodoList, Loader } from "../components";

export const MainPage = ({
  isLoading,
  visibleTodos,
  handleAddTodo,
  handleDeleteTodo,
  handleEditTodo,
  isSorting,
  setIsSorting,
  search,
  setSearch,
}) => {
  return (
    <>
      <h1>Список дел:</h1>
      <FiltredForm
        search={search}
        setSearch={setSearch}
        isSorting={isSorting}
        setIsSorting={setIsSorting}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <TodoList
          todosList={visibleTodos}
          handleDeleteTodo={handleDeleteTodo}
          handleEditTodo={handleEditTodo}
        />
      )}
      <AddForm onSave={handleAddTodo} />
    </>
  );
};
