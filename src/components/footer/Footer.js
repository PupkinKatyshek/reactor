//  футер с информацией и кнопками

import React, { Component } from "react";
import TaskFilter from "../TasksFilter/TasksFilter";
import "./Footer.css";

export default class Footer extends Component {
  render() {
    const { completedCount, setFilter, filter } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{completedCount} items left</span>
        <TaskFilter setFilter={setFilter} filter={filter} />
        <button className="clear-completed">Clear completed</button>
      </footer>
    );
  }
}
