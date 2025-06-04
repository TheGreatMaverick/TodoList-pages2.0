import { Routes, Route, Navigate } from "react-router-dom";
import { useTodos } from "./hooks";
import "./App.css";
import { MainPage } from "./pages/MainPage";
import { TaskPage } from "./pages/TaskPage";
import { NotFound } from "./pages/NotFound";

export const App = () => {
  const {
    visibleTodos,
    todosList,
    isLoading,
    handleAddTodo,
    handleDeleteTodo,
    handleEditTodo,
    isSorting,
    setIsSorting,
    search,
    setSearch,
  } = useTodos();

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              isLoading={isLoading}
              visibleTodos={visibleTodos}
              handleAddTodo={handleAddTodo}
              handleDeleteTodo={handleDeleteTodo}
              handleEditTodo={handleEditTodo}
              isSorting={isSorting}
              setIsSorting={setIsSorting}
              search={search}
              setSearch={setSearch}
            />
          }
        />
        <Route
          path="/task/:id"
          element={
            <TaskPage
              isLoading={isLoading}
              todosList={todosList}
              onEdit={handleEditTodo}
              onDelete={handleDeleteTodo}
            />
          }
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
};
