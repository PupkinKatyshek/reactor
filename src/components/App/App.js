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
    toDoData: [
      this.createTask("Ушел"),
      this.createTask("Пошел"),
      this.createTask("Пришел"),
      this.createTask("Прошел"),
    ],
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
      created: new Date(), // Сохраняем время создания как объект Date
    };
  }

  deleteItem = (id) => {
    const updatedData = this.state.toDoData.filter((task) => task.id !== id);
    this.setState({ toDoData: updatedData });
  };

  onToggle = (id) => {
    this.setState(({ toDoData }) => {
      const idx = toDoData.findIndex((i) => i.id === id); // Используем findIndex
      if (idx === -1) return; // Если задача не найдена, выходим из функции

      const oldTask = toDoData[idx];
      console.log(oldTask);
      const newTask = { ...oldTask, completed: !oldTask.completed };
      console.log(newTask);
      const newArray = [
        ...toDoData.slice(0, idx),
        newTask,
        ...toDoData.slice(idx + 1),
      ];
      console.log(newArray);
      return { toDoData: newArray };
    });
  };

  render() {
    return (
      <section className="todoapp">
        <AppHeadline />
        <header className="header">
          <NewTaskForm addTask={this.addTask} />
        </header>
        <section className="main">
          <TodoList
            taski={this.state.toDoData.map((task) => ({
              ...task,
              created: formatDistanceToNow(task.created, {
                addSuffix: true,
                locale: ru,
              }),
            }))}
            onDeleted={this.deleteItem}
            onToggle={this.onToggle}
          />
          <Footer />
        </section>
      </section>
    );
  }
}
