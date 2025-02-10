import React, { Component } from "react";
import "./App.css";
import AppHeadline from "../headline";
import Footer from "../footer/Footer";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TodoList from "../TaskList/TaskList";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export default class App extends Component {
  state = {
    toDoData: [],
    filter: "all",
  };

  setFilter = (filter) => {
    this.setState({ filter });
  };

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
    // console.log(id, newLabel);
    this.setState((prevState) => {
      // console.log(prevState);
      const updatedTasks = prevState.toDoData.map((task) => {
        // Изменено на toDoData
        if (task.id === id) {
          return { ...task, label: newLabel }; // Обновляем задачу
        }
        return task;
      });
      // console.log(updatedTasks);
      return { toDoData: updatedTasks }; // Изменено на toDoData
    });
  };

  deleteItem = (id) => {
    const updatedData = this.state.toDoData.filter((task) => task.id !== id);
    this.setState({ toDoData: updatedData });
  };

  onToggle = (id) => {
    this.setState(({ toDoData }) => {
      const idx = toDoData.findIndex((i) => i.id === id);
      if (idx === -1) return;

      const oldTask = toDoData[idx];
      // console.log(oldTask);
      const newTask = { ...oldTask, completed: !oldTask.completed };
      // console.log(newTask);
      const newArray = [
        ...toDoData.slice(0, idx),
        newTask,
        ...toDoData.slice(idx + 1),
      ];
      // console.log(newArray);
      return { toDoData: newArray };
    });
  };

  render() {
    const { filter, toDoData } = this.state;

    const filteryemTasks = toDoData.filter((taska) => {
      if (filter === "completed") return taska.completed;
      if (filter === "active") return !taska.completed;
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
          />
        </section>
      </section>
    );
  }
}
