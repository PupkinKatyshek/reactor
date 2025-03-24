import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

function NewTaskForm({ label: initialLabel = '', addTask }) {
  const [label, setLabel] = useState(initialLabel);
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [error, setError] = useState('');

  const newTask = (e) => {
    setLabel(e.target.value);
    setError('');
  };

  const handleMinutesChange = (e) => {
    const { value } = e.target;
    if (value === '' || (parseInt(value, 10) >= 0 && parseInt(value, 10) <= 59)) {
      setMinutes(value);
    }
  };

  const handleSecondsChange = (e) => {
    const { value } = e.target;
    if (value === '' || (parseInt(value, 10) >= 0 && parseInt(value, 10) <= 59)) {
      setSeconds(value);
    }
  };

  const visual = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (label.trim().length <= 1) {
        setError('Задача - это БОЛЕЕ одного символа');
        return;
      }
      addTask(label, parseInt(minutes, 10), parseInt(seconds, 10));

      setLabel('');
      setMinutes('');
      setSeconds('');
    }
  };

  return (
    <div className="input-container">
      {error && <div className="error-message">{error}</div>}
      <input
        name="upInpot"
        className="new-todo"
        placeholder='"ТЫЦ"'
        onChange={newTask}
        onKeyDown={visual}
        value={label}
      />
      <input className="new-todo-form__timer" placeholder="Min" value={minutes} onChange={handleMinutesChange} />
      <input className="new-todo-form__timer" placeholder="Sec" value={seconds} onChange={handleSecondsChange} />
    </div>
  );
}

NewTaskForm.propTypes = {
  label: PropTypes.string,
  addTask: PropTypes.func.isRequired,
};

NewTaskForm.defaultProps = {
  label: '',
};

export default NewTaskForm;
