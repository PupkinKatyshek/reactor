// Список задач

import React from "react";
import LiCompleted from "../Task/Task";
import "./TaskList.css";
const TodoList = () => {
  return (
    <ul className="todo-list">
      <LiCompleted label="Идти на хуй" />
      <LiCompleted label="Прочитать книгу" />
      <LiCompleted label="Прийти с хуя" />
      <LiCompleted label="Почесать жепку" />
    </ul>
  );
};

export default TodoList;
