import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './edittask.css';

export default class EditTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = { label: props.label || '', error: '' };
  }

  handleChange = (e) => {
    this.setState({ label: e.target.value, error: '' });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { label } = this.state;
    const { onSubmit } = this.props;
    if (label.trim().length <= 1) {
      this.setState({ error: 'Задача - это БОЛЕЕ одного символа' });
      return;
    }
    onSubmit(label);
  };

  render() {
    const { label, error } = this.state;
    return (
      <div className="edit-task-container">
        {error && <div className="error-message">{error}</div>}
        <input
          className="edit-task-input"
          value={label}
          onChange={this.handleChange}
          onKeyDown={(e) => e.key === 'Enter' && this.handleSubmit(e)}
        />
      </div>
    );
  }
}

EditTaskForm.propTypes = {
  label: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

EditTaskForm.defaultProps = {
  label: '',
};
