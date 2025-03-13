import React from 'react';
import PropTypes from 'prop-types';
import LiCompleted from '../Task/Task';
import './TaskList.css';

function TodoList({ taski, onDeleted, onToggle, updateTask, startTimer, stopTimer, updateTimer }) {
  return (
    <div>
      <ul className="todo-list">
        {taski.map((task) => (
          <LiCompleted
            key={task.id}
            id={task.id}
            label={task.label}
            onDeleted={() => onDeleted(task.id)}
            onToggle={() => onToggle(task.id)}
            created={task.created}
            completed={task.completed}
            updateTask={updateTask}
            startTimer={startTimer}
            stopTimer={stopTimer}
            updateTimer={updateTimer}
            timer={task.timer}
          />
        ))}
      </ul>
    </div>
  );
}

TodoList.propTypes = {
  taski: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      timer: PropTypes.shape({
        minutes: PropTypes.number.isRequired,
        seconds: PropTypes.number.isRequired,
        isActive: PropTypes.bool.isRequired,
      }).isRequired,
    })
  ).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  updateTimer: PropTypes.func.isRequired,
};

export default TodoList;
