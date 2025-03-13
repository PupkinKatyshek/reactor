import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = { label: props.label || '', minutes: '', seconds: '', error: '' };
  }

  newTask = (e) => {
    this.setState({ label: e.target.value, error: '' });
  };

  handleMinutesChange = (e) => {
    this.setState({ minutes: e.target.value });
  };

  handleSecondsChange = (e) => {
    this.setState({ seconds: e.target.value });
  };

  visual = (e) => {
    const { label, minutes, seconds } = this.state;

    if (e.key === 'Enter') {
      e.preventDefault();
      if (label.trim().length <= 1) {
        this.setState({ error: 'Задача - это БОЛЕЕ одного символа' });
        return;
      }
      const { addTask } = this.props;
      addTask(label, parseInt(minutes, 10), parseInt(seconds, 10));

      this.setState({ label: '', minutes: '', seconds: '' });
    }
  };

  render() {
    const { label, minutes, seconds, error } = this.state;
    return (
      <div className="input-container">
        {error && <div className="error-message">{error}</div>}
        <input
          name="upInpot"
          className="new-todo"
          placeholder='"ТЫЦ"'
          onChange={this.newTask}
          onKeyDown={this.visual}
          value={label}
        />
        <input className="new-todo-form__timer" placeholder="Min" value={minutes} onChange={this.handleMinutesChange} />
        <input className="new-todo-form__timer" placeholder="Sec" value={seconds} onChange={this.handleSecondsChange} />
      </div>
    );
  }
}

NewTaskForm.propTypes = {
  label: PropTypes.string,
  addTask: PropTypes.func.isRequired,
};

NewTaskForm.defaultProps = {
  label: '',
};
