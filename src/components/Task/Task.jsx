// Одна задача

import React, { Component } from 'react';
import './Task.css';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
// import { formatDistanceToNow } from "date-fns";
// import { ru } from "date-fns/locale";

export default class LiCompleted extends Component {
  state = { redact: false };
  toggleRedact = () => this.setState({ redact: !this.state.redact });
  redactTask = (newLabel) => {
    this.props.updateTask(this.props.id, newLabel);
    this.toggleRedact();
    console.log(newLabel);
    console.log(this.props);
  };

  render() {
    let classNames = 'created';
    const { label, onDeleted, onToggle, completed, created } = this.props;
    const { redact } = this.state;
    // console.log(completed);
    if (completed) {
      classNames += ' completed';
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input name="inpot" className="toggle" type="checkbox" checked={completed} onChange={onToggle} />
          {redact ? (
            <NewTaskForm
              label={label}
              addTask={this.redactTask} // Передаем функцию для обновления
            />
          ) : (
            <label>
              <span className="description" onClick={onToggle}>
                {label}
              </span>
              <span className="created"> {created} </span>
            </label>
          )}
          <button className="icon icon-edit" onClick={this.toggleRedact}></button>
          <button className="icon icon-destroy" type="button" onClick={onDeleted}></button>
        </div>
      </li>
    );
  }
}
