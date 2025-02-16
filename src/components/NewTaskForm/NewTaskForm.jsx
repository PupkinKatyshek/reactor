import React, { Component } from 'react';
import PropTypes from 'prop-types'; // Импорт PropTypes
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = { label: props.label || '', error: '' };
  }

  newTask = (e) => {
    this.setState({ label: e.target.value, error: '' });
  };

  visual = (e) => {
    const { label } = this.state; // Деструктуризация состояния
    if (e.key === 'Enter') {
      e.preventDefault();
      if (label.trim().length <= 1) {
        this.setState({ error: 'Задача - это БОЛЕЕ одного символа' });
        return;
      }
      const { addTask } = this.props; // Деструктуризация пропсов
      addTask(label);
      this.setState({ label: '' });
    }
  };

  render() {
    const { label, error } = this.state; // Деструктуризация состояния
    return (
      <div className="input-container">
        {error && <div className="error-message">{error}</div>}
        <input
          name="upInpot"
          className="new-todo"
          placeholder=' "ТЫЦ" мышкой потом кнопками'
          onChange={this.newTask}
          onKeyDown={this.visual}
          value={label}
          autoFocus // Можно оставить, если это необходимо, но учтите предупреждение
        />
      </div>
    );
  }
}

// Валидация пропсов
NewTaskForm.propTypes = {
  label: PropTypes.string,
  addTask: PropTypes.func.isRequired,
};
