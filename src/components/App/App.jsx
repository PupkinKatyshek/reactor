import React, { Component } from 'react';
import './App.css';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import AppHeadline from '../headline';
import Footer from '../footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TodoList from '../TaskList/TaskList';

export default class App extends Component {
  state = {
    toDoData: [],
    filter: 'all',
  };

  setFilter = (filter) => {
    this.setState({ filter });
  };

  componentDidMount() {
    this.interval = setInterval(() => this.forceUpdate(), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getRandomId(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  addTask = (text) => {
    const newTask = this.createTask(text);
    this.setState(({ toDoData }) => ({
      toDoData: [...toDoData, newTask],
    }));
  };

  createTask(label) {
    return {
      label,
      completed: false,
      id: this.getRandomId(1, 100),
      created: new Date(),
    };
  }

  updateTask = (id, newLabel) => {
    this.setState((prevState) => {
      const updatedTasks = prevState.toDoData.map((task) => {
        if (task.id === id) {
          return { ...task, label: newLabel };
        }
        return task;
      });

      return { toDoData: updatedTasks };
    });
  };

  deleteItem = (id) => {
    const updatedData = this.state.toDoData.filter((task) => task.id !== id);
    this.setState({ toDoData: updatedData });
  };

  deleteAllCompleted = () => {
    const updatedData = this.state.toDoData.filter((task) => !task.completed);
    this.setState({ toDoData: updatedData });
  };

  onToggle = (id) => {
    this.setState(({ toDoData }) => {
      const idx = toDoData.findIndex((i) => i.id === id);
      if (idx === -1) return;

      const oldTask = toDoData[idx];

      const newTask = { ...oldTask, completed: !oldTask.completed };

      const newArray = [...toDoData.slice(0, idx), newTask, ...toDoData.slice(idx + 1)];

      return { toDoData: newArray };
    });
  };

  render() {
    const { filter, toDoData } = this.state;

    const filteryemTasks = toDoData.filter((taska) => {
      if (filter === 'completed') return taska.completed;
      if (filter === 'active') return !taska.completed;
      return true;
    });
    const completedTasks = this.state.toDoData.filter((task) => task.completed);

    const completedCount = completedTasks.length;

    return (
      <section className="todoapp">
        <AppHeadline />
        <header className="header">
          <NewTaskForm addTask={this.addTask} />
        </header>
        <section className="main">
          <TodoList
            taski={filteryemTasks.map((task) => ({
              ...task,
              created: formatDistanceToNow(task.created, {
                addSuffix: true,
                locale: ru,
              }),
            }))}
            onDeleted={this.deleteItem}
            onToggle={this.onToggle}
            updateTask={this.updateTask}
          />
          <Footer
            completedCount={completedCount}
            setFilter={this.setFilter}
            filter={filter}
            deleteAllCompleted={this.deleteAllCompleted}
          />
        </section>
      </section>
    );
  }
}
