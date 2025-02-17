//  Фильтры в футере

import React, { Component } from 'react';
import './TasksFilter.css';

export default class TaskFilter extends Component {
  render() {
    return (
      <ul className="filters">
        <li>
          <button className={this.props.filter === 'all' ? 'selected' : ''} onClick={() => this.props.setFilter('all')}>
            All
          </button>
        </li>
        <li>
          <button
            className={this.props.filter === 'active' ? 'selected' : ''}
            onClick={() => this.props.setFilter('active')}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={this.props.filter === 'completed' ? 'selected' : ''}
            onClick={() => this.props.setFilter('completed')}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
