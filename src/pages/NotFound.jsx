import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div>
      <h1>404 — Страница не найдена</h1>
      <p>Адрес не существует.</p>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
};