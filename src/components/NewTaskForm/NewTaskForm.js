//  Форма для добавления

import React, { Component } from "react";
import "./NewTaskForm.css";
export default class NewTaskForm extends Component {
  state = { label: "" };
  newTask = (e) => {
    console.log(e.target.value);
    this.setState({ label: e.target.value });
  };

  visual = (e) => {};
  render() {
    return (
      <input
        className="new-todo"
        placeholder="ТЫЦ мышкой потом кнопками"
        onChange={this.newTask}
        autoFocus
        onSubmit={this.visual}
      />
    );
  }
}
