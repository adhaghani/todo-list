import React, { useCallback, useEffect, useState } from "react";
import Navigation from "./Component/Navigation";

import "./Styles/App.css";
import Task_Column from "./Component/Task_Column";

import Add_Task from "./Component/Add_Task";

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const separateTasks = () => {
    const todoTasks = tasks.filter((task) => task.status === "todo");
    const inProgressTasks = tasks.filter(
      (task) => task.status === "inprogress"
    );
    const completedTasks = tasks.filter((task) => task.status === "done");

    setTodoTask(todoTasks);
    setInprogressTask(inProgressTasks);
    setCompletedTask(completedTasks);
  };

  useEffect(() => {
    separateTasks();
  }, [tasks]);

  const [TodoTask, setTodoTask] = useState([]);
  const [InprogressTask, setInprogressTask] = useState([]);
  const [CompletedTask, setCompletedTask] = useState([]);

  const [AddTask, setAddTask] = useState(false);

  useEffect(() => {
    document.body.style.overflow = AddTask ? "hidden" : "visible";
  }, [AddTask]);

  const HandleAddTask = () => {
    setAddTask(!AddTask);
  };

  const addTodo = (title, priority, details) => {
    const newTask = {
      id: generateId(),
      title,
      priority,
      details,
      status: "todo"
    };
    const updatedTasks = [...tasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setAddTask(false);
  };
  const generateId = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{};:,.<>?";
    const length = 18;
    let id = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters[randomIndex];
    }

    return id;
  };

  const statusMap = {
    1: "todo",
    2: "inprogress"
  };

  const getNewStatus = ({ droppableId }) => {
    return statusMap[droppableId] || "done";
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const updateTaskStatus = useCallback(
    (taskId, ColumnID) => {
      const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, status: getNewStatus({ droppableId: ColumnID }) };
        }
        return task;
      });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    },
    [tasks]
  );

  return (
    <div className="App">
      <Navigation HandleAddTask={HandleAddTask} />
      {AddTask && <Add_Task addTodo={addTodo} handleAddTask={HandleAddTask} />}

      <div className="Container Todo">
        <Task_Column
          type="Task"
          ColumnID={1}
          tasks={TodoTask}
          deleteTask={deleteTask}
          updateTaskStatus={updateTaskStatus}
        />
        <Task_Column
          type="In Progress"
          ColumnID={2}
          tasks={InprogressTask}
          deleteTask={deleteTask}
          updateTaskStatus={updateTaskStatus}
        />
        <Task_Column
          type="Completed"
          ColumnID={3}
          tasks={CompletedTask}
          deleteTask={deleteTask}
          updateTaskStatus={updateTaskStatus}
        />
      </div>
    </div>
  );
}

export default App;
