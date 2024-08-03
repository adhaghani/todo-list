import React, { useCallback, useEffect, useState } from "react";
import Navigation from "./Component/Navigation";

import "./Styles/App.css";
import Task_Column from "./Component/Task_Column";

import Add_Task from "./Component/Add_Task";

import { DragDropContext } from "react-beautiful-dnd";
function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [AddTask, setAddTask] = useState(false);
  const [IsDragging, setIsDragging] = useState(false);

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

  const onDragEnd = useCallback(
    async (result) => {
      if (!result.destination) {
        endDrag();
        return;
      }
      endDrag();
      const { source, destination, draggableId } = result;
      const dropID = destination.droppableId;

      updateTaskStatus(draggableId, dropID);
      const item = Array.from(tasks);
      console.log(item);
      console.table(result);

      

      // const reorderedTasks = updatedTasks.filter(
      //   (task) => task.id !== draggableId
      // );
      // const [reorderedItem] = reorderedTasks.splice(source.index, 1);
      // reorderedTasks.splice(destination.index, 0, reorderedItem);

      // setTasks(reorderedTasks);
    },
    [updateTaskStatus, tasks]
  );

  const startDrag = () => {
    setIsDragging(true);
  };

  const endDrag = () => {
    setIsDragging(false);
  };

  return (
    <div className="App">
      <Navigation HandleAddTask={HandleAddTask} />
      {AddTask && <Add_Task addTodo={addTodo} handleAddTask={HandleAddTask} />}

      <div className="Container Todo">
        <DragDropContext onDragEnd={onDragEnd} onDragStart={startDrag}>
          <Task_Column
            type="To do"
            ColumnID={1}
            tasks={tasks.filter((task) => task.status === "todo")}
            deleteTask={deleteTask}
            updateTaskStatus={updateTaskStatus}
            Drag={IsDragging}
          />
          <Task_Column
            type="In Progress"
            ColumnID={2}
            tasks={tasks.filter((task) => task.status === "inprogress")}
            deleteTask={deleteTask}
            updateTaskStatus={updateTaskStatus}
            Drag={IsDragging}
          />
          <Task_Column
            type="Completed"
            ColumnID={3}
            tasks={tasks.filter((task) => task.status === "done")}
            deleteTask={deleteTask}
            updateTaskStatus={updateTaskStatus}
            Drag={IsDragging}
          />
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
