import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './edittask.css';

function EditTaskForm({ label, onSubmit }) {
  const [taskLabel, setTaskLabel] = useState(label || '');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setTaskLabel(e.target.value);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskLabel.trim().length <= 1) {
      setError('Задача - это БОЛЕЕ одного символа');
      return;
    }
    onSubmit(taskLabel);
  };

  return (
    <div className="edit-task-container">
      {error && <div className="error-message">{error}</div>}
      <input
        className="edit-task-input"
        value={taskLabel}
        onChange={handleChange}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
      />
    </div>
  );
}

EditTaskForm.propTypes = {
  label: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

EditTaskForm.defaultProps = {
  label: '',
};

export default EditTaskForm;
