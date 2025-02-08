// Одна задача

import React, { Component } from "react";
import "./Task.css";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export default class LiCompleted extends Component {
  // onTaskClick = () => {
  //   this.setState(({ completed, checked }) => ({
  //     completed: !completed,
  //     checked: !checked,
  //   }));
  // };

  render() {
    let classNames = "created";
    const { label, onDeleted, onToggle, completed } = this.props;

    // console.log(completed);
    if (completed) {
      classNames += " completed";
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={onToggle}
          />
          <label>
            <span className="description" onClick={onToggle}>
              {label}
            </span>
            <span className="created"> 5 minut </span>
          </label>
          <button className="icon icon-edit"></button>
          <button
            className="icon icon-destroy"
            type="button"
            onClick={onDeleted}
          ></button>
        </div>
      </li>
    );
  }
}
