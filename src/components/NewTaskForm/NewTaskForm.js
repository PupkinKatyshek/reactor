//  Форма для добавления

import React, { Component } from "react";
import "./NewTaskForm.css";

export default class NewTaskForm extends Component {
  state = { label: this.props.label || "", error: "" };

  newTask = (e) => {
    this.setState({ label: e.target.value, error: "" }); // Сбрасываем ошибку при вводе
  };

  visual = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (this.state.label.trim().length <= 1) {
        this.setState({ error: "Задача - это БОЛЕЕ одного символа" });
        return;
      }
      this.props.addTask(this.state.label);
      this.setState({ label: "" });
    }
  };

  render() {
    return (
      <div className="input-container">
        {this.state.error && (
          <div className="error-message">{this.state.error}</div>
        )}
        <input
          className="new-todo"
          placeholder=' "ТЫЦ" мышкой потом кнопками'
          onChange={this.newTask}
          onKeyDown={this.visual}
          value={this.state.label}
          autoFocus
        />
      </div>
    );
  }
}
