import React, { Component } from 'react';
import './App.css';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import Footer from '../footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TodoList from '../TaskList/TaskList';

export default class App extends Component {
  static createTask(label) {
    return {
      label,
      completed: false,
      id: App.getRandomId(1, 100),
      created: new Date(),
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      toDoData: [],
      filter: 'all',
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.forceUpdate(), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setFilter = (filter) => {
    this.setState({ filter });
  };

  static getRandomId(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  deleteItem = (id) => {
    this.setState((prevState) => ({
      toDoData: prevState.toDoData.filter((task) => task.id !== id),
    }));
  };

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

  addTask = (text) => {
    const newTask = App.createTask(text); // Используем статический метод
    this.setState((prevState) => ({
      toDoData: [...prevState.toDoData, newTask],
    }));
  };

  deleteAllCompleted = () => {
    this.setState((prevState) => ({
      toDoData: prevState.toDoData.filter((task) => !task.completed),
    }));
  };

  onToggle = (id) => {
    this.setState((prevState) => {
      const idx = prevState.toDoData.findIndex((i) => i.id === id);
      if (idx === -1) return null;

      const oldTask = prevState.toDoData[idx];
      const newTask = { ...oldTask, completed: !oldTask.completed };

      const newArray = [...prevState.toDoData.slice(0, idx), newTask, ...prevState.toDoData.slice(idx + 1)];

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

    const completedTasks = toDoData.filter((task) => task.completed);
    const completedCount = completedTasks.length;

    return (
      <section className="todoapp">
        <h1>todos</h1>
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
