import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Task.css';
import Timer from '../timer/timer';
import EditTaskForm from '../EditTask/edittask';

export default class LiCompleted extends Component {
  constructor(props) {
    super(props);
    this.state = { redact: false };
  }

  componentDidUpdate(prevProps) {
    const { completed, stopTimer, id } = this.props;

    if (prevProps.completed !== completed && completed) {
      stopTimer(id);
    }
  }

  toggleRedact = () => this.setState((prevState) => ({ redact: !prevState.redact }));

  redactTask = (newLabel) => {
    const { updateTask, id } = this.props;
    updateTask(id, newLabel);
    this.toggleRedact();
  };

  render() {
    let classNames = 'created';
    const { label, onDeleted, onToggle, completed, created, id, startTimer, stopTimer, updateTimer, timer } =
      this.props;
    const { redact } = this.state;

    if (completed) {
      classNames += ' completed';
    }

    return (
      <li className={classNames}>
        {redact ? (
          <EditTaskForm label={label} onSubmit={this.redactTask} />
        ) : (
          <div className="view">
            <input
              name="input"
              className="toggle"
              type="checkbox"
              checked={completed}
              onChange={onToggle}
              aria-label={`Toggle ${label}`}
            />
            <label htmlFor={`task-${id}`}>
              <span
                className="description"
                onClick={onToggle}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onToggle()}
                id={`task-${id}`}
              >
                {label}
              </span>

              <span className="created">
                <Timer
                  minutes={timer.minutes}
                  seconds={timer.seconds}
                  isActive={timer.isActive}
                  startTimer={() => startTimer(id)}
                  stopTimer={() => stopTimer(id)}
                  updateTimer={() => updateTimer(id)}
                />
                {created.toLocaleString()}
              </span>
            </label>
            <button className="icon icon-edit" onClick={this.toggleRedact} type="button" aria-label="Edit task" />
            <button className="icon icon-destroy" type="button" onClick={onDeleted} aria-label="Delete task" />
          </div>
        )}
      </li>
    );
  }
}

LiCompleted.propTypes = {
  updateTask: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  updateTimer: PropTypes.func.isRequired,
  timer: PropTypes.shape({
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
  }).isRequired,
};
