import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Task.css';
import Timer from '../timer/timer';
import EditTaskForm from '../EditTask/edittask';

function LiCompleted({
  label,
  onDeleted,
  onToggle,
  completed,
  created,
  id,
  startTimer,
  stopTimer,
  updateTimer,
  timer,
  updateTask,
}) {
  const [redact, setRedact] = useState(false);

  useEffect(() => {
    if (completed) {
      stopTimer(id);
    }
  }, [completed, stopTimer, id]);

  const toggleRedact = () => setRedact((prev) => !prev);

  const redactTask = (newLabel) => {
    updateTask(id, newLabel);
    toggleRedact();
  };

  let classNames = 'created';
  if (completed) {
    classNames += ' completed';
  }

  return (
    <li className={classNames}>
      {redact ? (
        <EditTaskForm label={label} onSubmit={redactTask} />
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
          <button className="icon icon-edit" onClick={toggleRedact} type="button" aria-label="Edit task" />
          <button className="icon icon-destroy" type="button" onClick={onDeleted} aria-label="Delete task" />
        </div>
      )}
    </li>
  );
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

export default LiCompleted;
