//  Форма для добавления

import React, { Component } from "react";
import "./NewTaskForm.css";

export default class NewTaskForm extends Component {
  state = { label: this.props.label || "" };

  newTask = (e) => {
    this.setState({ label: e.target.value });
  };

  visual = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // console.log(this.state.label);
      this.props.addTask(this.state.label);
      this.setState({ label: "" });
    }
  };

  render() {
    return (
      <input
        className="new-todo"
        placeholder=' "ТЫЦ" мышкой потом кнопками'
        onChange={this.newTask}
        onKeyDown={this.visual}
        value={this.state.label}
        autoFocus
      />
    );
  }
}
