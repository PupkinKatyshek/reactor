// Фильтры в футере

import React from 'react';
import PropTypes from 'prop-types';
import './TasksFilter.css';

function TaskFilter({ filter, setFilter }) {
  return (
    <ul className="filters">
      <li>
        <button
          className={filter === 'all' ? 'selected' : ''}
          onClick={() => setFilter('all')}
          aria-label="Show all tasks"
          type="button"
        >
          All
        </button>
      </li>
      <li>
        <button
          className={filter === 'active' ? 'selected' : ''}
          onClick={() => setFilter('active')}
          aria-label="Show active tasks"
          type="button"
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={filter === 'completed' ? 'selected' : ''}
          onClick={() => setFilter('completed')}
          aria-label="Show completed tasks"
          type="button"
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

TaskFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default TaskFilter;
