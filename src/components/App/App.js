import React, { Component } from "react";
import "./App.css";
import AppHeadline from "../headline";
import Footer from "../footer/Footer";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TodoList from "../TaskList/TaskList";

export default class App extends Component {
  state = {
    toDoData: [
      { label: "Ушел", completed: false, id: 0 },
      { label: "Пошел", completed: false, id: 1 },
      { label: "Пришел", completed: false, id: 2 },
      { label: "Прошел", completed: false, id: 3 },
    ],
  };

  deleteItem = (id) => {
    const updatedData = this.state.toDoData.filter((task) => task.id !== id);
    this.setState({ toDoData: updatedData });
  };

  render() {
    return (
      <section className="todoapp">
        <AppHeadline />
        <header className="header">
          <NewTaskForm />
        </header>
        <section className="main">
          <TodoList taski={this.state.toDoData} onDeleted={this.deleteItem} />
          <Footer />
        </section>
      </section>
    );
  }
}
