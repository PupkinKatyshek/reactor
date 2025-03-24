import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import Footer from '../footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TodoList from '../TaskList/TaskList';

const getRandomId = (min, max) => Math.floor(Math.random() * (max - min) + min);

const createTask = (label, minutes, seconds) => ({
  label,
  completed: false,
  id: getRandomId(1, 100),
  created: new Date(),
  timer: {
    minutes: minutes || 0,
    seconds: seconds || 0,
    isActive: false,
  },
});

function App() {
  const [toDoData, setToDoData] = useState([]);
  const [filter, setFilter] = useState('all');

  const updateTimer = useCallback((task) => {
    let { minutes, seconds } = task.timer;

    if (seconds === 0) {
      if (minutes === 0) {
        return task;
      }
      minutes -= 1;
      seconds = 59;
    } else {
      seconds -= 1;
    }

    return {
      ...task,
      timer: {
        ...task.timer,
        minutes,
        seconds,
      },
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setToDoData((prevData) =>
        prevData.map((task) => {
          if (task.timer.isActive) {
            return updateTimer(task);
          }
          return task;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const deleteItem = useCallback((id) => {
    setToDoData((prevData) => prevData.filter((task) => task.id !== id));
  }, []);

  const updateTask = useCallback((id, newLabel) => {
    setToDoData((prevData) => prevData.map((task) => (task.id === id ? { ...task, label: newLabel } : task)));
  }, []);

  const addTask = useCallback((text, minutes, seconds) => {
    const newTask = createTask(text, minutes, seconds);
    setToDoData((prevData) => [...prevData, newTask]);
  }, []);

  const deleteAllCompleted = useCallback(() => {
    setToDoData((prevData) => prevData.filter((task) => !task.completed));
  }, []);

  const onToggle = useCallback((id) => {
    setToDoData((prevData) =>
      prevData.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  }, []);

  const startTimer = useCallback((id) => {
    setToDoData((prevData) =>
      prevData.map((task) => (task.id === id ? { ...task, timer: { ...task.timer, isActive: true } } : task))
    );
  }, []);

  const stopTimer = useCallback((id) => {
    setToDoData((prevData) =>
      prevData.map((task) => (task.id === id ? { ...task, timer: { ...task.timer, isActive: false } } : task))
    );
  }, []);

  const filteredTasks = toDoData.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  const completedCount = toDoData.filter((task) => !task.completed).length;

  return (
    <section className="todoapp">
      <h1>todos</h1>
      <header className="header">
        <NewTaskForm addTask={addTask} />
      </header>
      <section className="main">
        <TodoList
          taski={filteredTasks.map((task) => ({
            ...task,
            created: formatDistanceToNow(task.created, {
              addSuffix: true,
              locale: ru,
            }),
          }))}
          onDeleted={deleteItem}
          onToggle={onToggle}
          updateTask={updateTask}
          startTimer={startTimer}
          stopTimer={stopTimer}
          updateTimer={updateTimer}
        />
        <Footer
          completedCount={completedCount}
          setFilter={setFilter}
          filter={filter}
          deleteAllCompleted={deleteAllCompleted}
        />
      </section>
    </section>
  );
}

export default App;
