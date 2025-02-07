// import logo from "./logo.svg";
import "./App.css";
import AppHeadline from "../headline";
import Footer from "../footer/Footer";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TodoList from "../TaskList/TaskList";

const App = function App() {
  return (
    <section className="todoapp">
      <AppHeadline />
      <header className="header">
        <NewTaskForm />
      </header>
      <section className="main">
        <TodoList />
        <Footer />
      </section>
    </section>
  );
};

export default App;
