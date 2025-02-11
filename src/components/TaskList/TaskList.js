// Список задач

import React, { Component } from "react";
import PropTypes from "prop-types";
import LiCompleted from "../Task/Task";
import "./TaskList.css";

export default class TodoList extends Component {
  static propTypes = {
    taski: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        created: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
      })
    ).isRequired,
    onDeleted: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
  };

  render() {
    const { taski, onDeleted, onToggle, updateTask } = this.props;

    // Проверка на ошибки

    return (
      <div>
        <ul className="todo-list">
          {taski.map((task) => (
            <LiCompleted
              key={task.id}
              id={task.id}
              label={task.label}
              onDeleted={() => onDeleted(task.id)}
              onToggle={() => onToggle(task.id)}
              created={task.created}
              completed={task.completed}
              updateTask={updateTask}
            />
          ))}
        </ul>
      </div>
    );
  }
}
