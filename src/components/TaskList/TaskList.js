// Список задач

import React, { Component } from "react";
import LiCompleted from "../Task/Task";
import "./TaskList.css";
// import TaskFilter from "../TasksFilter/TasksFilter";

export default class TodoList extends Component {
  render() {
    const { taski, onDeleted, onToggle } = this.props;

    return (
      <ul className="todo-list">
        {taski.map((task) => (
          <LiCompleted
            key={task.id}
            label={task.label}
            onDeleted={() => onDeleted(task.id)}
            onToggle={() => onToggle(task.id)}
            created={task.created}
            completed={task.completed}
          />
        ))}
      </ul>
    );
  }
}
