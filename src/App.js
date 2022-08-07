import React, { useEffect } from "react";
import { FaGithub, FaTelegram, FaTwitter } from 'react-icons/fa'
import { v4 as uuid } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";
import List from "./List";
import Alert from "./Alert";
import { useGlobalContext } from "./context";
import Colors from "./Colors";
import DarkModeToggle from './DarkModeToggle';

import "./animation.scss";
import "./animation";

const App = () => {
  const {
    inputRef,
    tasks,
    setTasks,
    alert,
    showAlert,
    isEditing,
    setIsEditing,
    editId,
    setEditId,
    name,
    setName,
    filter,
    setFilter,
    isColorsOpen,
    setIsColorsOpen,
  } = useGlobalContext();

  const addTask = (e) => {
    e.preventDefault();
    if (!name) {
      if (localStorage.getItem("theme") === "light") {
        showAlert(true, "Недопустимое название задании!");
      }
    } else if (name && isEditing) {
      setTasks(
        tasks.map((task) => {
          return task.id === editId ? { ...task, name: name } : task;
        })
      );
      setIsEditing(false);
      setEditId(null);
      setName("");
      if (localStorage.getItem("theme") === "light") {
        showAlert(true, "Задание изменено.");
      }
    } else {
      const newTask = {
        id: uuid().slice(0, 8),
        name: name,
        completed: false,
        color: "#009688",
      };
      setTasks([...tasks, newTask]);
      if (localStorage.getItem("theme") === "light") {
        showAlert(true, "Задание добавлено.");
      }
      setName("");
    }
  };

  const filterTasks = (e) => {
    setFilter(e.target.dataset["filter"]);
  };

  const deleteAll = () => {
    setTasks([]);
    if (localStorage.getItem("theme") === "light") {
      showAlert(true, "Ваш список пуст!");
    }
  };

  useEffect(() => {
    inputRef.current.focus();
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [inputRef, tasks]);

  const handleDragEnd = (param) => {
    const srcI = param.source.index;
    const desI = param.destination?.index;
    if (desI) {
      const reOrdered = [...tasks];
      reOrdered.splice(desI, 0, reOrdered.splice(srcI, 1)[0]);
      setTasks(reOrdered);
    }
  };

  const hideColorsContainer = (e) => {
    //   body.
    if (e.target.classList.contains("btn-colors")) return;
    setIsColorsOpen(false);
  };

  return (
  <>
    <h1 className="header">Заметки</h1>
    <div className='container' onClick={hideColorsContainer}>
      {isColorsOpen && <Colors />}
      {alert && <Alert msg={alert.msg} />}
      <form className='head' onSubmit={addTask}>
        <input
          type='text'
          ref={inputRef}
          placeholder='Новое задание'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type='submit'>{isEditing ? "Редактировать" : "Добавить"}</button>
      </form>
      <div className='filter'>
        <button
          data-filter='all'
          className={filter === "all" ? "active" : ""}
          onClick={filterTasks}
        >
          Все заметки
        </button>
        <button
          data-filter='completed'
          className={filter === "completed" ? "active" : ""}
          onClick={filterTasks}
        >
          Выполненные
        </button>
        <button
          data-filter='uncompleted'
          className={filter === "uncompleted" ? "active" : ""}
          onClick={filterTasks}
        >
          Невыполненные
        </button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        {tasks.length > 0 ? (
          <List />
        ) : (
          <p className='no-tasks'>Ваш список пуст!</p>
        )}
      </DragDropContext>
      {tasks.length > 2 && (
        <button
          className='btn-delete-all'
          onClick={deleteAll}
          title='Delete All Tasks (Completed and Uncompleted)!'
        >
          <strong>Удалить все</strong>
        </button>
      )}
      {console.log(localStorage.getItem("theme"), " THEME")}
	  <DarkModeToggle/>
	  
    </div>

  <div class="wrapper footer-styles-container">
    <a class="fTCHEv" href='https://github.com/ikromshi/react-todo-app' target='_blank' rel="noopener noreferrer"><FaGithub className='github'/></a>
    <a class="fTCHEv" href='https://telegram.me/sayyorasultanova' target='_blank' rel="noopener noreferrer"><FaTelegram className='github'/></a>
    <a class="fTCHEv" href='https://twitter.com/ikromshi' target='_blank' rel="noopener noreferrer"><FaTwitter className='github'/></a>
    <button class="fTCHEv"><strong>&copy;Ikromshi/Sayyora</strong></button>
  </div>


  <div class="btn-contain">
    <button class="btn">Click Me!</button>
    <div class="btn-particles"></div>
  </div>





	{/* <div class="footer-styles-container">
    <a class="fTCHEv" href='https://github.com/ikromshi/react-todo-app' target='_blank' rel="noopener noreferrer"><FaGithub className='github'/></a>
    <a class="fTCHEv" href='https://telegram.me/sayyorasultanova' target='_blank' rel="noopener noreferrer"><FaTelegram className='github'/></a>
    <a class="fTCHEv" href='https://twitter.com/ikromshi' target='_blank' rel="noopener noreferrer"><FaTwitter className='github'/></a>
    <span class="fTCHEv"><strong>&copy;Ikromshi/Sayyora</strong></span>
  </div>
  <div class="wrapper">
    <button data-type="square">Square particles</button>
    <button data-type="emoji">Emoji particles</button>
    <button data-type="mario">Mario particles</button>
    <button data-type="shadow">Shadow particles</button>
    <button data-type="line">Line particles</button>
</div>
<span class="preloader"></span> */}
	</>
  );
};

export default App;
