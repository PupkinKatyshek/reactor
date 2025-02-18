// футер с информацией и кнопками

import React from 'react';
import PropTypes from 'prop-types';
import TaskFilter from '../TasksFilter/TasksFilter';
import './Footer.css';

function Footer({ completedCount, setFilter, filter, deleteAllCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{completedCount} items left</span>
      <TaskFilter setFilter={setFilter} filter={filter} />
      <button className="clear-completed" onClick={deleteAllCompleted} type="button">
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  completedCount: PropTypes.number.isRequired,
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  deleteAllCompleted: PropTypes.func.isRequired,
};

export default Footer;
