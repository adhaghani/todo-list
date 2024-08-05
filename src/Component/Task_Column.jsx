import React, { useState } from "react";

import Delete from "../assets/Delete";

import { Droppable, Draggable } from "react-beautiful-dnd";
const Task_Column = ({
  type,
  tasks,
  deleteTask,
  updateTaskStatus,
  ColumnID,
  Drag
}) => {
  const onDeleteClick = (id) => {
    deleteTask(id);
  };

  const updateTask = (id, ColumnID) => {
    const NewColumnID = ColumnID + 1;
    updateTaskStatus(id, NewColumnID);
  };

  return (
    <div className="Todo-Section">
      <h2 className="Title">{type}</h2>
      <div className="Todo_Container_Card">
        <ul className={Drag ? "Task_Columns Drag" : "Task_Columns"}>
          {tasks.map(({ id, title, priority, details }, index) => (
            <li className="Todo__Card" key={id}>
              <div className="Delete" onClick={() => onDeleteClick(id)}>
                <Delete />
              </div>
              <h3 className="Todo_Title">{title}</h3>
              <div className="Details">
                <p
                  className={
                    priority === "High"
                      ? "Todo_priority High"
                      : priority === "Medium"
                      ? "Todo_priority Medium"
                      : "Todo_priority"
                  }
                >
                  {priority} Priority
                </p>
                <p className="Todo_Details">{details}</p>
                {ColumnID !== 3 && (
                  <button
                    className="Todo__Button"
                    onClick={() => updateTask(id, ColumnID)}
                  >
                    {ColumnID === 1 ? "Start Doing" : "Done"}
                  </button>
                )}
              </div>
            </li>
          ))}{" "}
        </ul>
      </div>
    </div>
  );
};

export default Task_Column;
