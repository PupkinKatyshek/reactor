// Одна задача

import React, { Component } from "react";
import "./Task.css";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export default class LiCompleted extends Component {
  state = { completed: false, checked: false };
  onTaskClick = () => {
    this.setState(({ completed, checked }) => {
      return {
        completed: !completed,
        checked: !checked,
      };
    });
  };

  render() {
    let classNames = "created";
    // let self = false;
    const { label } = this.props;
    const { completed, checked } = this.state;

    if (completed) {
      classNames += " completed";
      // self = checked;
    }

    const timeAgo = formatDistanceToNow(new Date(), {
      locale: ru,
      addSuffix: true,
    });

    return (
      <li className={classNames}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed && checked}
            onClick={this.onTaskClick}
          />
          <label>
            <span className="description" onClick={this.onTaskClick}>
              {label}
            </span>
            <span className="created">{timeAgo}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy"></button>
        </div>
      </li>
    );
  }
}
